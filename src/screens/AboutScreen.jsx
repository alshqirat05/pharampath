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
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      <section className="bg-white border-b border-zinc-200/80 py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 px-3 py-1 rounded-full mb-2.5">
            {t('aboutPage.badge')}
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-zinc-900 max-w-3xl">
            {t('aboutPage.title')}
          </h1>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-6 rounded-2xl bg-white border border-zinc-200 p-6 shadow-2xs flex flex-col justify-between gap-5">
            <div>
              <h2 className="font-display text-lg font-bold text-zinc-900 mb-2.5">
                {t('aboutPage.aimTitle')}
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {t('aboutPage.aimText')}
              </p>
            </div>

            <div className="rounded-xl bg-teal-50/70 border border-teal-200/80 p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-zinc-900 mb-1">
                  {t('aboutPage.privacyNoteTitle')}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {t('aboutPage.privacyNoteText')}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-2xl bg-white border border-zinc-200 p-6 shadow-2xs">
            <h2 className="font-display text-lg font-bold text-zinc-900 mb-4">
              {t('aboutPage.objectivesTitle')}
            </h2>
            <ul className="space-y-3">
              {Array.isArray(objectives) &&
                objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 leading-relaxed p-3 rounded-xl bg-zinc-50 border border-zinc-200/70">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <section className="space-y-4">
          <div>
            <h2 className="font-display text-lg sm:text-xl font-bold text-zinc-900 mb-1">
              {t('aboutPage.sectorsHeading')}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500">
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
                  className="h-full rounded-2xl bg-white border border-zinc-200 hover:border-teal-600/60 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                        <Building2 className="w-4 h-4" />
                      </span>
                      <span className="font-mono text-xs font-bold text-zinc-300">{s.index}</span>
                    </div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-zinc-900 mb-1.5">
                      {pick(s.label)}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {pick(s.oneLiner)}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700">
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
