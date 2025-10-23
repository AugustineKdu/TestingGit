/**
 * Figma API 연결 테스트 스크립트
 *
 * 사용법: node tests/figma-test.js
 */

require('dotenv').config();
const axios = require('axios');

// 설정
const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;
const FIGMA_API_URL = 'https://api.figma.com/v1';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 환경 변수 확인
function checkEnvironment() {
  log('\n🔍 환경 변수 확인\n', 'blue');

  if (!FIGMA_TOKEN) {
    log('✗ FIGMA_ACCESS_TOKEN이 설정되지 않았습니다', 'red');
    log('  .env 파일에 FIGMA_ACCESS_TOKEN을 추가해주세요\n', 'yellow');
    return false;
  }

  if (!FILE_KEY) {
    log('⚠ FIGMA_FILE_KEY가 설정되지 않았습니다', 'yellow');
    log('  파일 조회 테스트를 건너뜁니다\n', 'yellow');
  }

  log('✓ 환경 변수 확인 완료', 'green');
  log(`  토큰: ${FIGMA_TOKEN.substring(0, 10)}...`, 'green');
  if (FILE_KEY) {
    log(`  파일 키: ${FILE_KEY}\n`, 'green');
  }

  return true;
}

// 테스트 1: API 연결 확인
async function testConnection() {
  log('📡 Figma API 연결 테스트', 'blue');

  try {
    const response = await axios.get(`${FIGMA_API_URL}/me`, {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    });

    if (response.status === 200) {
      log('✓ API 연결 성공', 'green');
      log(`  사용자: ${response.data.email}`, 'green');
      log(`  핸들: ${response.data.handle}\n`, 'green');
      return true;
    }
  } catch (error) {
    log('✗ API 연결 실패', 'red');
    if (error.response) {
      log(`  상태 코드: ${error.response.status}`, 'red');
      log(`  메시지: ${error.response.data.message || error.message}\n`, 'red');
    } else {
      log(`  오류: ${error.message}\n`, 'red');
    }
    return false;
  }
}

// 테스트 2: 파일 접근 확인
async function testFileAccess() {
  if (!FILE_KEY) {
    log('⏭ 파일 접근 테스트 건너뜀 (FILE_KEY 없음)\n', 'yellow');
    return true;
  }

  log('📄 Figma 파일 접근 테스트', 'blue');

  try {
    const response = await axios.get(`${FIGMA_API_URL}/files/${FILE_KEY}`, {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    });

    if (response.status === 200) {
      log('✓ 파일 접근 성공', 'green');
      log(`  파일명: ${response.data.name}`, 'green');
      log(`  버전: ${response.data.version}`, 'green');
      log(`  마지막 수정: ${response.data.lastModified}\n`, 'green');
      return true;
    }
  } catch (error) {
    log('✗ 파일 접근 실패', 'red');
    if (error.response) {
      log(`  상태 코드: ${error.response.status}`, 'red');

      if (error.response.status === 403) {
        log('  권한 오류: 파일에 대한 접근 권한이 없습니다', 'red');
        log('  파일 권한을 확인하거나 올바른 FILE_KEY를 사용하세요\n', 'yellow');
      } else if (error.response.status === 404) {
        log('  파일을 찾을 수 없습니다', 'red');
        log('  FILE_KEY가 올바른지 확인하세요\n', 'yellow');
      } else {
        log(`  메시지: ${error.response.data.message || error.message}\n`, 'red');
      }
    } else {
      log(`  오류: ${error.message}\n`, 'red');
    }
    return false;
  }
}

// 테스트 3: 스타일 추출
async function testStylesExtraction() {
  if (!FILE_KEY) {
    log('⏭ 스타일 추출 테스트 건너뜀 (FILE_KEY 없음)\n', 'yellow');
    return true;
  }

  log('🎨 Figma 스타일 추출 테스트', 'blue');

  try {
    const response = await axios.get(
      `${FIGMA_API_URL}/files/${FILE_KEY}/styles`,
      {
        headers: {
          'X-Figma-Token': FIGMA_TOKEN,
        },
      }
    );

    if (response.status === 200) {
      const styles = response.data.meta.styles;
      log('✓ 스타일 추출 성공', 'green');
      log(`  발견된 스타일: ${styles ? styles.length : 0}개`, 'green');

      if (styles && styles.length > 0) {
        log('\n  스타일 목록:', 'green');
        styles.slice(0, 5).forEach((style) => {
          log(`    - ${style.name} (${style.style_type})`, 'green');
        });
        if (styles.length > 5) {
          log(`    ... 외 ${styles.length - 5}개\n`, 'green');
        }
      }
      return true;
    }
  } catch (error) {
    log('✗ 스타일 추출 실패', 'red');
    if (error.response) {
      log(`  상태 코드: ${error.response.status}`, 'red');
      log(`  메시지: ${error.response.data.message || error.message}\n`, 'red');
    } else {
      log(`  오류: ${error.message}\n`, 'red');
    }
    return false;
  }
}

// 테스트 4: 이미지 내보내기
async function testImageExport() {
  if (!FILE_KEY) {
    log('⏭ 이미지 내보내기 테스트 건너뜀 (FILE_KEY 없음)\n', 'yellow');
    return true;
  }

  log('🖼 Figma 이미지 내보내기 테스트', 'blue');

  try {
    // 먼저 파일의 노드 ID를 가져옴
    const fileResponse = await axios.get(
      `${FIGMA_API_URL}/files/${FILE_KEY}`,
      {
        headers: {
          'X-Figma-Token': FIGMA_TOKEN,
        },
      }
    );

    const nodeId = fileResponse.data.document.id;

    // 이미지 내보내기 테스트
    const exportResponse = await axios.get(
      `${FIGMA_API_URL}/images/${FILE_KEY}?ids=${nodeId}&format=png`,
      {
        headers: {
          'X-Figma-Token': FIGMA_TOKEN,
        },
      }
    );

    if (exportResponse.status === 200) {
      log('✓ 이미지 내보내기 성공', 'green');
      log(`  이미지 URL 생성됨\n`, 'green');
      return true;
    }
  } catch (error) {
    log('✗ 이미지 내보내기 실패', 'red');
    if (error.response) {
      log(`  상태 코드: ${error.response.status}`, 'red');
      log(`  메시지: ${error.response.data.message || error.message}\n`, 'red');
    } else {
      log(`  오류: ${error.message}\n`, 'red');
    }
    return false;
  }
}

// 결과 요약
function summarize(results) {
  log('='.repeat(50), 'blue');
  log('\n📊 테스트 결과 요약\n', 'blue');

  const passed = results.filter((r) => r.success).length;
  const total = results.length;

  results.forEach((result) => {
    const icon = result.success ? '✓' : '✗';
    const color = result.success ? 'green' : 'red';
    log(`${icon} ${result.name}`, color);
  });

  log(`\n통과: ${passed}/${total}`, passed === total ? 'green' : 'yellow');

  if (passed === total) {
    log('\n✨ 모든 테스트가 통과했습니다!', 'green');
    log('Figma API 연동이 정상적으로 작동합니다.\n', 'green');
  } else {
    log('\n⚠ 일부 테스트가 실패했습니다.', 'yellow');
    log('.env 파일과 Figma 설정을 확인해주세요.\n', 'yellow');
  }
}

// 메인 함수
async function main() {
  log('\n🧪 Figma 연동 테스트 시작\n', 'blue');

  // 환경 변수 확인
  if (!checkEnvironment()) {
    process.exit(1);
  }

  // 테스트 실행
  const results = [];

  results.push({
    name: 'API 연결',
    success: await testConnection(),
  });

  results.push({
    name: '파일 접근',
    success: await testFileAccess(),
  });

  results.push({
    name: '스타일 추출',
    success: await testStylesExtraction(),
  });

  results.push({
    name: '이미지 내보내기',
    success: await testImageExport(),
  });

  // 결과 요약
  summarize(results);

  // 종료 코드
  const allPassed = results.every((r) => r.success);
  process.exit(allPassed ? 0 : 1);
}

// 스크립트 실행
if (require.main === module) {
  main().catch((error) => {
    log(`\n❌ 치명적 오류: ${error.message}\n`, 'red');
    process.exit(1);
  });
}

module.exports = { testConnection, testFileAccess };
