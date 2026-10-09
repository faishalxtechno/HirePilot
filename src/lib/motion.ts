/**
 * HirePilot Unified Motion Design System
 * Inspired by Material 3 motion physics & web spring-to-curve specifications.
 */

export const motionTokens = {
  // Cubic-bezier curve approximations
  easing: {
    // Expressive spatial motion: entrances, major movements, expansions
    expressiveFastSpatial: 'cubic-bezier(0.42, 1.67, 0.21, 0.90)',
    expressiveDefaultSpatial: 'cubic-bezier(0.38, 1.21, 0.22, 1.00)',
    expressiveSlowSpatial: 'cubic-bezier(0.39, 1.29, 0.35, 0.98)',

    // Expressive effects: opacity, color, feedback for high-emphasis elements
    expressiveFastEffects: 'cubic-bezier(0.31, 0.94, 0.34, 1.00)',
    expressiveDefaultEffects: 'cubic-bezier(0.34, 0.80, 0.34, 1.00)',
    expressiveSlowEffects: 'cubic-bezier(0.34, 0.88, 0.34, 1.00)',

    // Standard spatial motion: routine navigation, drawer panels, list items
    standardSpatial: 'cubic-bezier(0.27, 1.06, 0.18, 1.00)',

    // Standard effects: routine hover, focus, press, state indicators
    standardFastEffects: 'cubic-bezier(0.31, 0.94, 0.34, 1.00)',
    standardDefaultEffects: 'cubic-bezier(0.34, 0.80, 0.34, 1.00)',
    standardSlowEffects: 'cubic-bezier(0.34, 0.88, 0.34, 1.00)',
  },

  // Timing durations in milliseconds
  duration: {
    expressiveFastSpatial: 350,
    expressiveDefaultSpatial: 500,
    expressiveSlowSpatial: 650,

    expressiveFastEffects: 150,
    expressiveDefaultEffects: 200,
    expressiveSlowEffects: 300,

    standardFastSpatial: 350,
    standardDefaultSpatial: 500,
    standardSlowSpatial: 750,

    standardFastEffects: 150,
    standardDefaultEffects: 200,
    standardSlowEffects: 300,
  },
} as const;

export type MotionEasing = keyof typeof motionTokens.easing;
export type MotionDuration = keyof typeof motionTokens.duration;

/**
 * Returns true if the user's OS has requested reduced motion.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
