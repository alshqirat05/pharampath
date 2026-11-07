'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { BookOpen, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
import AssistantChatPanel from '@/components/assistant/AssistantChatPanel';
import { referencesSample } from '@/data/referencesSample';
import { useLanguage } from '@/context/LanguageProvider';

export default function AssistantScreen() {
  const { t } = useTranslation('common');
  const { pick, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      <section className="bg-white border-b border-zinc-200/80 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 px-3 py-1 rounded-full mb-2.5">
            {t('assistantPage.badge')}
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-zinc-900 mb-1.5">
            {t('assistantPage.title')}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl leading-relaxed">
            {t('assistantPage.subtitle')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <div className="lg:col-span-8">
          <AssistantChatPanel />
        </div>

        <aside className="lg:col-span-4 rounded-2xl bg-white border border-zinc-200 p-5 shadow-2xs space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 border border-teal-200/70 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </span>
              <h2 className="font-display text-base font-bold text-zinc-900">
                {t('assistantPage.referencesBoxTitle')}
              </h2>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {t('assistantPage.referencesBoxDesc')}
            </p>
          </div>

          <ul className="space-y-2.5 pt-3 border-t border-zinc-100">
            {referencesSample.slice(0, 5).map((ref) => (
              <li key={ref.id} className="rounded-xl bg-zinc-50 border border-zinc-200/70 p-3 hover:border-teal-600/50 transition-colors">
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-2 text-xs font-bold text-zinc-900 hover:text-teal-700 transition-colors"
                >
                  <span>{pick(ref.title)}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                </a>
                <span className="text-[11px] text-zinc-400 block mt-0.5">{ref.organization}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/references"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 hover:bg-teal-600 text-white px-4 py-2.5 text-xs font-semibold transition-colors"
          >
            <span>{t('assistantDemo.referencesCta')}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </aside>
      </div>
    </div>
  );
}
