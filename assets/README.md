# assets 데이터 파일 가이드

이 폴더의 두 JSON 파일이 앱 목록 페이지 전체를 만들어냅니다.

| 파일 | 역할 |
|---|---|
| `apps.json` | 앱 목록 데이터 (앱 추가/수정) |
| `filter-config.json` | 필터 정의 · 분류 규칙 · UI 문구 · 배지 색상 |

HTML/JS를 고치지 않고 이 두 파일만으로 앱과 필터를 늘릴 수 있게 되어 있습니다.
다만 **아래 체크리스트를 건너뛰면 조용히 깨집니다.**

---

## 배포 전 체크리스트

JSON을 수정했다면 순서대로 확인하세요.

- [ ] **1. 클래스명을 추가했다면 CSS 재빌드** → `npm run build:css`
      `filter-config.json`의 `badges`에 Tailwind 클래스(`bg-orange-100` 등)를 새로 넣었을 때 필수입니다.
      건너뛰면 색이 안 나옵니다. (→ [함정 1](#함정-1-tailwind가-클래스를-지워버린다))
      헷갈리면 [빌드가 최신인지 확인](#css-빌드가-최신인지-확인)하는 방법이 있습니다.
- [ ] **2. `filter-config.json`을 고쳤다면 캐시버스터 올리기**
      `js/filter-manager.js`의 `?v=1` 값을 올리세요. 안 올리면 기존 방문자는 예전 설정을 계속 봅니다.
      (`apps.json`은 매 요청마다 타임스탬프가 붙으므로 손댈 필요 없습니다 → [함정 4](#함정-4-캐시))
- [ ] **3. JSON 문법 검사** → `node -e "JSON.parse(require('fs').readFileSync('assets/apps.json','utf8'))"`
      쉼표 하나 틀리면 목록 전체가 빈 화면이 됩니다.
- [ ] **4. 로컬 확인** → `python3 -m http.server 8765` 후 `http://localhost:8765/index.html`
      `file://`로 열면 `fetch`가 막혀 아무것도 안 나옵니다. 반드시 서버로 여세요.

---

## apps.json — 앱 추가하기

### 구조

```jsonc
{
  "environment": "...",
  "apps": [
    {
      "id": "ezphr_gbc",                       // 필수, 고유값. 상세페이지 주소가 됨 (/index.html?id=ezphr_gbc)
      "name": "Patient Portal for GBC Staging",// 필수. 카드 제목 + 검색 대상
      "isUse": true,                           // false 면 목록에서 완전히 숨김
      "iconUrl": "./apps/ezphr/icon.png",
      "indexImageUrl": "./apps/ezphr/icon.png",// 카드 썸네일 (없으면 iconUrl 사용)
      "summary": "한 줄 설명",                  // 카드에 표시 + 검색 대상
      "description": "긴 설명",                 // 상세페이지에 표시
      "screenshots": [ { "url": "./apps/ezphr/01.png", "alt": "01" } ],
      "downloads": [
        {
          "platform": "Android",               // IOS / Android / Windows
          "version": "1.0.0",
          "url": "https://.../app.apk",
          "isUse": true                        // ★ false 면 다운로드 버튼도 Platform 필터도 안 잡힘
        }
      ],
      "histories": [
        { "version": "1.0.0", "description": "변경 내역", "releaseDate": "2026-04-15",
          "minSdkVersion": "", "sdkVersion": "", "installUrl": "" }
      ]
    }
  ]
}
```

### ★ 가장 중요: `id`와 `name`이 필터를 결정합니다

앱에 `customer`나 `appType` 같은 필드를 직접 쓰지 **않습니다.**
`filter-config.json`의 규칙이 `id`/`name` 문자열을 보고 자동으로 분류합니다.

| 필터 | 보는 곳 | 예 |
|---|---|---|
| Customer | `name` | 이름에 `GBC`가 있으면 → GBC |
| App Type | `id` | id에 `ezphr`가 있으면 → Patient Portal |
| Environment | `name` + `id` | 이름에 `staging` 또는 id에 `_stg` → Staging |
| Platform | `downloads[].platform` | `isUse: true`인 항목만 |

**그래서 이름과 id를 기존 규칙에 맞게 지어야 필터가 자동으로 붙습니다.**
새 고객사나 새 제품군이면 규칙을 먼저 추가하세요 (아래 참고).
규칙에 안 걸리면 조용히 `Other`로 분류됩니다 — 에러가 안 나므로 눈치채기 어렵습니다.

### 이미지 경로

- `./`로 시작하면 자동으로 `/`로 바뀝니다 (`./apps/x.png` → `/apps/x.png`)
- `http`로 시작하면 그대로 사용
- **파일이 없어도 에러가 안 납니다.** 깨진 이미지로 표시되니 경로를 꼭 확인하세요

### 스크린샷 주의

- 원본 비율 그대로 표시됩니다 (잘리지 않음). 세로·가로 이미지 모두 정상 처리
- **한 앱 안의 스크린샷은 비율을 통일하세요.** 비율이 다르면 그 이미지만 높이가 달라져 아래로 삐져나옵니다
  (실제 사례: `images/nurseAID/screenshot_0004.png`가 720×1738로 나머지 720×1600보다 8% 김)
- 4장 이상이면 4열, 3장 이하면 3열로 배치됩니다

---

## filter-config.json — 필터 추가하기

### 구조 한눈에

```jsonc
{
  "filters": [ /* 어떤 필터를 보여줄지 + URL 규칙 */ ],
  "rules":   { /* 앱을 어떤 값으로 분류할지 */ },
  "badges":  { /* 값별 색상 */ },
  "ui":      { /* 화면 문구 */ }
}
```

### 케이스 A. 기존 필터에 항목 하나 추가 (가장 흔함)

새 고객사 `SNUH`가 생겼다면 `rules.customer.matches`에 한 줄:

```jsonc
{ "value": "SNUH", "contains": { "name": ["SNUH"] } }
```

이게 전부입니다. 코드 수정도, CSS 재빌드도 필요 없습니다.

**주의 — 순서가 곧 우선순위입니다.** 위에서부터 검사해 처음 걸리는 것이 이깁니다.
좁은 규칙을 넓은 규칙보다 **위에** 두세요.

```jsonc
// 나쁜 예: "GBC"가 먼저 걸려서 "GBC Dubai"는 영원히 도달하지 못함
{ "value": "GBC",       "contains": { "name": ["GBC"] } },
{ "value": "GBC Dubai", "contains": { "name": ["GBC Dubai"] } }
```

### 케이스 B. 필터 자체를 하나 더 추가

`filters` 배열과 `rules`에 각각 추가합니다.

```jsonc
// filters 에 추가
{
  "key": "vendor",              // 내부 식별자 (select 의 id 가 됨)
  "label": "Vendor",            // 드롭다운에 보이는 이름
  "type": "rule",               // "rule" 또는 "platform"
  "url": {
    "segment": "vendor",        // URL 경로 이름 → /vendor/jubail
    "aliases": ["v"],           // 읽을 때만 추가로 허용할 이름
    "query": "vendor",          // 쿼리스트링 이름 → ?vendor=jubail
    "match": "slug"             // "slug"(대부분) 또는 "upper"(platform 처럼 대문자 값)
  }
},

// rules 에 추가
"vendor": {
  "ignoreCase": true,
  "fallback": "ezCaretech",
  "matches": [
    { "value": "Jubail", "contains": { "summary": ["Jubail"] } }
  ]
}
```

이것만으로 **데스크탑 드롭다운·모바일 서랍·필터링·활성 개수·초기화·URL 연동**이 전부 자동으로 붙습니다.

`url`을 빼먹으면 화면에서는 동작하지만 **URL에 실리지 않아** 링크 공유와 뒤로가기가 안 됩니다.

### `contains` 에 쓸 수 있는 필드

앱 객체의 **최상위 문자열 필드**만 가능합니다: `id`, `name`, `summary`, `description`
`downloads`, `screenshots` 같은 배열·중첩 값은 쓸 수 없습니다.

여러 필드·여러 패턴은 전부 **OR**입니다 (하나라도 걸리면 매치).

```jsonc
// name 에 "development" 가 있거나  OR  id 에 "_dev" 가 있으면 → Development
{ "value": "Development", "contains": { "name": ["development"], "id": ["_dev"] } }
```

`ignoreCase: true`면 양쪽 모두 소문자로 비교합니다. `environment`만 켜져 있고 나머지는 대소문자를 구분합니다.

### 배지 색상 추가

새 환경값(예: `QA`)을 추가했다면 `badges.environment`에도 넣어야 색이 붙습니다.

```jsonc
"QA": { "label": "QA", "class": "bg-sky-100 text-sky-700 border border-sky-200" }
```

없으면 에러 없이 값 이름만 적힌 **색 없는 배지**로 나옵니다.
그리고 **새 클래스를 넣었으면 반드시 `npm run build:css`** (→ 함정 1).

---

## 함정 모음

### 함정 1. Tailwind가 클래스를 지워버린다

Tailwind는 소스를 스캔해서 **실제로 쓰인 클래스만** CSS에 남깁니다.
`badges`의 색상 클래스는 JSON 안에 문자열로만 존재하므로, 스캔 대상에 들어있지 않으면 통째로 사라집니다.

`tailwind.config.js`의 `content`에 `"./assets/*.json"`이 들어 있어야 합니다 (현재 설정됨).
**그리고 클래스를 새로 추가할 때마다 `npm run build:css`를 다시 돌려야 합니다.**

증상: 배지가 색 없는 흰 알약으로 표시됨
확인: `grep -c "\.bg-sky-100" css/output.css` → `0`이면 purge된 것

#### CSS 빌드가 최신인지 확인

"재빌드를 했던가?" 싶을 때는 임시 경로로 다시 빌드해서 현재 파일과 비교하면 됩니다.

```bash
npx tailwindcss -i ./src/input.css -o /tmp/check.css && diff -q css/output.css /tmp/check.css
```

- 아무것도 출력되지 않으면 → **최신입니다.** 재빌드 불필요
- `Files ... differ` 가 나오면 → `npm run build:css` 를 돌리고 `css/output.css` 도 함께 커밋하세요

**재빌드가 필요한 경우**

- `filter-config.json` 의 `badges` 에 새 색상 클래스를 넣었을 때 ← 가장 놓치기 쉬움
- HTML·JS 에 지금까지 안 쓰던 Tailwind 클래스를 새로 썼을 때
- `tailwind.config.js` 를 수정했을 때

**필요 없는 경우**

- `apps.json` 에 앱만 추가했을 때
- 기존에 쓰던 클래스만 재사용했을 때
- 문구·텍스트만 바꿨을 때
- 클래스를 **지우기만** 했을 때 (안 쓰는 규칙이 조금 남을 뿐 화면은 정상)

### 함정 2. 규칙에 값을 넣어도 드롭다운에 안 나온다

드롭다운 옵션은 규칙 목록이 아니라 **실제 앱 데이터에서 추출**됩니다.
그 값으로 분류되는 앱이 하나도 없으면 옵션에 나타나지 않습니다. 정상 동작입니다.

### 함정 3. 분류가 틀려도 에러가 안 난다

규칙에 안 걸리면 조용히 `fallback` 값(보통 `Other`)이 됩니다.
앱을 추가한 뒤에는 **필터를 실제로 걸어보고** 새 앱이 나오는지 확인하세요.

### 함정 4. 캐시

두 파일의 캐시 전략이 다릅니다.

| 파일 | 방식 | 수정 후 할 일 |
|---|---|---|
| `apps.json` | `?t=<타임스탬프>` — 요청마다 자동 생성 | **없음.** 새로고침하면 항상 최신 |
| `filter-config.json` | `?v=1` — 수동 고정값 | `js/filter-manager.js` 의 `?v=` 숫자를 **직접 올려야 함** |

`apps.json`은 앱이 수시로 추가되므로 [`app-integration.js` 의 `appsJsonUrl()`](../js/app-integration.js)이
매번 `Date.now()`를 붙입니다. 즉 브라우저 캐시를 아예 타지 않습니다.

`filter-config.json`은 자주 바뀌지 않아 고정값으로 캐시를 활용합니다.
**그래서 이 파일만은 수정 후 버전을 꼭 올려야 합니다.** 잊으면 본인 브라우저에선 잘 되는데
다른 사람에게는 예전 필터가 보이는 상황이 생깁니다.

### 함정 5. `file://` 로 열면 아무것도 안 보인다

두 JSON 모두 `fetch`로 읽기 때문에 `file://`에서는 CORS로 차단됩니다.
반드시 로컬 서버로 확인하세요.

---

## 확인 방법

```bash
# 1. JSON 문법
node -e "JSON.parse(require('fs').readFileSync('assets/apps.json','utf8')); console.log('OK')"
node -e "JSON.parse(require('fs').readFileSync('assets/filter-config.json','utf8')); console.log('OK')"

# 2. 클래스명을 추가했다면 CSS 재빌드
npm run build:css

# 3. 로컬 서버로 확인
python3 -m http.server 8765
```

브라우저에서 확인할 것:

- 새 앱이 목록에 보이는가 (`isUse: true` 인지)
- 카드의 환경 배지 색이 제대로 나오는가
- 새 필터/항목이 드롭다운에 뜨고, 선택하면 목록이 걸러지는가
- 필터 선택 후 **주소창이 바뀌는가** (`/category/gbc` 형태) — 안 바뀌면 `url` 설정 누락
- 그 주소를 새 탭에 붙여넣어도 같은 필터가 복원되는가
- 상세페이지(`?id=...`)에서 스크린샷이 잘리지 않는가
