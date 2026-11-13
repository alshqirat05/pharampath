'use client';

import { motion } from 'motion/react';

/**
 * Autonomous 3D Animated Pharmacist/Assistant Robot Avatar in Ottawa Falls (#00a78e) palette.
 */
export default function Robot3DAvatar({ isTyping = false }) {
  return (
    <div className="relative w-full h-64 sm:h-72 flex items-center justify-center perspective-1200 select-none">
      {/* Ambient 3D Floor Shadow */}
      <motion.div
        animate={{ scale: [0.85, 1.08, 0.85], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-4 w-32 h-5 rounded-full bg-[#004339]/25 blur-md"
      />

      {/* Outer Autonomous 3D Orbiting Ring */}
      <motion.div
        animate={{ rotateZ: 360, rotateX: [62, 68, 62] }}
        transition={{
          rotateZ: { duration: 14, repeat: Infinity, ease: 'linear' },
          rotateX: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute w-56 h-56 rounded-full border-2 border-dashed border-[#00a78e]/45 pointer-events-none"
      />

      {/* Inner Autonomous 3D Orbiting Ring */}
      <motion.div
        animate={{ rotateZ: -360, rotateY: [25, -25, 25] }}
        transition={{
          rotateZ: { duration: 10, repeat: Infinity, ease: 'linear' },
          rotateY: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute w-44 h-44 rounded-full border border-[#a70019]/40 pointer-events-none"
      />

      {/* Main 3D Floating Robot Assembly */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotateY: [-14, 14, -14],
          rotateX: [4, -4, 4],
        }}
        transition={{
          y: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
          rotateY: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="relative preserve-3d flex flex-col items-center"
      >
        {/* Antenna + Glowing Signal Orb */}
        <div className="flex flex-col items-center -mb-1 translate-z-20">
          <motion.div
            animate={{
              scale: isTyping ? [1, 1.35, 1] : [1, 1.15, 1],
              boxShadow: isTyping
                ? [
                    '0 0 8px rgba(167,0,25,0.6)',
                    '0 0 22px rgba(167,0,25,0.95)',
                    '0 0 8px rgba(167,0,25,0.6)',
                  ]
                : '0 0 12px rgba(167,0,25,0.5)',
            }}
            transition={{ duration: isTyping ? 0.7 : 2, repeat: Infinity }}
            className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#a70019] to-[#e36478] border-2 border-white"
          />
          <div className="w-1.5 h-4 bg-gradient-to-b from-[#a70019] to-[#66cabb] rounded-full" />
        </div>

        {/* 3D Robot Head Slab */}
        <motion.div
          animate={{ rotateZ: [-2.5, 2.5, -2.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-28 h-22 rounded-[26px] bg-gradient-to-b from-white via-[#ccede8]/40 to-[#99dcd2]/70 border-2 border-white shadow-[0_14px_28px_-6px_rgba(0,67,57,0.22),inset_0_-6px_12px_rgba(0,100,85,0.08)] flex items-center justify-center p-2.5 translate-z-20"
        >
          {/* Side Ear Modules */}
          <div className="absolute -left-2.5 w-2.5 h-8 rounded-l-lg bg-gradient-to-b from-[#00a78e] to-[#006455] shadow-sm" />
          <div className="absolute -right-2.5 w-2.5 h-8 rounded-r-lg bg-gradient-to-b from-[#00a78e] to-[#006455] shadow-sm" />

          {/* Dark Ottawa Falls Visor Screen */}
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#00211c] via-[#004339] to-[#006455] border border-[#33b9a5]/50 shadow-inner flex flex-col items-center justify-center gap-2 relative overflow-hidden">
            <div className="absolute -top-3 -left-3 w-14 h-6 bg-white/15 rotate-12 rounded-full blur-[1px]" />

            {/* Blinking 3D Eyes */}
            <div className="flex items-center gap-5">
              <motion.span
                animate={{ scaleY: [1, 1, 0.12, 1, 1] }}
                transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.46, 0.5, 0.54, 1] }}
                className="w-3.5 h-3.5 rounded-full bg-[#66cabb] shadow-[0_0_12px_#33b9a5]"
              />
              <motion.span
                animate={{ scaleY: [1, 1, 0.12, 1, 1] }}
                transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.46, 0.5, 0.54, 1] }}
                className="w-3.5 h-3.5 rounded-full bg-[#66cabb] shadow-[0_0_12px_#33b9a5]"
              />
            </div>

            {/* Animated Speaking Waveform Mouth */}
            <div className="flex items-center gap-1 h-2">
              {[0, 1, 2, 3, 4].map((bar) => (
                <motion.span
                  key={bar}
                  animate={{
                    height: isTyping ? [3, 9, 4, 8, 3] : [3, 4, 3],
                  }}
                  transition={{
                    duration: 0.55,
                    repeat: Infinity,
                    delay: bar * 0.08,
                  }}
                  className="w-1 rounded-full bg-[#ff6b81]"
                />
              ))}
            </div>
          </div>
        </motion.div>

        <div className="w-8 h-2.5 bg-[#99dcd2] rounded-b-lg border-x border-[#66cabb] -my-0.5" />

        {/* 3D Robot Torso */}
        <div className="relative w-32 h-24 rounded-[28px] bg-gradient-to-b from-white via-[#ccede8]/40 to-[#99dcd2]/70 border-2 border-white shadow-[0_18px_32px_-8px_rgba(0,67,57,0.22),inset_0_-8px_14px_rgba(0,100,85,0.08)] flex items-center justify-center translate-z-10">
          <motion.div
            animate={{ rotateZ: isTyping ? [8, 22, 8] : [6, 14, 6], y: [-2, 3, -2] }}
            transition={{ duration: isTyping ? 0.8 : 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-5 top-3 w-4 h-14 rounded-full bg-gradient-to-b from-white to-[#99dcd2] border border-[#66cabb] shadow-md origin-top"
          />
          <motion.div
            animate={{ rotateZ: isTyping ? [-8, -22, -8] : [-6, -14, -6], y: [3, -2, 3] }}
            transition={{ duration: isTyping ? 0.8 : 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-5 top-3 w-4 h-14 rounded-full bg-gradient-to-b from-white to-[#99dcd2] border border-[#66cabb] shadow-md origin-top"
          />

          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-12 h-12 rounded-2xl bg-[#fde8eb] border border-[#f3b8c1] flex items-center justify-center shadow-inner"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <span className="absolute w-5 h-1.5 rounded-full bg-[#a70019]" />
              <span className="absolute w-1.5 h-5 rounded-full bg-[#a70019]" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
