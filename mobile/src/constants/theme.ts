/**
 * HirePilot Mobile Design Tokens & Theme
 * Sourced directly from Google Stitch Design Specs (Dark Navy + Liquid Glass + Electric Blue)
 */

export const COLORS = {
  // Background & Atmosphere
  background: '#020617', // Deep Space Navy
  backgroundAlt: '#0b0e15',
  surface: '#10131a',
  surfaceContainer: '#1d2027',
  surfaceContainerLow: '#191b23',
  surfaceContainerHigh: '#272a31',
  surfaceContainerHighest: '#32353c',

  // Brand Accents
  primary: '#adc6ff', // Electric Blue (Light)
  primaryBright: '#38bdf8', // Vibrant Cyan-Blue
  primaryContainer: '#4d8eff',
  primaryDeep: '#002e6a',
  
  secondary: '#4cd7f6', // Neon Cyan
  secondaryContainer: '#03b5d3',
  
  tertiary: '#ffb786', // Warm Amber
  tertiaryContainer: '#df7412',

  // Status & Feedback
  success: '#4ade80',
  successContainer: 'rgba(74, 222, 128, 0.15)',
  warning: '#fbbf24',
  warningContainer: 'rgba(251, 191, 36, 0.15)',
  error: '#ffb4ab',
  errorBright: '#f43f5e',
  errorContainer: 'rgba(244, 63, 94, 0.15)',

  // Typography
  onSurface: '#e1e2ec',
  onSurfaceVariant: '#94a3b8',
  white: '#ffffff',
  outline: '#8c909f',
  outlineVariant: '#424754',

  // Glassmorphic Transparency & Borders
  glassBg: 'rgba(255, 255, 255, 0.05)',
  glassBgElevated: 'rgba(255, 255, 255, 0.09)',
  glassBgHeavy: 'rgba(12, 20, 37, 0.85)',
  glassBorder: 'rgba(255, 255, 255, 0.10)',
  glassBorderElevated: 'rgba(255, 255, 255, 0.16)',
  glassBorderPrimary: 'rgba(56, 189, 248, 0.35)',

  // Ambient Glows
  glowPrimary: 'rgba(56, 189, 248, 0.25)',
  glowCyan: 'rgba(76, 215, 246, 0.20)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  container: 20,
  safeAreaBottom: 34,
};

export const RADIUS = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const TYPOGRAPHY = {
  displayLg: {
    fontSize: 36,
    fontWeight: '700' as const,
    lineHeight: 44,
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  headlineLg: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 34,
    color: COLORS.white,
    letterSpacing: -0.3,
  },
  titleMd: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 26,
    color: COLORS.white,
  },
  titleSm: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 22,
    color: COLORS.white,
  },
  bodyLg: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
    color: COLORS.onSurface,
  },
  bodyMd: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
    color: COLORS.onSurfaceVariant,
  },
  bodySm: {
    fontSize: 11,
    fontWeight: '400' as const,
    lineHeight: 16,
    color: COLORS.onSurfaceVariant,
  },
  labelCaps: {
    fontSize: 11,
    fontWeight: '700' as const,
    lineHeight: 14,
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
    color: COLORS.primaryBright,
  },
  mono: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: COLORS.primaryBright,
  },
};
