'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Users, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, Building2 } from 'lucide-react';
import { opportunitiesSample } from '@/data/opportunitiesSample';
import SectorTag from '@/components/ui/SectorTag';
import { useLanguage } from '@/context/LanguageProvider';

const CARDS_PER_VIEW = 3;

export default function LatestOpportunitiesList() {
  const { t } = useTranslation('common');
  const { pick, isRTL } = useLanguage();
  const [startIndex, setStartIndex] = useState(0);

  const total = opportunitiesSample.length;
  const maxStart = Math.max(0, total - CARDS_PER_VIEW);
  const handleNext = () => setStartIndex((prev) => (prev >= maxStart ? 0 : prev + 1));
  const handlePrev = () => setStartIndex((prev) => (prev <= 0 ? maxStart : prev - 1));

  const visibleItems = opportunitiesSample.slice(startIndex, startIndex + CARDS_PER_VIEW);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <section className="py-18 lg:py-24 bg-[#ccede8]/25 dark:bg-[#061a16] border-b border-[#99dcd2]/80 dark:border-[#1e403a] overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold text-[#004339] dark:text-[#99dcd2] bg-[#ccede8] dark:bg-[#0b1e1b] border border-[#99dcd2] dark:border-[#1e403a] px-3.5 py-1 rounded-full mb-2.5">
              {t('latestOpportunities.badge')}
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#00211c] dark:text-white mb-1.5">
              {t('latestOpportunities.title')}
            </h2>
            <p className="text-sm text-[#004339]/80 dark:text-[#99dcd2]/80 leading-relaxed">
              {t('latestOpportunities.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={handlePrev}
              aria-label={t('latestOpportunities.prevSlide')}
              className="w-10 h-10 rounded-xl border border-[#99dcd2] dark:border-[#1e403a] bg-white dark:bg-[#0b1e1b] hover:bg-[#00a78e] hover:text-white hover:border-[#00a78e] dark:hover:bg-[#00a78e] text-[#004339] dark:text-[#ccede8] flex items-center justify-center transition-colors cursor-pointer"
            >
              <PrevIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={t('latestOpportunities.nextSlide')}
              className="w-10 h-10 rounded-xl border border-[#99dcd2] dark:border-[#1e403a] bg-white dark:bg-[#0b1e1b] hover:bg-[#00a78e] hover:text-white hover:border-[#00a78e] dark:hover:bg-[#00a78e] text-[#004339] dark:text-[#ccede8] flex items-center justify-center transition-colors cursor-pointer"
            >
              <NextIcon className="w-4 h-4" />
            </button>

            <Link
              href="/opportunities"
              className="ms-2 inline-flex items-center gap-2 rounded-xl bg-[#00a78e] hover:bg-[#008672] text-white px-4 py-2.5 text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              <span>{t('latestOpportunities.viewAll')}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Sleek Horizontal Carousel with Compact Ottawa Falls Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={startIndex}
            initial={{ opacity: 0, x: isRTL ? -28 : 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? 28 : -28 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {visibleItems.map((opp) => {
              const reqList = pick(opp.requirements) || [];

              return (
                <article
                  key={opp.id}
                  className="group rounded-2xl bg-white dark:bg-[#0b1e1b] border border-[#99dcd2] dark:border-[#1e403a] p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden min-w-0"
                >
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <SectorTag sectorId={opp.sector} short />
                      <span className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-[#006455] dark:text-[#99dcd2] bg-[#ccede8]/80 dark:bg-[#061a16] px-2.5 py-0.5 rounded-md">
                        <Users className="w-3.5 h-3.5 text-[#00a78e]" />
                        {opp.availablePositions} {t('latestOpportunities.positions')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#006455] dark:text-[#99dcd2] mb-1 min-w-0">
                      <Building2 className="w-3.5 h-3.5 text-[#00a78e] shrink-0" />
                      <span className="truncate block min-w-0">{pick(opp.organization)}</span>
                    </div>
                    <h3 className="font-display font-bold text-base text-[#00211c] dark:text-white leading-snug mb-3 line-clamp-2">
                      {pick(opp.title)}
                    </h3>

                    <div className="flex flex-col gap-1.5 text-xs text-[#004339] dark:text-[#ccede8] border-y border-[#ccede8] dark:border-[#1e403a] py-3 mb-3 min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <MapPin className="w-3.5 h-3.5 text-[#00a78e] shrink-0" />
                        <span className="truncate block min-w-0">{pick(opp.locationDetail)}</span>
                      </div>
                      <div className="flex items-center gap-2 min-w-0">
                        <Clock className="w-3.5 h-3.5 text-[#008672] shrink-0" />
                        <span className="truncate block min-w-0">{pick(opp.schedule)}</span>
                      </div>
                    </div>

                    {Array.isArray(reqList) && reqList.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {reqList.slice(0, 2).map((req, i) => (
                          <span
                            key={i}
                            className="rounded-lg bg-zinc-100 dark:bg-[#061a16] border border-zinc-200/90 dark:border-[#1e403a] px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:text-[#ccede8] truncate max-w-full"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 min-w-0">
                    <span className="text-[11px] text-[#006455] dark:text-[#99dcd2] truncate block min-w-0 flex-1 me-2">
                      {pick(opp.contact.coordinator)}
                    </span>
                    <Link
                      href={`/opportunities/${opp.id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#00a78e] hover:bg-[#008672] text-white px-3.5 py-2 text-xs font-bold transition-colors"
                    >
                      <span>{t('latestOpportunities.openDetails')}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-2 mt-7">
          {Array.from({ length: maxStart + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setStartIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === startIndex ? 'w-7 bg-[#00a78e]' : 'w-2 bg-[#99dcd2] dark:bg-[#1e403a]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
