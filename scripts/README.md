# ezARIA config script

## Server Config 암호화 / 복호화 파일
- NAS: http://10.1.30.60/apps/files/files/21031?dir=/MobileSolution/Solutions/ezARIA/ezaria_server_config_encrypt_key
- encrypt_config.py, config_key.json, decrypt_config.py 를 받아서 scripts 폴더에 저장해주세요
- 키를 새로 생성하면 기존에 운영되던 앱에 영향이 갈수 있으므로 반드시 주의바랍니다.

## ezARIA Server Config 업데이트 방법
1. ./scripts/decrypt_config.sh [업데이트할 환경 (development, staging, production)] 를 실행하여 config.json 을 추출
2. config.json 을 수정후 ./scripts/build_config.sh [업데이트할 환경 (development, staging, production)] 를 실행

# Enterprise App Download Service

사내 모바일 애플리케이션을 안전하고 편리하게 배포하는 플랫폼입니다.

![Preview](images/preview.png)


## ✨ 주요 기능

### 📱 앱 목록 & 필터링
- **Customer** - 고객사별 필터
- **App Type** - 앱 유형별 필터 (eConsent, Patient Portal 등)
- **Platform** - 플랫폼별 필터 (iOS, Android, Windows)
- **Environment** - 환경별 필터 (Development, Staging, Production)
- **검색** - 앱 이름/설명 실시간 검색

### 🔗 URL 기반 라우팅
```
/category/royal-commission          → Customer 필터
/tag/econsent                       → App Type 필터
/platform/ios                       → Platform 필터
/env/development                    → Environment 필터
/category/gbc/tag/patient-portal    → 복합 필터
```

### 📲 다운로드 & QR 코드
- iOS (itms-services 프로토콜)
- Android (APK 직접 다운로드)
- Windows (ZIP 다운로드)
- QR 코드 스캔으로 모바일 설치

### 📋 상세 페이지
- 앱 정보 및 설명
- 스크린샷 갤러리
- 플랫폼별 다운로드
- 업데이트 내역 (최근 3개)

---

## 🛠 기술 스택

| 기술 | 용도 |
|------|------|
| **HTML5** | 마크업 |
| **Tailwind CSS (CDN)** | 스타일링 |
| **Vanilla JavaScript** | 기능 구현 |
| **QRCode.js** | QR 코드 생성 |
| **GitHub Pages** | 호스팅 |

---

## 📁 파일 구조
```
├── index.html              # 메인 페이지 (앱 목록 / 상세)
├── about.html              # About 페이지
├── 404.html                # Path 라우팅용 리다이렉트
├── js/
│   ├── vendors.js          # MDL 라이브러리
│   ├── url-manager.js      # URL 라우팅 관리
│   ├── filter-manager.js   # 필터 UI 및 로직
│   ├── download-handler.js # 다운로드 섹션 & QR
│   └── app-integration.js  # 앱 렌더링 통합
├── assets/
│   └── apps.json           # 앱 데이터
├── images/
│   └── logo-default.png    # 로고 이미지
└── apps/                   # 앱별 이미지 폴더
    ├── ezconsent/
    └── ezphr/
```

---

## 📝 apps.json 구조
```json
{
  "environment": "PROD",
  "apps": [
    {
      "id": "ezconsent_rcjy_dev",
      "name": "eConsent for Royal Commission (for DEVELOPMENT)",
      "isUse": true,
      "iconUrl": "./apps/ezconsent/icon.png",
      "indexImageUrl": "./apps/ezconsent/thumbnail.png",
      "summary": "앱 요약",
      "description": "앱 상세 설명",
      "screenshots": [
        { "url": "./apps/ezconsent/screenshot_01.png", "alt": "01" }
      ],
      "downloads": [
        {
          "platform": "IOS",
          "version": "2.0.15",
          "url": "itms-services://...",
          "isUse": true
        },
        {
          "platform": "Android",
          "version": "2.0.15",
          "url": "https://.../app.apk",
          "isUse": true
        }
      ],
      "histories": [
        {
          "version": "2.0.15",
          "description": "버그 수정 및 성능 개선",
          "releaseDate": "2025-12-27"
        }
      ]
    }
  ]
}
```

---

## 🚀 배포 방법

### GitHub Pages

1. 저장소에 코드 Push
2. Settings > Pages > Source: `main` branch
3. 배포 완료!

### URL 라우팅 작동 원리
```
1. 사용자가 /category/gbc 접속
2. GitHub Pages: 해당 폴더 없음 → 404.html 실행
3. 404.html: /index.html?_path=/category/gbc 로 리다이렉트
4. index.html: url-manager.js가 _path 파싱
5. 브라우저 주소창: /category/gbc 로 표시
6. 필터 적용!
```

---

## 🎨 커스터마이징

### 메인 컬러 변경

**index.html / about.html의 Tailwind 설정:**
```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#0393D6',  // 메인 컬러
          600: '#0282be',
          700: '#0271a6',
          // ...
        }
      }
    }
  }
}
```

### 환경 배지 색상 변경

**app-integration.js:**
```javascript
var ENV_BADGES = {
  'Development': {
    class: 'bg-orange-100 text-orange-700 border border-orange-200',
    label: 'Development'
  },
  'Staging': {
    class: 'bg-purple-100 text-purple-700 border border-purple-200',
    label: 'Staging'
  },
  'Production': {
    class: 'bg-green-100 text-green-700 border border-green-200',
    label: 'Production'
  }
};
```