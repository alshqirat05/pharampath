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
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      <section className="bg-white border-b border-zinc-200/80 py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 px-3 py-1 rounded-full mb-2.5">
            {t('referencesPage.badge')}
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-zinc-900 mb-1.5">
            {t('referencesPage.title')}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl leading-relaxed mb-4">
            {t('referencesPage.subtitle')}
          </p>

          <div className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 border border-zinc-200 px-3.5 py-2 text-xs text-zinc-700">
            <Info className="w-4 h-4 text-teal-600 shrink-0" />
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
            className="rounded-2xl bg-white border border-zinc-200/90 hover:border-teal-600/60 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200/70 text-[11px] font-semibold">
                  <BookOpenCheck className="w-3 h-3 text-teal-600" />
                  {pick(ref.category)}
                </span>
                <span className="text-[11px] font-mono text-zinc-400">{ref.organization}</span>
              </div>

              <h2 className="font-display text-base font-bold text-zinc-900 mb-1.5">
                {pick(ref.title)}
              </h2>

              <p className="text-xs text-zinc-500 leading-relaxed">
                {pick(ref.whenToUse)}
              </p>
            </div>

            <a
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 hover:bg-teal-600 text-white px-4 py-2 text-xs font-semibold transition-colors"
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
