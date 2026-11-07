/**
 * Shared motion presets for the application.
 * Rules:
 *   1. Animate transform and opacity only.
 *   2. Directional presets accept `isRtl` and flip sign in RTL.
 *   3. Reduced-motion callers receive simple opacity fades with zero translation.
 */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT_CUBIC = [0.65, 0, 0.35, 1];

export function fadeRisePreset(reduced = false, distance = 24, duration = 0.65) {
  if (reduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.25 },
    };
  }
  return {
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -distance * 0.5 },
    transition: { duration, ease: EASE_OUT_EXPO },
  };
}

export function directionalSlidePreset(isRtl = true, reduced = false, distance = 32) {
  if (reduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.2 },
    };
  }
  const signedX = isRtl ? -distance : distance;
  return {
    initial: { opacity: 0, x: signedX },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  };
}

export function wordRevealContainerPreset(stagger = 0.045, delayChildren = 0.04) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };
}

export function wordRevealItemPreset(reduced = false) {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
    };
  }
  return {
    hidden: { opacity: 0, y: '105%' },
    visible: {
      opacity: 1,
      y: '0%',
      transition: { duration: 0.65, ease: EASE_OUT_EXPO },
    },
  };
}

export function rowExpandPreset(reduced = false) {
  return {
    initial: { opacity: 0, scaleY: reduced ? 1 : 0.94 },
    animate: {
      opacity: 1,
      scaleY: 1,
      transition: { duration: reduced ? 0.15 : 0.32, ease: EASE_OUT_EXPO },
    },
    exit: {
      opacity: 0,
      scaleY: reduced ? 1 : 0.96,
      transition: { duration: 0.18 },
    },
  };
}

