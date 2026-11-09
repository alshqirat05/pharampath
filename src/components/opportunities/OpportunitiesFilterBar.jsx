'use client';

import { useTranslation } from 'react-i18next';
import { RotateCcw, MapPin, Clock, Sparkles, CalendarDays, Search, X } from 'lucide-react';
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
    filters.q ||
      filters.sector ||
      filters.city ||
      filters.workingHours ||
      filters.interest ||
      filters.dateFrom ||
      filters.dateTo
  );

  return (
    <div className="bg-white dark:bg-[#0b1e1b] rounded-2xl border border-[#99dcd2] dark:border-[#1e403a] shadow-xs p-3.5 sm:p-5 space-y-3 sm:space-y-4 transition-colors">
      {/* 1. Full-Width Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#00a78e] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={filters.q || ''}
          onChange={(e) => onUpdateFilter('q', e.target.value)}
          placeholder={t('opportunitiesPage.searchPlaceholder')}
          className="w-full h-10 sm:h-11 rounded-xl border border-[#99dcd2] dark:border-[#1e403a] bg-[#fcfefd] dark:bg-[#061a16] ps-10 pe-9 text-xs sm:text-sm text-[#00211c] dark:text-white placeholder:text-[#004339]/50 dark:placeholder:text-[#99dcd2]/40 focus:border-[#00a78e] focus:bg-white dark:focus:bg-[#061a16] focus:outline-none transition-colors"
        />
        {filters.q && (
          <button
            type="button"
            onClick={() => onUpdateFilter('q', '')}
            aria-label="Clear search"
            className="absolute end-3 top-1/2 -translate-y-1/2 text-[#004339]/60 dark:text-[#99dcd2]/60 hover:text-[#d6336c] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 2. Sector Segmented Tabs (Scrollable on Mobile) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
        <button
          type="button"
          onClick={() => onUpdateFilter('sector', '')}
          className={`shrink-0 h-8 sm:h-9 px-3 sm:px-4 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
            !filters.sector
              ? 'bg-[#00a78e] text-white shadow-xs'
              : 'bg-[#f6fbfa] dark:bg-[#061a16] text-[#004339] dark:text-[#ccede8] border border-[#99dcd2]/60 dark:border-[#1e403a] hover:bg-white dark:hover:bg-[#132b26]'
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
              className={`shrink-0 h-8 sm:h-9 px-3 sm:px-3.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                active
                  ? 'bg-[#00a78e] text-white shadow-xs'
                  : 'bg-[#f6fbfa] dark:bg-[#061a16] text-[#004339] dark:text-[#ccede8] border border-[#99dcd2]/60 dark:border-[#1e403a] hover:bg-white dark:hover:bg-[#132b26]'
              }`}
            >
              {pick(s.label)}
            </button>
          );
        })}
      </div>

      {/* 3. Mobile-Optimized Grid: 2 Columns on Mobile, 5 on Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 pt-0.5">
        {/* City */}
        <label className="block col-span-1">
          <span className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#004339] dark:text-[#ccede8] mb-1">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00a78e]" />
            {t('opportunitiesPage.filterCity')}
          </span>
          <select
            value={filters.city}
            onChange={(e) => onUpdateFilter('city', e.target.value)}
            className="w-full h-9 sm:h-10 rounded-xl border border-[#99dcd2] dark:border-[#1e403a] bg-white dark:bg-[#061a16] px-2.5 sm:px-3 text-xs sm:text-sm text-[#00211c] dark:text-white focus:border-[#00a78e] focus:outline-none"
          >
            <option value="">{t('opportunitiesPage.allCities')}</option>
            {CITIES.map((c) => (<option key={c.id} value={c.id}>{pick(c.label)}</option>))}
          </select>
        </label>

        {/* Working Hours */}
        <label className="block col-span-1">
          <span className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#004339] dark:text-[#ccede8] mb-1">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00a78e]" />
            {t('opportunitiesPage.filterHours')}
          </span>
          <select
            value={filters.workingHours}
            onChange={(e) => onUpdateFilter('workingHours', e.target.value)}
            className="w-full h-9 sm:h-10 rounded-xl border border-[#99dcd2] dark:border-[#1e403a] bg-white dark:bg-[#061a16] px-2.5 sm:px-3 text-xs sm:text-sm text-[#00211c] dark:text-white focus:border-[#00a78e] focus:outline-none"
          >
            <option value="">{t('opportunitiesPage.allHours')}</option>
            {WORKING_HOURS_OPTIONS.map((wh) => (<option key={wh.id} value={wh.id}>{pick(wh.label)}</option>))}
          </select>
        </label>

        {/* Professional Interest (Full Width on Mobile) */}
        <label className="block col-span-2 sm:col-span-1 lg:col-span-1">
          <span className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#004339] dark:text-[#ccede8] mb-1">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00a78e]" />
            {t('opportunitiesPage.filterInterest')}
          </span>
          <select
            value={filters.interest}
            onChange={(e) => onUpdateFilter('interest', e.target.value)}
            className="w-full h-9 sm:h-10 rounded-xl border border-[#99dcd2] dark:border-[#1e403a] bg-white dark:bg-[#061a16] px-2.5 sm:px-3 text-xs sm:text-sm text-[#00211c] dark:text-white focus:border-[#00a78e] focus:outline-none"
          >
            <option value="">{t('opportunitiesPage.allInterests')}</option>
            {PROFESSIONAL_INTERESTS.map((pi) => (<option key={pi.id} value={pi.id}>{pick(pi)}</option>))}
          </select>
        </label>

        {/* Date From */}
        <label className="block col-span-1">
          <span className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#004339] dark:text-[#ccede8] mb-1">
            <CalendarDays className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00a78e]" />
            {t('opportunitiesPage.filterDateFrom')}
          </span>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onUpdateFilter('dateFrom', e.target.value)}
            className="w-full h-9 sm:h-10 rounded-xl border border-[#99dcd2] dark:border-[#1e403a] bg-white dark:bg-[#061a16] px-2 text-xs text-[#00211c] dark:text-white focus:border-[#00a78e] focus:outline-none"
          />
        </label>

        {/* Date To */}
        <label className="block col-span-1">
          <span className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#004339] dark:text-[#ccede8] mb-1">
            <CalendarDays className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00a78e]" />
            {t('opportunitiesPage.filterDateTo')}
          </span>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onUpdateFilter('dateTo', e.target.value)}
            className="w-full h-9 sm:h-10 rounded-xl border border-[#99dcd2] dark:border-[#1e403a] bg-white dark:bg-[#061a16] px-2 text-xs text-[#00211c] dark:text-white focus:border-[#00a78e] focus:outline-none"
          />
        </label>
      </div>

      {/* 4. Active Filters Reset Strip */}
      {hasActiveFilters && (
        <div className="pt-3 border-t border-[#ccede8]/70 dark:border-[#1e403a] flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006455] dark:text-[#99dcd2]">
            <span className="w-2 h-2 rounded-full bg-[#00a78e]" />
            <span>{t('opportunitiesPage.activeFiltersLabel')}</span>
          </span>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#9c1c47] dark:text-[#f472b6] bg-[#fce7f3] dark:bg-[#831843]/30 hover:bg-[#fbcfe8] dark:hover:bg-[#831843]/50 border border-[#fbcfe8] dark:border-[#9d174d] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('opportunitiesPage.resetFilters')}</span>
          </button>
        </div>
      )}
    </div>
  );
}
