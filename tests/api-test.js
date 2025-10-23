/**
 * API 엔드포인트 테스트 스크립트
 *
 * 사용법: node tests/api-test.js
 */

const axios = require('axios');

// 설정
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api/v1';
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

// 테스트 결과 저장
const results = {
  passed: 0,
  failed: 0,
  total: 0,
};

// 로그 헬퍼
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 테스트 러너
async function runTest(name, testFn) {
  results.total++;
  try {
    await testFn();
    results.passed++;
    log(`✓ ${name}`, 'green');
  } catch (error) {
    results.failed++;
    log(`✗ ${name}`, 'red');
    log(`  오류: ${error.message}`, 'red');
  }
}

// 테스트: 헬스 체크
async function testHealthCheck() {
  const response = await axios.get(`${API_BASE_URL}/health`);
  if (response.status !== 200) {
    throw new Error(`예상: 200, 실제: ${response.status}`);
  }
}

// 테스트: 회원가입
async function testSignup() {
  const userData = {
    email: `test${Date.now()}@example.com`,
    password: 'Password123!',
    nickname: '테스트유저',
    agreeToTerms: true,
  };

  const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);

  if (response.status !== 201) {
    throw new Error(`예상: 201, 실제: ${response.status}`);
  }

  if (!response.data.data.tokens.accessToken) {
    throw new Error('액세스 토큰이 없습니다');
  }

  return response.data.data;
}

// 테스트: 로그인
async function testLogin() {
  const credentials = {
    email: 'test@example.com',
    password: 'password123',
  };

  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);

  if (response.status !== 200) {
    throw new Error(`예상: 200, 실제: ${response.status}`);
  }

  if (!response.data.data.tokens.accessToken) {
    throw new Error('액세스 토큰이 없습니다');
  }

  return response.data.data;
}

// 테스트: 인증이 필요한 엔드포인트
async function testAuthenticatedEndpoint() {
  // 먼저 로그인
  const authData = await testLogin();
  const token = authData.tokens.accessToken;

  // 프로필 조회
  const response = await axios.get(`${API_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error(`예상: 200, 실제: ${response.status}`);
  }

  if (!response.data.data.id) {
    throw new Error('사용자 ID가 없습니다');
  }
}

// 테스트: 게시글 목록 조회
async function testGetPosts() {
  const response = await axios.get(`${API_BASE_URL}/posts?page=1&limit=10`);

  if (response.status !== 200) {
    throw new Error(`예상: 200, 실제: ${response.status}`);
  }

  if (!Array.isArray(response.data.data.posts)) {
    throw new Error('게시글 목록이 배열이 아닙니다');
  }
}

// 테스트: 검색
async function testSearch() {
  const response = await axios.get(`${API_BASE_URL}/search?q=React&type=posts`);

  if (response.status !== 200) {
    throw new Error(`예상: 200, 실제: ${response.status}`);
  }

  if (!response.data.data.results) {
    throw new Error('검색 결과가 없습니다');
  }
}

// 테스트: 에러 처리 (404)
async function test404Error() {
  try {
    await axios.get(`${API_BASE_URL}/nonexistent`);
    throw new Error('404 에러가 발생하지 않았습니다');
  } catch (error) {
    if (error.response.status !== 404) {
      throw new Error(`예상: 404, 실제: ${error.response.status}`);
    }
  }
}

// 테스트: Rate Limiting
async function testRateLimit() {
  const requests = [];

  // 연속으로 많은 요청 보내기
  for (let i = 0; i < 150; i++) {
    requests.push(axios.get(`${API_BASE_URL}/posts`));
  }

  try {
    await Promise.all(requests);
  } catch (error) {
    if (error.response.status === 429) {
      // Rate limit이 정상적으로 작동
      return;
    }
    throw new Error('Rate limit이 작동하지 않습니다');
  }
}

// 메인 함수
async function main() {
  log('\n🧪 API 테스트 시작\n', 'blue');
  log(`테스트 대상: ${API_BASE_URL}\n`, 'yellow');

  // 테스트 실행
  await runTest('헬스 체크', testHealthCheck);
  await runTest('회원가입', testSignup);
  await runTest('로그인', testLogin);
  await runTest('인증 필요 엔드포인트', testAuthenticatedEndpoint);
  await runTest('게시글 목록 조회', testGetPosts);
  await runTest('검색', testSearch);
  await runTest('404 에러 처리', test404Error);
  await runTest('Rate Limiting', testRateLimit);

  // 결과 출력
  log('\n' + '='.repeat(50), 'blue');
  log(`\n테스트 결과:`, 'blue');
  log(`  총 테스트: ${results.total}`, 'blue');
  log(`  통과: ${results.passed}`, 'green');
  log(`  실패: ${results.failed}`, 'red');

  if (results.failed === 0) {
    log(`\n✨ 모든 테스트가 통과했습니다!\n`, 'green');
    process.exit(0);
  } else {
    log(`\n❌ 일부 테스트가 실패했습니다.\n`, 'red');
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  main().catch((error) => {
    log(`\n치명적 오류: ${error.message}\n`, 'red');
    process.exit(1);
  });
}

module.exports = { runTest, testLogin };
