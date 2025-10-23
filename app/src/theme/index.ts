/**
 * 테마 통합 모듈
 */

import { lightColors, darkColors, Colors } from './colors';
import { typography, Typography } from './typography';
import { spacing, Spacing } from './spacing';

export interface Theme {
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
  dark: boolean;
}

export const lightTheme: Theme = {
  colors: lightColors,
  typography,
  spacing,
  dark: false,
};

export const darkTheme: Theme = {
  colors: darkColors,
  typography,
  spacing,
  dark: true,
};

export { lightColors, darkColors, typography, spacing };
export type { Colors, Typography, Spacing };
