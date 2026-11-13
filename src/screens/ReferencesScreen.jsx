'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { BookOpenCheck, ExternalLink, Info } from 'lucide-react';
import { referencesSample } from '@/data/referencesSample';
import { useLanguage } from '@/context/LanguageProvider';

export default function ReferencesScreen() {
  const { t } = useTranslation('common');
  const { pick } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f4faf8] dark:bg-[#051411] pb-20 transition-colors">
      <section className="relative overflow-hidden bg-white dark:bg-[#0b1e1b] border-b border-[#dcefea] dark:border-[#1e403a] py-8 sm:py-10">
        <div className="pointer-events-none absolute -top-24 -end-20 w-72 h-72 rounded-full bg-[#00a78e]/8 blur-3xl dark:bg-[#00a78e]/12" />
        <div className="pointer-events-none absolute -bottom-24 -start-16 w-64 h-64 rounded-full bg-[#a70019]/6 blur-3xl dark:bg-[#a70019]/10" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7a0012] dark:text-[#ff6b81] bg-[#fde8eb]/80 dark:bg-[#3d0009]/35 border border-[#f3b8c1] dark:border-[#7a0012]/50 px-3 py-1 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a70019]" />
            {t('referencesPage.badge')}
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#00211c] dark:text-white mb-1.5">
            {t('referencesPage.title')}
          </h1>
          <p className="text-xs sm:text-sm text-[#4f6f69] dark:text-[#99dcd2]/85 max-w-2xl leading-relaxed mb-4">
            {t('referencesPage.subtitle')}
          </p>

          <div className="inline-flex items-center gap-2 rounded-xl bg-[#f8fcfb] dark:bg-[#0d231f] border border-[#dcefea] dark:border-[#1e403a] px-3.5 py-2 text-xs text-[#004339] dark:text-[#ccede8]">
            <Info className="w-4 h-4 text-[#a70019] dark:text-[#ff6b81] shrink-0" />
            <span>{t('referencesPage.note')}</span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {referencesSample.map((ref, idx) => (
          <motion.article
            key={ref.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.04 }}
            className="rounded-2xl bg-white dark:bg-[#0b1e1b] border border-[#dcefea] dark:border-[#1e403a] hover:border-[#00a78e] dark:hover:border-[#00a78e] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#eef8f6] dark:bg-[#10291f] text-[#006455] dark:text-[#99dcd2] border border-[#cdebe5] dark:border-[#1e403a] text-[11px] font-semibold">
                    <BookOpenCheck className="w-3 h-3 text-[#00a78e]" />
                    {pick(ref.category)}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#fde8eb]/75 dark:bg-[#3d0009]/30 border border-[#f3b8c1]/80 dark:border-[#7a0012]/50 text-[11px] font-mono font-semibold text-[#7a0012] dark:text-[#ff6b81]">
                    {ref.organization}
                  </span>
                </div>

                <h2 className="font-display text-base font-bold text-[#00211c] dark:text-white mb-1.5">
                  {pick(ref.title)}
                </h2>

                <p className="text-xs text-[#4f6f69] dark:text-[#8fb8b0] leading-relaxed">
                  {pick(ref.whenToUse)}
                </p>
              </div>

              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00a78e] hover:bg-[#008672] text-white px-4 py-2 text-xs font-semibold transition-colors shadow-2xs"
              >
                <span>{t('referencesPage.visitSource')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
