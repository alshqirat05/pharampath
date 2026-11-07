'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';

/**
 * Scroll-linked Zoom-In / Zoom-Out & Parallax container.
 * As the user scrolls down, the element smoothly scales up (zoom in) into focus,
 * moves with the scroll (y parallax), and gently scales down (zoom out) when leaving.
 */
export default function ScrollZoomSection({
  children,
  className = '',
  zoomRange = [0.88, 1, 1, 0.92],
  yRange = [50, 0, 0, -40],
  opacityRange = [0.25, 1, 1, 0.35],
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  const scale = useTransform(smoothProgress, [0, 0.28, 0.72, 1], zoomRange);
  const y = useTransform(smoothProgress, [0, 0.28, 0.72, 1], yRange);
  const opacity = useTransform(smoothProgress, [0, 0.22, 0.78, 1], opacityRange);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ scale, y, opacity }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

