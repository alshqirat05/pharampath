'use client';

import React from 'react';
import { motion } from 'motion/react';
import { wordRevealContainerPreset, wordRevealItemPreset } from './motionPresets';
import { useReducedMotionSafe } from './useReducedMotionSafe';

/**
 * Word-by-word kinetic headline reveal.
 * Splits text by whitespace and reveals each word using transform + opacity only.
 */
export default function KineticWordsHeadline({
  text,
  as: Tag = 'h1',
  className = '',
  highlightWord = '',
  highlightClassName = 'text-signal',
}) {
  const reduced = useReducedMotionSafe();
  const words = String(text || '').trim().split(/\s+/);
  const containerVariants = wordRevealContainerPreset(reduced ? 0.015 : 0.05);
  const itemVariants = wordRevealItemPreset(reduced);

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="inline"
      >
        {words.map((word, index) => {
          const isHighlighted =
            highlightWord &&
            word.replace(/[.,،!؟]/g, '') === highlightWord.replace(/[.,،!؟]/g, '');

          return (
            <span
              key={`${word}-${index}`}
              className="inline-block overflow-hidden align-bottom pb-[0.08em] me-[0.26em] last:me-0"
            >
              <motion.span
                variants={itemVariants}
                className={`inline-block will-change-transform ${isHighlighted ? highlightClassName : ''}`}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}

