'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import {
  MapPin,
  Clock,
  CalendarDays,
  Users,
  ArrowLeft,
  ArrowRight,
  SearchX,
  Building2,
} from 'lucide-react';
import SectorTag from '@/components/ui/SectorTag';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageProvider';

export default function OpportunitiesResultRows({ opportunities, onReset }) {
  const { t } = useTranslation('common');
  const { pick, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  if (opportunities.length === 0) {
    return (
      <div className="rounded-2xl border border-[#99dcd2] dark:border-[#1e403a] bg-white dark:bg-[#0b1e1b] p-10 text-center my-4">
        <span className="w-11 h-11 rounded-xl bg-[#ccede8] dark:bg-[#061a16] text-[#006455] dark:text-[#99dcd2] inline-flex items-center justify-center mb-3">
          <SearchX className="w-5 h-5" />
        </span>
        <h3 className="font-display text-base sm:text-lg font-bold text-[#00211c] dark:text-white mb-1.5">
          {t('opportunitiesPage.emptyTitle')}
        </h3>
        <p className="text-xs sm:text-sm text-[#004339]/80 dark:text-[#99dcd2]/80 max-w-md mx-auto mb-5">
          {t('opportunitiesPage.emptySubtitle')}
        </p>
        <Button onClick={onReset} variant="primary">
          {t('opportunitiesPage.resetFilters')}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {opportunities.map((opp, index) => {
        const reqs = pick(opp.requirements) || [];

        return (
          <motion.article
            key={opp.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            className="group rounded-2xl border border-[#99dcd2] dark:border-[#1e403a] bg-white dark:bg-[#0b1e1b] p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden min-w-0"
          >
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <SectorTag sectorId={opp.sector} short />
                <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fce7f3] dark:bg-[#831843]/30 text-[#9c1c47] dark:text-[#f472b6] border border-[#fbcfe8] dark:border-[#9d174d] text-[11px] font-bold">
                  <Users className="w-3 h-3 text-[#d6336c]" />
                  {opp.availablePositions} {t('latestOpportunities.positions')}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-medium text-[#006455] dark:text-[#99dcd2] mb-1 min-w-0">
                <Building2 className="w-3.5 h-3.5 text-[#00a78e] shrink-0" />
                <span className="truncate block min-w-0">{pick(opp.organization)}</span>
              </div>
              <h2 className="font-display text-sm sm:text-base font-bold text-[#00211c] dark:text-white leading-snug mb-2 line-clamp-2">
                {pick(opp.title)}
              </h2>

              <p className="text-xs text-[#004339]/80 dark:text-[#99dcd2]/80 leading-relaxed line-clamp-2 mb-3">
                {pick(opp.summary)}
              </p>

              <div className="space-y-1.5 rounded-xl bg-[#ccede8]/20 dark:bg-[#061a16] border border-[#99dcd2]/70 dark:border-[#1e403a] p-2.5 mb-3 text-[11px] text-[#00211c] dark:text-[#e8f7f4] min-w-0">
                <div className="flex items-center gap-1.5 min-w-0">
                  <MapPin className="w-3.5 h-3.5 text-[#00a78e] shrink-0" />
                  <span className="truncate block min-w-0">{pick(opp.locationDetail)}</span>
                </div>
                <div className="flex items-center gap-1.5 min-w-0">
                  <Clock className="w-3.5 h-3.5 text-[#008672] shrink-0" />
                  <span className="truncate block min-w-0">{pick(opp.schedule)}</span>
                </div>
                <div className="flex items-center gap-1.5 min-w-0">
                  <CalendarDays className="w-3.5 h-3.5 text-[#006455] dark:text-[#33b9a5] shrink-0" />
                  <span dir="ltr" className="truncate block min-w-0">{opp.availableDates.from} → {opp.availableDates.to}</span>
                </div>
              </div>

              {Array.isArray(reqs) && reqs.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {reqs.slice(0, 2).map((req, i) => (
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

            <div className="pt-2.5 border-t border-[#ccede8] dark:border-[#1e403a] flex items-center justify-between gap-2 min-w-0">
              <span className="text-[11px] text-[#006455] dark:text-[#99dcd2] truncate block min-w-0 flex-1 me-2">
                {pick(opp.contact.coordinator)}
              </span>

              <Link
                href={`/opportunities/${opp.id}`}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-[#00a78e] hover:bg-[#008672] text-white px-3.5 py-1.5 text-xs font-bold transition-colors shadow-2xs"
              >
                <span>{t('latestOpportunities.openDetails')}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
