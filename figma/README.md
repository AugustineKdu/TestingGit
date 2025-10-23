# Figma 연동 가이드

## 개요
Figma API를 사용하여 디자인 토큰을 자동으로 가져오는 기능입니다.

## 설정 방법

### 1. Figma 액세스 토큰 발급
1. [Figma 설정](https://www.figma.com/settings)으로 이동
2. "Personal Access Tokens" 섹션에서 새 토큰 생성
3. 생성된 토큰을 안전하게 보관

### 2. 환경 변수 설정
`.env` 파일을 생성하고 다음 내용을 추가:
```
FIGMA_ACCESS_TOKEN=your_token_here
FIGMA_FILE_KEY=your_file_key_here
```

### 3. 패키지 설치
```bash
npm install
```

### 4. 디자인 토큰 가져오기
```bash
node fetch-design-tokens.js
```

## 파일 구조
- `config.json`: 피그마 연동 설정 파일
- `fetch-design-tokens.js`: 디자인 토큰을 가져오는 스크립트
- `.env.example`: 환경 변수 예시 파일
- `design-tokens/`: 생성된 디자인 토큰 파일

## 사용 예시
```javascript
// 디자인 토큰 불러오기
const tokens = require('./design-tokens/tokens.json');

// 색상 사용
const primaryColor = tokens.colors.primary;
```

## 주의사항
- `.env` 파일은 절대 git에 커밋하지 마세요
- 액세스 토큰은 비밀로 유지하세요
- Figma 파일의 권한 설정을 확인하세요
