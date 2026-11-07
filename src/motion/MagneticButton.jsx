'use client';

import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useReducedMotionSafe } from '@/motion/useReducedMotionSafe';

/**
 * Cursor-magnetic wrapper for primary editorial CTAs.
 * Respects prefers-reduced-motion and only animates transform.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.28,
  ...rest
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotionSafe();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const resetOffset = () => setOffset({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetOffset}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.4 }}
      className={`inline-block ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
