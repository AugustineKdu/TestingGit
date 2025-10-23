# 앱 프로토타입

## 개요
React Native 기반의 크로스 플랫폼 모바일 앱 프로토타입입니다.

## Figma 디자인
🎨 **디자인 확인**: [Figma에서 보기](https://www.figma.com/design/2JyFPKO027kaLpQUEZFIKH/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=0-1&m=dev)

이 앱은 Figma 디자인 시스템과 연동되어 있으며, 앱 내 설정에서도 디자인 파일에 접근할 수 있습니다.

## 기술 스택
- **React Native**: 0.72+
- **TypeScript**: 5.0+
- **React Navigation**: 6.x
- **React Query**: 4.x
- **Zustand**: 4.x (상태 관리)
- **Axios**: HTTP 클라이언트

## 프로젝트 구조
```
app/
├── src/
│   ├── screens/        # 화면 컴포넌트
│   ├── components/     # 재사용 가능한 컴포넌트
│   ├── navigation/     # 내비게이션 설정
│   ├── api/           # API 클라이언트
│   ├── hooks/         # 커스텀 훅
│   ├── store/         # 상태 관리
│   ├── utils/         # 유틸리티 함수
│   ├── types/         # TypeScript 타입
│   └── theme/         # 테마 설정
├── __tests__/         # 테스트 파일
├── android/           # Android 네이티브 코드
├── ios/              # iOS 네이티브 코드
└── package.json
```

## 설치 및 실행

### 1. 의존성 설치
```bash
cd app
npm install
```

### 2. iOS 실행
```bash
npx pod-install
npm run ios
```

### 3. Android 실행
```bash
npm run android
```

### 4. 개발 서버
```bash
npm start
```

## 구현된 화면

### 인증
- 🚀 **스플래시**: 앱 시작 화면
- 🔑 **로그인**: 이메일/소셜 로그인
- ✍️ **회원가입**: 새 계정 만들기

### 메인
- 🏠 **홈**: 추천 콘텐츠 피드
- 🔍 **검색**: 게시글 및 사용자 검색
- 🔔 **알림**: 활동 알림 센터
- 👤 **프로필**: 내 프로필 및 게시글

### 설정
- ⚙️ **설정**: 앱 설정 및 계정 관리 (Figma 링크 포함)
- ✏️ **프로필 편집**: 프로필 정보 수정

### 데모
- 📱 **화면 목록**: 모든 화면을 쉽게 탐색할 수 있는 메뉴

## 주요 기능
- ✅ 사용자 인증 (로그인/회원가입)
- ✅ 프로필 관리
- ✅ 게시글 목록 및 상세
- ✅ 검색 기능
- ✅ 알림 센터
- ✅ 하단 탭 네비게이션
- ✅ Figma 디자인 연동
- ✅ TypeScript 타입 안전성

## 테스트
```bash
# 단위 테스트
npm test

# E2E 테스트
npm run test:e2e

# 커버리지
npm run test:coverage
```

## 빌드

### 개발 빌드
```bash
npm run build:dev
```

### 프로덕션 빌드
```bash
npm run build:prod
```

## 환경 변수
`.env` 파일을 생성하고 다음 변수를 설정하세요:

```env
API_BASE_URL=http://localhost:3000/api/v1
FIGMA_ACCESS_TOKEN=your_figma_token
FIGMA_FILE_KEY=2JyFPKO027kaLpQUEZFIKH
FIGMA_FILE_URL=https://www.figma.com/design/2JyFPKO027kaLpQUEZFIKH/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=0-1&m=dev
GOOGLE_CLIENT_ID=your_google_client_id
APPLE_CLIENT_ID=your_apple_client_id
```

`.env.example` 파일을 복사하여 사용하세요:
```bash
cp .env.example .env
```

## 문제 해결

### Metro 캐시 삭제
```bash
npm start -- --reset-cache
```

### 빌드 오류
```bash
cd android && ./gradlew clean
cd ios && rm -rf Pods && pod install
```

## 참고 문서
- [React Native 공식 문서](https://reactnative.dev/)
- [프로젝트 기획 문서](../docs/)
- [API 명세서](../docs/api-spec.md)
