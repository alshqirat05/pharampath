'use client';

import { motion } from 'motion/react';

/**
 * Autonomous floating 3D pharmaceutical & geometric shapes behind the Hero box
 * Styled in Ottawa Falls (#00a78e) with subtle Nahdi rose (#d6336c / #f783ac) accents.
 */
export default function HeroFloatingBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-0 overflow-hidden z-0"
    >
      {/* Soft Ottawa Falls + Subtle Nahdi Rose Ambient Glow Orbs Behind the Box */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], x: [-20, 20, -20], y: [-15, 15, -15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 start-8 w-80 h-80 rounded-full bg-[#99dcd2]/55 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.05, 0.9, 1.05], x: [15, -15, 15] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 end-1/4 w-64 h-64 rounded-full bg-[#fbcfe8]/45 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.1, 0.92, 1.1], x: [20, -20, 20], y: [15, -15, 15] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-24 end-8 w-96 h-96 rounded-full bg-[#66cabb]/45 blur-3xl"
      />

      {/* Large Rotating Orbital Ring Behind Top-Start Corner of Hero Box */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        className="absolute top-4 start-4 sm:start-10 w-52 h-52 sm:w-68 sm:h-68 rounded-full border-2 border-dashed border-[#33b9a5]/45"
      >
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#00a78e] shadow-md" />
        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#d6336c]" />
      </motion.div>

      {/* Large Rotating Orbital Ring Behind Bottom-End Corner of Hero Box */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-4 end-4 sm:end-10 w-56 h-56 sm:w-72 sm:h-72 rounded-full border-2 border-[#66cabb]/50"
      >
        <span className="absolute top-1/2 -start-2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#d6336c]" />
      </motion.div>

      {/* Floating 3D Pharmaceutical Capsule 1 (Top-Start — Ottawa Falls) */}
      <motion.div
        animate={{ y: [-18, 18, -18], rotateZ: [-28, -12, -28], scale: [1, 1.06, 1] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 start-6 sm:start-16 lg:start-24 w-24 h-10 rounded-full p-0.5 bg-gradient-to-r from-[#00a78e] via-[#33b9a5] to-white border-2 border-white shadow-[0_14px_28px_rgba(0,100,85,0.22)] flex overflow-hidden"
      >
        <span className="w-1/2 h-full rounded-s-full bg-[#00a78e]" />
        <span className="w-1/2 h-full rounded-e-full bg-[#ccede8]" />
      </motion.div>

      {/* Floating 3D Pharmaceutical Capsule 2 (Bottom-Start — Subtle Nahdi Touch) */}
      <motion.div
        animate={{ y: [16, -20, 16], rotateZ: [22, 38, 22] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-14 start-8 sm:start-20 lg:start-28 w-20 h-8 rounded-full border-2 border-white shadow-[0_12px_24px_rgba(214,51,108,0.2)] flex overflow-hidden"
      >
        <span className="w-1/2 h-full bg-[#d6336c]" />
        <span className="w-1/2 h-full bg-[#fce7f3]" />
      </motion.div>

      {/* Floating 3D Pharmaceutical Capsule 3 (Top-End — Ottawa + Nahdi) */}
      <motion.div
        animate={{ y: [14, -18, 14], rotateZ: [18, 4, 18], scale: [0.96, 1.05, 0.96] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-16 end-6 sm:end-16 lg:end-24 w-22 h-9 rounded-full border-2 border-white shadow-[0_14px_28px_rgba(0,134,114,0.22)] flex overflow-hidden"
      >
        <span className="w-1/2 h-full bg-[#008672]" />
        <span className="w-1/2 h-full bg-white" />
      </motion.div>

      {/* Floating 3D Sphere / Bubble (Mid-End — Subtle Nahdi Rose Tint) */}
      <motion.div
        animate={{ y: [-22, 22, -22], x: [-8, 8, -8] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 end-4 sm:end-12 lg:end-20 w-15 h-15 rounded-full bg-gradient-to-br from-white via-[#fbcfe8] to-[#e64980] border-2 border-white shadow-[0_14px_28px_rgba(214,51,108,0.22)]"
      />

      {/* Floating 3D Medical Cross / Plus Shape (Mid-Start) */}
      <motion.div
        animate={{ y: [-14, 16, -14], rotateZ: [0, 90, 180] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 start-4 sm:start-12 lg:start-18 w-14 h-14 rounded-2xl bg-white/90 border-2 border-[#66cabb] shadow-lg flex items-center justify-center"
      >
        <span className="absolute w-7 h-2 rounded-full bg-[#00a78e]" />
        <span className="absolute w-2 h-7 rounded-full bg-[#00a78e]" />
      </motion.div>

      {/* Floating Geometric Tile (Bottom-End) */}
      <motion.div
        animate={{ y: [-16, 14, -16], rotateZ: [45, 75, 45] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-16 end-10 sm:end-22 lg:end-32 w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#006455] to-[#33b9a5] border-2 border-white shadow-xl"
      />
    </div>
  );
}
