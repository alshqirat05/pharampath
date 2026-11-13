'use client';

import { Suspense, useMemo } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { opportunitiesSample } from '@/data/opportunitiesSample';
import { useCustomOpportunities } from '@/data/pharmacyDashboardData';
import OpportunitiesFilterBar from '@/components/opportunities/OpportunitiesFilterBar';
import OpportunitiesResultRows from '@/components/opportunities/OpportunitiesResultRows';
import lookingIllustration from '@/imgs/undraw_looking_for_answers.svg';
import { useLanguage } from '@/context/LanguageProvider';

function OpportunitiesDirectoryContent() {
  const { t } = useTranslation('common');
  const { pick } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo(
    () => ({
      q: searchParams.get('q') || '',
      sector: searchParams.get('sector') || '',
      city: searchParams.get('city') || '',
      workingHours: searchParams.get('workingHours') || '',
      interest: searchParams.get('interest') || '',
      dateFrom: searchParams.get('dateFrom') || '',
      dateTo: searchParams.get('dateTo') || '',
    }),
    [searchParams]
  );

  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const resetFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  const customOpportunities = useCustomOpportunities();

  const filteredOpportunities = useMemo(() => {
    const query = filters.q.trim().toLowerCase();
    const allOpportunities = [...customOpportunities, ...opportunitiesSample];
    return allOpportunities.filter((opp) => {
      if (filters.sector && opp.sector !== filters.sector) return false;
      if (filters.city && opp.city !== filters.city) return false;
      if (filters.workingHours && opp.workingHours !== filters.workingHours) return false;
      if (filters.interest && opp.interest !== filters.interest) return false;
      if (filters.dateFrom && opp.availableDates.to < filters.dateFrom) return false;
      if (filters.dateTo && opp.availableDates.from > filters.dateTo) return false;
      if (query) {
        const title = (pick(opp.title) || '').toLowerCase();
        const org = (pick(opp.organization) || '').toLowerCase();
        const city = (pick(opp.city) || '').toLowerCase();
        const summary = (pick(opp.summary) || '').toLowerCase();
        if (!title.includes(query) && !org.includes(query) && !city.includes(query) && !summary.includes(query)) {
          return false;
        }
      }
      return true;
    });
  }, [filters, pick, customOpportunities]);

  return (
    <div className="min-h-screen bg-[#f6fbfa] dark:bg-[#051411] pb-18 transition-colors">
      {/* Mobile-Perfect Responsive Hero Header */}
      <section className="bg-gradient-to-b from-[#ccede8]/45 via-[#f6fbfa] to-[#fde8eb]/25 dark:from-[#061a16] dark:via-[#051411] dark:to-[#1a0609] border-b border-[#99dcd2]/70 dark:border-[#1e403a] py-5 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between gap-3 sm:gap-8">
            <div className="flex-1 space-y-2 sm:space-y-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ccede8] dark:bg-[#0b1e1b] text-[#004339] dark:text-[#99dcd2] border border-[#66cabb] dark:border-[#1e403a] text-[10px] sm:text-xs font-bold shadow-2xs">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00a78e]" />
                <span>{t('opportunitiesPage.badge')}</span>
              </span>

              <h1 className="font-display font-extrabold text-lg sm:text-2xl lg:text-3xl text-[#00211c] dark:text-white leading-tight">
                {t('opportunitiesPage.title')}
              </h1>

              <p className="text-[11px] sm:text-xs md:text-sm text-[#004339]/80 dark:text-[#99dcd2]/80 leading-relaxed max-w-lg line-clamp-2 sm:line-clamp-none">
                {t('opportunitiesPage.subtitle')}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-[11px] sm:text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg sm:rounded-xl bg-white dark:bg-[#0b1e1b] border border-[#99dcd2] dark:border-[#1e403a] text-[#006455] dark:text-[#99dcd2] font-bold shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#00a78e]" />
                  <span>{filteredOpportunities.length} {t('opportunitiesPage.resultsCount')}</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#fde8eb] dark:bg-[#3d0009]/30 border border-[#f3b8c1] dark:border-[#7a0012] text-[#7a0012] dark:text-[#ff6b81] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a70019]" />
                  <span>{t('opportunitiesPage.tag1')}</span>
                </span>
              </div>
            </div>

            <div className="relative shrink-0 flex items-center justify-center">
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-24 h-20 sm:w-44 sm:h-32 md:w-56 md:h-40"
              >
                <Image
                  src={lookingIllustration}
                  alt={t('opportunitiesPage.title')}
                  className="w-full h-full object-contain drop-shadow-xs"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        <OpportunitiesFilterBar
          filters={filters}
          onUpdateFilter={updateFilter}
          onReset={resetFilters}
        />

        <OpportunitiesResultRows
          opportunities={filteredOpportunities}
          onReset={resetFilters}
        />
      </div>
    </div>
  );
}

export default function OpportunitiesScreen() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f6fbfa] dark:bg-[#051411]" />}>
      <OpportunitiesDirectoryContent />
    </Suspense>
  );
}
