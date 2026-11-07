'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotionSafe } from './useReducedMotionSafe';

export default function SmoothScrollProvider({ children }) {
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    if (reduced || typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      prevent: (node) => Boolean(node?.closest?.('[data-lenis-prevent]')),
    });

    let rafId = 0;
    const onFrame = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(onFrame);
    };
    rafId = window.requestAnimationFrame(onFrame);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reduced]);

  return children;
}
