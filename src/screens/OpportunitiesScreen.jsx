'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { opportunitiesSample } from '@/data/opportunitiesSample';
import OpportunitiesFilterBar from '@/components/opportunities/OpportunitiesFilterBar';
import OpportunitiesResultRows from '@/components/opportunities/OpportunitiesResultRows';

function OpportunitiesDirectoryContent() {
  const { t } = useTranslation('common');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo(
    () => ({
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

  const filteredOpportunities = useMemo(() => {
    return opportunitiesSample.filter((opp) => {
      if (filters.sector && opp.sector !== filters.sector) return false;
      if (filters.city && opp.city !== filters.city) return false;
      if (filters.workingHours && opp.workingHours !== filters.workingHours) return false;
      if (filters.interest && opp.interest !== filters.interest) return false;
      if (filters.dateFrom && opp.availableDates.to < filters.dateFrom) return false;
      if (filters.dateTo && opp.availableDates.from > filters.dateTo) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#f6fbfa] pb-18">
      <section className="bg-white border-b border-[#99dcd2] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-bold text-[#004339] bg-[#ccede8] border border-[#99dcd2] px-3 py-1 rounded-full mb-2.5">
            {t('opportunitiesPage.badge')}
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#00211c] mb-1.5">
            {t('opportunitiesPage.title')}
          </h1>
          <p className="text-xs sm:text-sm text-[#004339]/80 max-w-2xl leading-relaxed">
            {t('opportunitiesPage.subtitle')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-5">
        <OpportunitiesFilterBar
          filters={filters}
          onUpdateFilter={updateFilter}
          onReset={resetFilters}
        />

        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-[#004339]">
            {filteredOpportunities.length} {t('opportunitiesPage.resultsCount')}
          </span>
        </div>

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
    <Suspense fallback={<div className="min-h-screen bg-[#f6fbfa]" />}>
      <OpportunitiesDirectoryContent />
    </Suspense>
  );
}
