'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { MessageSquareText } from 'lucide-react';

export default function AssistantFloatingLauncher() {
  const pathname = usePathname();
  const { t } = useTranslation('common');

  if (pathname?.startsWith('/assistant')) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 end-6 z-40"
    >
      <Link
        href="/assistant"
        aria-label={t('nav.assistant')}
        className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#00a78e] text-white border border-[#33b9a5] shadow-lg shadow-[#004339]/25 hover:bg-[#008672] hover:scale-105 transition-all text-xs sm:text-sm font-semibold"
      >
        <span className="w-2 h-2 rounded-full bg-[#ccede8] animate-pulse" />
        <MessageSquareText className="w-4 h-4 shrink-0 text-white" />
        <span>{t('nav.assistant')}</span>
      </Link>
    </motion.div>
  );
}
