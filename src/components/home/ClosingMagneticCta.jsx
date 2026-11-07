'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, MessageSquareText } from 'lucide-react';
import MagneticButton from '@/motion/MagneticButton';
import { useLanguage } from '@/context/LanguageProvider';

export default function ClosingMagneticCta() {
  const { t } = useTranslation('common');
  const { isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-18 lg:py-24 bg-[#ccede8]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border-2 border-[#99dcd2] p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-sm">
          <div className="max-w-2xl space-y-2.5">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#ccede8] border border-[#99dcd2] text-[#004339] text-xs font-bold">
              {t('closingCta.badge')}
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl leading-snug text-[#00211c]">
              {t('closingCta.title')}
            </h2>
            <p className="text-sm sm:text-base text-[#004339]/80 leading-relaxed">
              {t('closingCta.subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <MagneticButton>
              <Link
                href="/opportunities"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#00a78e] hover:bg-[#008672] text-white px-6 py-3.5 text-sm font-bold shadow-xs transition-colors"
              >
                <span>{t('closingCta.primaryBtn')}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </MagneticButton>

            <Link
              href="/assistant"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#ccede8]/50 hover:bg-[#ccede8] border border-[#99dcd2] text-[#004339] px-5 py-3.5 text-sm font-bold transition-colors"
            >
              <MessageSquareText className="w-4 h-4 text-[#00a78e]" />
              <span>{t('closingCta.secondaryBtn')}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
