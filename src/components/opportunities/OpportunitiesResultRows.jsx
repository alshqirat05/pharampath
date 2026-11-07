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
      <div className="rounded-2xl border border-[#99dcd2] bg-white p-10 text-center my-4">
        <span className="w-11 h-11 rounded-xl bg-[#ccede8] text-[#006455] inline-flex items-center justify-center mb-3">
          <SearchX className="w-5 h-5" />
        </span>
        <h3 className="font-display text-base sm:text-lg font-bold text-[#00211c] mb-1.5">
          {t('opportunitiesPage.emptyTitle')}
        </h3>
        <p className="text-xs sm:text-sm text-[#004339]/80 max-w-md mx-auto mb-5">
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            className="group rounded-2xl border border-[#99dcd2] bg-white hover:border-[#00a78e] p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <SectorTag sectorId={opp.sector} short />
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#ccede8] text-[#004339] text-[11px] font-bold">
                  <Users className="w-3 h-3 text-[#00a78e]" />
                  {opp.availablePositions} {t('latestOpportunities.positions')}
                </span>
              </div>

              <p className="inline-flex items-center gap-1 text-xs font-medium text-[#006455] mb-1">
                <Building2 className="w-3.5 h-3.5 text-[#00a78e] shrink-0" />
                <span className="truncate">{pick(opp.organization)}</span>
              </p>
              <h2 className="font-display text-sm sm:text-base font-bold text-[#00211c] leading-snug mb-2 group-hover:text-[#008672] transition-colors">
                {pick(opp.title)}
              </h2>

              <p className="text-xs text-[#004339]/80 leading-relaxed line-clamp-2 mb-3">
                {pick(opp.summary)}
              </p>

              <div className="space-y-1.5 rounded-xl bg-[#ccede8]/25 border border-[#99dcd2]/70 p-2.5 mb-3 text-[11px] text-[#00211c]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00a78e] shrink-0" />
                  <span className="truncate">{pick(opp.locationDetail)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#008672] shrink-0" />
                  <span className="truncate">{pick(opp.schedule)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 text-[#006455] shrink-0" />
                  <span dir="ltr">{opp.availableDates.from} → {opp.availableDates.to}</span>
                </div>
              </div>

              {Array.isArray(reqs) && reqs.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {reqs.slice(0, 2).map((req, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-[#ccede8]/60 border border-[#99dcd2]/70 px-2 py-0.5 text-[11px] text-[#004339] line-clamp-1"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2.5 border-t border-[#ccede8] flex items-center justify-between gap-2">
              <span className="text-[11px] text-[#006455] truncate max-w-[130px]">
                {pick(opp.contact.coordinator)}
              </span>

              <Link
                href={`/opportunities/${opp.id}`}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-[#004339] group-hover:bg-[#00a78e] text-white px-3.5 py-1.5 text-xs font-bold transition-colors"
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
