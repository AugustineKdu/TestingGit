# 테스트 가이드

## 개요
이 디렉토리는 프로젝트의 다양한 테스트 스크립트와 자동화 도구를 포함합니다.

## 테스트 유형

### 1. 단위 테스트 (Unit Tests)
개별 함수와 컴포넌트를 테스트합니다.

```bash
npm test
```

### 2. 통합 테스트 (Integration Tests)
여러 컴포넌트의 상호작용을 테스트합니다.

```bash
npm run test:integration
```

### 3. E2E 테스트 (End-to-End Tests)
전체 사용자 플로우를 테스트합니다.

```bash
npm run test:e2e
```

### 4. API 테스트
백엔드 API 엔드포인트를 테스트합니다.

```bash
node tests/api-test.js
```

### 5. Figma 연동 테스트
Figma API 연결을 테스트합니다.

```bash
node tests/figma-test.js
```

## 테스트 커버리지

커버리지 리포트 생성:
```bash
npm run test:coverage
```

커버리지 목표:
- 코드 커버리지: 80% 이상
- 브랜치 커버리지: 70% 이상
- 함수 커버리지: 80% 이상

## CI/CD 통합

### GitHub Actions
`.github/workflows/test.yml` 참고

### 자동화된 테스트
- Pull Request 시 자동 실행
- Main 브랜치 커밋 시 전체 테스트 실행
- 야간 빌드로 E2E 테스트 실행

## 테스트 작성 가이드

### Jest 단위 테스트 예시
```typescript
describe('LoginScreen', () => {
  it('올바른 이메일로 로그인할 수 있어야 함', async () => {
    const { getByPlaceholder, getByText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholder('이메일'), 'test@example.com');
    fireEvent.changeText(getByPlaceholder('비밀번호'), 'password123');
    fireEvent.press(getByText('로그인'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Main');
    });
  });
});
```

### API 테스트 예시
```javascript
describe('Auth API', () => {
  test('POST /auth/login - 성공', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.tokens).toBeDefined();
  });
});
```

## 성능 테스트

### Lighthouse
```bash
npm run lighthouse
```

### 벤치마크
```bash
node tests/benchmark.js
```

## 테스트 데이터

테스트용 목 데이터는 `tests/mocks/` 디렉토리에 있습니다.

```javascript
import { mockUser, mockPost } from './mocks/data';
```

## 문제 해결

### 테스트 실패 시
1. 캐시 삭제: `npm run test -- --clearCache`
2. 의존성 재설치: `rm -rf node_modules && npm install`
3. 환경 변수 확인: `.env.test` 파일 확인

### 느린 테스트
- `--runInBand` 옵션 사용
- 병렬 실행 워커 수 조정: `--maxWorkers=4`

## 참고 자료
- [Jest 문서](https://jestjs.io/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Detox E2E 테스트](https://wix.github.io/Detox/)
