'use client';

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'motion/react';

/**
 * Floating visual companion + top progress bar in Ottawa Falls (#00a78e) palette
 * that travels with the user's scroll.
 */
export default function ScrollTravelCompanion() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.4,
  });

  const yPos = useTransform(smoothScroll, [0, 1], ['14vh', '78vh']);
  const rotate = useTransform(smoothScroll, [0, 0.5, 1], [0, 180, 360]);
  const scale = useTransform(smoothScroll, [0, 0.25, 0.5, 0.75, 1], [0.9, 1.15, 0.92, 1.12, 0.95]);

  if (prefersReducedMotion) return null;

  return (
    <>
      <motion.div
        style={{ scaleX: smoothScroll }}
        className="fixed top-0 inset-x-0 h-1 bg-[#00a78e] origin-left z-50 pointer-events-none"
      />

      <div className="hidden xl:block fixed start-5 top-0 z-30 pointer-events-none">
        <motion.div
          style={{ y: yPos, scale }}
          className="flex flex-col items-center gap-2"
        >
          <motion.div
            style={{ rotate }}
            className="w-11 h-11 rounded-2xl bg-white/90 dark:bg-[#0b1e1b]/90 backdrop-blur-md border border-[#66cabb] dark:border-[#1e403a] shadow-lg shadow-[#004339]/10 flex items-center justify-center"
          >
            <div className="w-4 h-4 rounded-full border-2 border-[#00a78e] bg-[#ccede8] dark:bg-[#004339]" />
          </motion.div>
          <div className="w-0.5 h-16 rounded-full bg-gradient-to-b from-[#00a78e]/50 to-transparent" />
        </motion.div>
      </div>
    </>
  );
}
