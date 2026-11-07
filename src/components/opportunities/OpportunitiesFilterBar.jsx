'use client';

import { useTranslation } from 'react-i18next';
import { RotateCcw, MapPin, Clock, Sparkles, CalendarDays, SlidersHorizontal } from 'lucide-react';
import {
  SECTORS,
  CITIES,
  WORKING_HOURS_OPTIONS,
  PROFESSIONAL_INTERESTS,
} from '@/data/sectorsConfig';
import { useLanguage } from '@/context/LanguageProvider';

export default function OpportunitiesFilterBar({ filters, onUpdateFilter, onReset }) {
  const { t } = useTranslation('common');
  const { pick } = useLanguage();

  const hasActiveFilters = Boolean(
    filters.sector ||
      filters.city ||
      filters.workingHours ||
      filters.interest ||
      filters.dateFrom ||
      filters.dateTo
  );

  return (
    <div className="bg-white rounded-2xl border border-[#99dcd2] shadow-xs p-4 sm:p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-[#ccede8]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004339] me-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#00a78e]" />
            {t('opportunitiesPage.filterSector')}:
          </span>

          <button
            type="button"
            onClick={() => onUpdateFilter('sector', '')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              !filters.sector
                ? 'bg-[#00a78e] text-white border-[#00a78e]'
                : 'bg-[#ccede8]/40 text-[#004339] border-[#99dcd2] hover:bg-[#ccede8]'
            }`}
          >
            {t('opportunitiesPage.allSectors')}
          </button>

          {SECTORS.map((s) => {
            const active = filters.sector === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onUpdateFilter('sector', active ? '' : s.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#006455] text-white border-[#006455]'
                    : 'bg-[#ccede8]/40 text-[#004339] border-[#99dcd2] hover:bg-[#ccede8]'
                }`}
              >
                {pick(s.label)}
              </button>
            );
          })}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#006455] bg-[#ccede8] hover:bg-[#99dcd2] border border-[#66cabb] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('opportunitiesPage.resetFilters')}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
        <label className="block">
          <span className="flex items-center gap-1.5 text-xs font-bold text-[#004339] mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#00a78e]" />
            {t('opportunitiesPage.filterCity')}
          </span>
          <select
            value={filters.city}
            onChange={(e) => onUpdateFilter('city', e.target.value)}
            className="w-full rounded-xl border border-[#99dcd2] bg-[#ccede8]/25 px-3 py-2 text-xs sm:text-sm text-[#00211c] focus:border-[#00a78e] focus:bg-white focus:outline-none"
          >
            <option value="">{t('opportunitiesPage.allCities')}</option>
            {CITIES.map((city) => (
              <option key={city.id} value={city.id}>{pick(city.label)}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="flex items-center gap-1.5 text-xs font-bold text-[#004339] mb-1.5">
            <Clock className="w-3.5 h-3.5 text-[#00a78e]" />
            {t('opportunitiesPage.filterHours')}
          </span>
          <select
            value={filters.workingHours}
            onChange={(e) => onUpdateFilter('workingHours', e.target.value)}
            className="w-full rounded-xl border border-[#99dcd2] bg-[#ccede8]/25 px-3 py-2 text-xs sm:text-sm text-[#00211c] focus:border-[#00a78e] focus:bg-white focus:outline-none"
          >
            <option value="">{t('opportunitiesPage.allHours')}</option>
            {WORKING_HOURS_OPTIONS.map((wh) => (
              <option key={wh.id} value={wh.id}>{pick(wh.label)}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="flex items-center gap-1.5 text-xs font-bold text-[#004339] mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#00a78e]" />
            {t('opportunitiesPage.filterInterest')}
          </span>
          <select
            value={filters.interest}
            onChange={(e) => onUpdateFilter('interest', e.target.value)}
            className="w-full rounded-xl border border-[#99dcd2] bg-[#ccede8]/25 px-3 py-2 text-xs sm:text-sm text-[#00211c] focus:border-[#00a78e] focus:bg-white focus:outline-none"
          >
            <option value="">{t('opportunitiesPage.allInterests')}</option>
            {PROFESSIONAL_INTERESTS.map((interest) => (
              <option key={interest.id} value={interest.id}>{pick(interest)}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="flex items-center gap-1.5 text-xs font-bold text-[#004339] mb-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-[#00a78e]" />
            {t('opportunitiesPage.filterDateFrom')}
          </span>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onUpdateFilter('dateFrom', e.target.value)}
            className="w-full rounded-xl border border-[#99dcd2] bg-[#ccede8]/25 px-3 py-1.5 text-xs sm:text-sm text-[#00211c] focus:border-[#00a78e] focus:bg-white focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="flex items-center gap-1.5 text-xs font-bold text-[#004339] mb-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-[#00a78e]" />
            {t('opportunitiesPage.filterDateTo')}
          </span>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onUpdateFilter('dateTo', e.target.value)}
            className="w-full rounded-xl border border-[#99dcd2] bg-[#ccede8]/25 px-3 py-1.5 text-xs sm:text-sm text-[#00211c] focus:border-[#00a78e] focus:bg-white focus:outline-none"
          />
        </label>
      </div>
    </div>
  );
}
