'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

const subscribe = () => () => {};

export default function ThemeToggle({ className = '' }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useTranslation('common');
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl border border-[#99dcd2] dark:border-[#1e403a] bg-white dark:bg-[#0b1e1b] ${className}`} />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={t('themeToggle')}
      title={t('themeToggle')}
      className={`relative w-9 h-9 rounded-xl border border-[#99dcd2] dark:border-[#1e403a] bg-white dark:bg-[#0b1e1b] text-[#006455] dark:text-[#99dcd2] hover:bg-[#ccede8]/40 dark:hover:bg-[#132b26] flex items-center justify-center transition-colors cursor-pointer shadow-2xs ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center text-amber-300"
          >
            <Sun className="w-4 h-4" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center text-[#006455]"
          >
            <Moon className="w-4 h-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
