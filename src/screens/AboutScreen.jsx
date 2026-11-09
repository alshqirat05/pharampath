'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Building2, ArrowLeft, ArrowRight } from 'lucide-react';
import { SECTORS } from '@/data/sectorsConfig';
import { useLanguage } from '@/context/LanguageProvider';

export default function AboutScreen() {
  const { t } = useTranslation('common');
  const { pick, isRTL } = useLanguage();
  const objectives = t('aboutPage.objectives', { returnObjects: true }) || [];
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-[#f6fbfa] dark:bg-[#051411] pb-20 transition-colors">
      <section className="bg-white dark:bg-[#061a16] border-b border-[#99dcd2]/70 dark:border-[#1e403a] py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-semibold text-[#004339] dark:text-[#99dcd2] bg-[#ccede8] dark:bg-[#0b1e1b] border border-[#99dcd2] dark:border-[#1e403a] px-3 py-1 rounded-full mb-2.5">
            {t('aboutPage.badge')}
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#00211c] dark:text-white max-w-3xl">
            {t('aboutPage.title')}
          </h1>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-6 rounded-2xl bg-white dark:bg-[#0b1e1b] border border-[#99dcd2] dark:border-[#1e403a] p-6 shadow-2xs flex flex-col justify-between gap-5">
            <div>
              <h2 className="font-display text-lg font-bold text-[#00211c] dark:text-white mb-2.5">
                {t('aboutPage.aimTitle')}
              </h2>
              <p className="text-sm text-[#004339]/80 dark:text-[#99dcd2]/90 leading-relaxed">
                {t('aboutPage.aimText')}
              </p>
            </div>

            <div className="rounded-xl bg-[#ccede8]/25 dark:bg-[#061a16] border border-[#99dcd2]/70 dark:border-[#1e403a] p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#00a78e] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#00211c] dark:text-white mb-1">
                  {t('aboutPage.privacyNoteTitle')}
                </h3>
                <p className="text-xs text-[#004339]/80 dark:text-[#99dcd2]/80 leading-relaxed">
                  {t('aboutPage.privacyNoteText')}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-2xl bg-white dark:bg-[#0b1e1b] border border-[#99dcd2] dark:border-[#1e403a] p-6 shadow-2xs">
            <h2 className="font-display text-lg font-bold text-[#00211c] dark:text-white mb-4">
              {t('aboutPage.objectivesTitle')}
            </h2>
            <ul className="space-y-3">
              {Array.isArray(objectives) &&
                objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#004339] dark:text-[#e8f7f4] leading-relaxed p-3 rounded-xl bg-[#ccede8]/15 dark:bg-[#061a16] border border-[#99dcd2]/60 dark:border-[#1e403a]">
                    <CheckCircle2 className="w-4 h-4 text-[#00a78e] shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <section className="space-y-4">
          <div>
            <h2 className="font-display text-lg sm:text-xl font-bold text-[#00211c] dark:text-white mb-1">
              {t('aboutPage.sectorsHeading')}
            </h2>
            <p className="text-xs sm:text-sm text-[#004339]/80 dark:text-[#99dcd2]/80">
              {t('aboutPage.sectorsSubheading')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SECTORS.map((s, idx) => (
              <motion.div
                key={s.id}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: idx * 0.5, ease: 'easeInOut' }}
              >
                <Link
                  href={`/opportunities?sector=${s.id}`}
                  className="h-full rounded-2xl bg-white dark:bg-[#0b1e1b] border border-[#99dcd2] dark:border-[#1e403a] hover:border-[#00a78e] dark:hover:border-[#00a78e] p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-8 h-8 rounded-xl bg-[#ccede8] dark:bg-[#061a16] text-[#006455] dark:text-[#99dcd2] flex items-center justify-center">
                        <Building2 className="w-4 h-4" />
                      </span>
                      <span className="font-mono text-xs font-bold text-[#008672] dark:text-[#33b9a5]">{s.index}</span>
                    </div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-[#00211c] dark:text-white mb-1.5">
                      {pick(s.label)}
                    </h3>
                    <p className="text-xs text-[#004339]/80 dark:text-[#99dcd2]/80 leading-relaxed">
                      {pick(s.oneLiner)}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#006455] dark:text-[#99dcd2]">
                    <span>{t('hero.searchBtn')}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}