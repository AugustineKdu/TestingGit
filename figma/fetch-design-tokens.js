/**
 * Figma 디자인 토큰 가져오기 스크립트
 *
 * 이 스크립트는 Figma API를 사용하여 디자인 파일에서
 * 색상, 타이포그래피, 간격 등의 디자인 토큰을 추출합니다.
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();

const config = require('./config.json');

// 환경 변수 확인
const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!FIGMA_TOKEN || !FILE_KEY) {
  console.error('❌ 오류: FIGMA_ACCESS_TOKEN과 FIGMA_FILE_KEY를 .env 파일에 설정해주세요.');
  process.exit(1);
}

// Figma API 호출 함수
async function fetchFigmaFile(fileKey) {
  const url = `${config.figma.apiUrl}/files/${fileKey}`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN
      }
    });

    if (!response.ok) {
      throw new Error(`Figma API 오류: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Figma 파일을 가져오는데 실패했습니다:', error.message);
    process.exit(1);
  }
}

// 색상 토큰 추출
function extractColors(figmaData) {
  const colors = {};

  // Figma 파일에서 색상 스타일 추출
  if (figmaData.styles) {
    Object.entries(figmaData.styles).forEach(([id, style]) => {
      if (style.styleType === 'FILL') {
        const name = style.name.toLowerCase().replace(/\s+/g, '-');
        colors[name] = style.description || '#000000';
      }
    });
  }

  return colors;
}

// 타이포그래피 토큰 추출
function extractTypography(figmaData) {
  const typography = {};

  if (figmaData.styles) {
    Object.entries(figmaData.styles).forEach(([id, style]) => {
      if (style.styleType === 'TEXT') {
        const name = style.name.toLowerCase().replace(/\s+/g, '-');
        typography[name] = {
          fontFamily: style.fontFamily || 'Pretendard',
          fontSize: style.fontSize || 16,
          fontWeight: style.fontWeight || 400,
          lineHeight: style.lineHeight || 1.5
        };
      }
    });
  }

  return typography;
}

// 간격 토큰 생성 (일반적인 값들)
function generateSpacing() {
  return {
    'xs': '4px',
    'sm': '8px',
    'md': '16px',
    'lg': '24px',
    'xl': '32px',
    'xxl': '48px'
  };
}

// 토큰을 파일로 저장
function saveTokens(tokens, filename) {
  const outputDir = config.figma.outputDir;

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filepath = path.join(outputDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(tokens, null, 2));

  console.log(`✅ ${filename} 저장 완료`);
}

// CSS 변수 생성
function generateCSS(colors, typography, spacing) {
  let css = ':root {\n';

  // 색상
  Object.entries(colors).forEach(([name, value]) => {
    css += `  --${config.export.cssPrefix}color-${name}: ${value};\n`;
  });

  // 타이포그래피
  Object.entries(typography).forEach(([name, props]) => {
    css += `  --${config.export.cssPrefix}font-${name}-family: ${props.fontFamily};\n`;
    css += `  --${config.export.cssPrefix}font-${name}-size: ${props.fontSize}px;\n`;
    css += `  --${config.export.cssPrefix}font-${name}-weight: ${props.fontWeight};\n`;
  });

  // 간격
  Object.entries(spacing).forEach(([name, value]) => {
    css += `  --${config.export.cssPrefix}spacing-${name}: ${value};\n`;
  });

  css += '}\n';

  return css;
}

// 메인 함수
async function main() {
  console.log('🎨 Figma 디자인 토큰 가져오기 시작...\n');

  // Figma 파일 데이터 가져오기
  console.log('📥 Figma 파일 다운로드 중...');
  const figmaData = await fetchFigmaFile(FILE_KEY);

  // 토큰 추출
  console.log('🔍 디자인 토큰 추출 중...\n');
  const colors = extractColors(figmaData);
  const typography = extractTypography(figmaData);
  const spacing = generateSpacing();

  // 통합 토큰 객체
  const tokens = {
    colors,
    typography,
    spacing,
    metadata: {
      generatedAt: new Date().toISOString(),
      figmaFileKey: FILE_KEY,
      version: '1.0.0'
    }
  };

  // 파일 저장
  if (config.figma.tokenMapping.colors.enabled) {
    saveTokens(colors, config.figma.tokenMapping.colors.outputFile);
  }

  if (config.figma.tokenMapping.typography.enabled) {
    saveTokens(typography, config.figma.tokenMapping.typography.outputFile);
  }

  if (config.figma.tokenMapping.spacing.enabled) {
    saveTokens(spacing, config.figma.tokenMapping.spacing.outputFile);
  }

  // 통합 파일
  saveTokens(tokens, 'tokens.json');

  // CSS 파일 생성
  if (config.export.formats.includes('css')) {
    const css = generateCSS(colors, typography, spacing);
    const cssPath = path.join(config.figma.outputDir, 'tokens.css');
    fs.writeFileSync(cssPath, css);
    console.log('✅ tokens.css 저장 완료');
  }

  console.log('\n✨ 모든 디자인 토큰이 성공적으로 생성되었습니다!');
}

// 스크립트 실행
main().catch(error => {
  console.error('❌ 오류 발생:', error);
  process.exit(1);
});
