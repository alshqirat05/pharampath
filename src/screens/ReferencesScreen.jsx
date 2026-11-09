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
    <div className="min-h-screen bg-[#f6fbfa] dark:bg-[#051411] pb-20 transition-colors">
      <section className="bg-white dark:bg-[#061a16] border-b border-[#99dcd2]/70 dark:border-[#1e403a] py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-semibold text-[#004339] dark:text-[#99dcd2] bg-[#ccede8] dark:bg-[#0b1e1b] border border-[#99dcd2] dark:border-[#1e403a] px-3 py-1 rounded-full mb-2.5">
            {t('referencesPage.badge')}
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#00211c] dark:text-white mb-1.5">
            {t('referencesPage.title')}
          </h1>
          <p className="text-xs sm:text-sm text-[#004339]/80 dark:text-[#99dcd2]/80 max-w-2xl leading-relaxed mb-4">
            {t('referencesPage.subtitle')}
          </p>

          <div className="inline-flex items-center gap-2 rounded-xl bg-[#ccede8]/25 dark:bg-[#061a16] border border-[#99dcd2]/70 dark:border-[#1e403a] px-3.5 py-2 text-xs text-[#004339] dark:text-[#ccede8]">
            <Info className="w-4 h-4 text-[#00a78e] shrink-0" />
            <span>{t('referencesPage.note')}</span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {referencesSample.map((ref, idx) => (
          <motion.article
            key={ref.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.04 }}
            className="rounded-2xl bg-white dark:bg-[#0b1e1b] border border-[#99dcd2] dark:border-[#1e403a] hover:border-[#00a78e] dark:hover:border-[#00a78e] p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#ccede8] dark:bg-[#061a16] text-[#004339] dark:text-[#99dcd2] border border-[#99dcd2] dark:border-[#1e403a] text-[11px] font-semibold">
                  <BookOpenCheck className="w-3 h-3 text-[#00a78e]" />
                  {pick(ref.category)}
                </span>
                <span className="text-[11px] font-mono text-[#006455] dark:text-[#99dcd2]">{ref.organization}</span>
              </div>

              <h2 className="font-display text-base font-bold text-[#00211c] dark:text-white mb-1.5">
                {pick(ref.title)}
              </h2>

              <p className="text-xs text-[#004339]/80 dark:text-[#99dcd2]/80 leading-relaxed">
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
          </motion.article>
        ))}
      </div>
    </div>
  );
}