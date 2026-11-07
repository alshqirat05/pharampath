'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'motion/react';
import { useReducedMotionSafe } from './useReducedMotionSafe';

/**
 * Interactive 3D perspective card with spring-damped rotateX/rotateY,
 * preserve-3d depth layers, and a real-time cursor spotlight sheen.
 */
export default function Tilt3DCard({
  children,
  className = '',
  intensity = 10,
  glareColor = 'rgba(14, 165, 233, 0.14)',
}) {
  const ref = useRef(null);
  const reduced = useReducedMotionSafe();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 260, damping: 22, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(smoothX, [0, 1], [-intensity, intensity]);

  const glareX = useTransform(smoothX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(smoothY, [0, 1], ['0%', '100%']);
  const glareBackground = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, ${glareColor}, transparent 75%)`;

  const handlePointerMove = (e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;
    mouseX.set(Math.max(0, Math.min(1, xPct)));
    mouseY.set(Math.max(0, Math.min(1, yPct)));
  };

  const handlePointerLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div style={{ perspective: '1200px' }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={
          reduced
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
        }
        whileHover={reduced ? undefined : { scale: 1.015, y: -6 }}
        transition={{ duration: 0.25 }}
        className={`relative h-full will-change-transform ${className}`}
      >
        {!reduced && (
          <motion.div
            aria-hidden="true"
            style={{ background: glareBackground }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}
        {children}
      </motion.div>
    </div>
  );
}

