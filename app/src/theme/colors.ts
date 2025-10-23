/**
 * 앱 테마 색상 정의
 * Figma 디자인 토큰과 동기화됩니다
 */

export const lightColors = {
  // Primary
  primary: '#007AFF',
  primaryLight: '#5AC8FA',
  primaryDark: '#0051D5',

  // Background
  background: '#FFFFFF',
  surface: '#F2F2F7',
  card: '#FFFFFF',

  // Text
  text: '#000000',
  textSecondary: '#8E8E93',
  textTertiary: '#C7C7CC',

  // Border
  border: '#E5E5EA',
  divider: '#D1D1D6',

  // Status
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#5AC8FA',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.4)',
  backdrop: 'rgba(0, 0, 0, 0.5)',
};

export const darkColors = {
  // Primary
  primary: '#0A84FF',
  primaryLight: '#64D2FF',
  primaryDark: '#0A67D1',

  // Background
  background: '#000000',
  surface: '#1C1C1E',
  card: '#2C2C2E',

  // Text
  text: '#FFFFFF',
  textSecondary: '#EBEBF5',
  textTertiary: '#8E8E93',

  // Border
  border: '#38383A',
  divider: '#48484A',

  // Status
  success: '#32D74B',
  warning: '#FF9F0A',
  error: '#FF453A',
  info: '#64D2FF',

  // Overlay
  overlay: 'rgba(255, 255, 255, 0.1)',
  backdrop: 'rgba(0, 0, 0, 0.7)',
};

export type Colors = typeof lightColors;
