# 앱 · 필터 추가 가이드

앱을 추가하거나 필터를 늘릴 때 이 폴더의 파일 두 개만 고치면 됩니다.
HTML이나 JS는 건드릴 필요 없습니다.

| 파일 | 언제 고치나 |
|---|---|
| `apps.json` | 새 앱을 추가하거나 버전을 올릴 때 |
| `filter-config.json` | 새 고객사 · 새 앱 종류가 생겼을 때 |

수정하고 커밋하면 **10분 안에 사이트에 반영**됩니다.

---

## 1. 새 앱 추가하기

**가장 쉬운 방법: `apps.json`에서 비슷한 앱을 통째로 복사해서 고치세요.**

`apps` 배열에 이런 항목을 하나 추가하면 됩니다.

```json
{
  "id": "ezphr_snuh_prod",
  "name": "Patient Portal for SNUH",
  "isUse": true,
  "iconUrl": "./apps/ezphr/icon.png",
  "indexImageUrl": "./apps/ezphr/icon.png",
  "summary": "SNUH 환자 포털",
  "description": "앱 상세 페이지에 나오는 긴 설명",
  "screenshots": [
    { "url": "./apps/ezphr/01.png", "alt": "01" }
  ],
  "downloads": [
    {
      "platform": "Android",
      "version": "1.0.0",
      "url": "https://.../app.apk",
      "isUse": true
    }
  ],
  "histories": [
    {
      "version": "1.0.0",
      "description": "최초 배포",
      "releaseDate": "2026-07-28",
      "minSdkVersion": "",
      "sdkVersion": "",
      "installUrl": ""
    }
  ]
}
```

### 꼭 확인할 것

| 항목 | 설명 |
|---|---|
| `id` | 다른 앱과 겹치면 안 됩니다. 상세페이지 주소가 됩니다 |
| `isUse` | `false`면 목록에 아예 안 나옵니다 |
| `downloads`의 `isUse` | 여기도 `true`여야 다운로드 버튼이 생깁니다 |
| `platform` | `IOS` / `Android` / `Windows` 중 하나 |
| 이미지 경로 | `./`로 시작하게 쓰세요. 파일이 없어도 에러가 안 나니 경로를 꼭 확인 |

### ⚠️ 이름과 id를 잘 지어야 필터가 자동으로 붙습니다

앱에 "고객사"나 "앱 종류"를 직접 적는 칸이 **없습니다.**
대신 `name`과 `id`에 들어있는 단어를 보고 자동으로 분류합니다.

| 필터 | 어디를 보나 | 예시 |
|---|---|---|
| Customer | `name` | 이름에 `GBC`가 있으면 → GBC |
| App Type | `id` | id에 `ezphr`가 있으면 → Patient Portal |
| Environment | `name`과 `id` | 이름에 `Staging` 또는 id에 `_stg` → Staging |
| Platform | `downloads` | `isUse: true`인 것만 |

**그래서 기존 앱들의 작명 규칙을 따라가는 게 제일 안전합니다.**
분류에 실패해도 에러가 안 나고 조용히 `Other`로 들어가니, 추가한 뒤에는 꼭 필터를 걸어보세요.

### 스크린샷

- 잘리지 않고 원본 비율 그대로 나옵니다. 가로 이미지도 괜찮습니다
- **한 앱 안의 스크린샷은 크기(비율)를 통일하세요.** 하나만 길면 그것만 아래로 삐져나옵니다

---

## 2. 새 고객사 · 앱 종류 추가하기

`filter-config.json`의 `rules` 안에서 해당 항목의 `matches` 목록에 한 줄만 추가하면 됩니다.

**예: 고객사 `SNUH` 추가**

```json
"customer": {
  "matches": [
    { "value": "Royal Commission", "contains": { "name": ["Royal Commission", "RCHSP"] } },
    { "value": "GBC", "contains": { "name": ["GBC"] } },
    { "value": "SNUH", "contains": { "name": ["SNUH"] } }
  ]
}
```

앱 이름에 `SNUH`가 들어있으면 SNUH로 분류됩니다. 끝입니다.

**예: 앱 종류 추가** — `appType`은 이름 대신 **id**를 봅니다.

```json
{ "value": "ezVital", "contains": { "id": ["ezvital"] } }
```

### ⚠️ 위에서부터 순서대로 검사합니다

먼저 걸리는 것이 이깁니다. 좁은 조건을 **위에** 두세요.

```json
{ "value": "GBC",       "contains": { "name": ["GBC"] } },
{ "value": "GBC Dubai", "contains": { "name": ["GBC Dubai"] } }
```

이렇게 쓰면 `GBC`가 먼저 걸려서 `GBC Dubai`는 영원히 안 나옵니다. 순서를 바꿔야 합니다.

### 찾을 수 있는 곳

`contains` 안에는 `name`, `id`, `summary`, `description` 네 가지만 쓸 수 있습니다.
여러 개를 적으면 **하나만 걸려도** 매칭됩니다.

---

## 3. 필터 자체를 하나 더 만들기 (가끔)

드롭다운을 하나 더 늘리고 싶을 때만 보세요. **두 군데**에 나눠서 추가합니다.

**(1) `filters` 배열 맨 뒤에**

```json
{
  "key": "vendor",
  "label": "Vendor",
  "type": "rule",
  "url": { "segment": "vendor", "aliases": [], "query": "vendor", "match": "slug" }
}
```

**(2) `rules` 안에** — `key`와 같은 이름으로

```json
"vendor": {
  "ignoreCase": true,
  "fallback": "기타",
  "matches": [
    { "value": "Jubail", "contains": { "summary": ["Jubail"] } }
  ]
}
```

이것만으로 드롭다운, 모바일 필터, 목록 걸러내기, 주소창 반영까지 전부 자동으로 됩니다.
`url` 부분을 빼먹으면 화면에서는 되는데 **주소 공유와 뒤로가기가 안 되니** 꼭 같이 넣으세요.

---

## 이럴 땐 이렇게

**앱을 추가했는데 목록에 안 보여요**
→ `isUse`가 `true`인지 확인하세요.

**새 앱이 `Other`로 분류돼요**
→ 이름이나 id에 분류 단어가 없는 겁니다. 이름을 고치거나 [2번](#2-새-고객사--앱-종류-추가하기)처럼 규칙을 추가하세요.

**규칙을 추가했는데 드롭다운에 안 나와요**
→ 정상입니다. 드롭다운 목록은 **실제 앱 데이터에서 만들어집니다.** 그 값으로 분류되는 앱이 하나라도 있어야 나타납니다.

**JSON을 고쳤더니 페이지가 하얗게 비었어요**
→ 쉼표나 괄호가 틀린 겁니다. 아래 문법 검사를 돌려보세요.

**수정했는데 사이트가 그대로예요**
→ 10분만 기다리세요. 급하면 `js/filter-manager.js`의 `?v=1`을 `?v=2`로 올리면 즉시 반영됩니다.
(`apps.json`은 항상 즉시 반영되니 신경 쓸 필요 없습니다)

**파일을 더블클릭해서 열었는데 아무것도 안 나와요**
→ 그렇게는 안 됩니다. 아래처럼 로컬 서버로 여세요.

**배지 색이 회색으로 나와요**
→ `filter-config.json`의 `badges`에 **새로운 색을 추가했을 때만** 생기는 문제입니다.
터미널에서 `npm run build:css`를 한 번 실행하고, 바뀐 `css/output.css`도 같이 커밋하세요.
(기존 색만 쓰면 필요 없습니다)

---

## 확인하는 법

```bash
# 1. JSON 문법이 맞는지
node -e "JSON.parse(require('fs').readFileSync('assets/apps.json','utf8')); console.log('OK')"
node -e "JSON.parse(require('fs').readFileSync('assets/filter-config.json','utf8')); console.log('OK')"

# 2. 로컬에서 직접 보기
python3 -m http.server 8765
```

그다음 브라우저에서 `http://localhost:8765/index.html` 을 열고 확인하세요.

- 새 앱이 목록에 보이는가
- 필터를 걸었을 때 새 앱이 제대로 걸러지는가
- 앱 카드의 환경 배지(Development / Staging / Production) 색이 나오는가
- 상세보기를 눌렀을 때 스크린샷과 다운로드 버튼이 정상인가
