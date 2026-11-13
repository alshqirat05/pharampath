'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowUpLeft, ArrowUpRight, Building2, CalendarDays, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageProvider';
import DashboardCard from './DashboardCard';

const WEEKDAYS_AR = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function AcceptedPharmacySection({ placement }) {
  const { t } = useTranslation('common');
  const { language, isRTL } = useLanguage();
  const pick = (field) => (typeof field === 'object' && field !== null ? field[language] || field.ar : field);
  const ExternalArrow = isRTL ? ArrowUpLeft : ArrowUpRight;
  const weekdays = language === 'en' ? WEEKDAYS_EN : WEEKDAYS_AR;

  return (
    <DashboardCard
      title={t('dashboard.pharmacy.title')}
      description={t('dashboard.pharmacy.desc')}
      action={
        <Link
          href={`/opportunities/${placement.id}`}
          className="inline-flex items-center gap-1 rounded-lg border border-[#dcefea] bg-[#f8fcfb] px-2.5 py-1 text-xs font-medium text-[#007a68] transition-colors hover:border-[#00a78e] hover:text-[#00a78e] dark:border-[#1e403a] dark:bg-[#0d231f] dark:text-[#5fd3bf]"
        >
          <span>{t('dashboard.pharmacy.viewAd')}</span>
          <ExternalArrow className="h-3.5 w-3.5" />
        </Link>
      }
      className="h-full"
      bodyClassName="flex flex-col justify-between gap-4"
    >
      {/* Pharmacy Identity & Details */}
      <div className="space-y-3.5">
        <div className="flex items-start justify-between gap-3 rounded-xl border border-[#dcefea] bg-[#f8fcfb] p-3.5 dark:border-[#16332d] dark:bg-[#0d231f]">
          <div className="flex items-start gap-3 min-w-0">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00a78e] text-white">
              <Building2 className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold text-[#00211c] dark:text-white sm:text-[15px]">
                {pick(placement.pharmacyName)}
              </h3>
              <p className="mt-0.5 truncate text-xs text-[#4f6f69] dark:text-[#8fb8b0]">{pick(placement.branch)}</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-[#f3b8c1] bg-[#fde8eb]/75 px-2.5 py-0.5 text-[11px] font-semibold text-[#7a0012] dark:border-[#7a0012]/50 dark:bg-[#3d0009]/30 dark:text-[#ff6b81]">
            {t(`sectors.${placement.sector}.short`)}
          </span>
        </div>

        {/* Location & Shift Hours */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <div className="flex items-start gap-2.5 rounded-xl border border-[#eef7f5] bg-white p-3 dark:border-[#16332d] dark:bg-[#0b1e1b]">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#a70019]" />
            <div className="min-w-0">
              <p className="text-[11px] text-[#4f6f69] dark:text-[#8fb8b0]">{t('dashboard.pharmacy.location')}</p>
              <p className="mt-0.5 text-xs font-semibold leading-snug text-[#00211c] dark:text-white">
                {pick(placement.location)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-[#eef7f5] bg-white p-3 dark:border-[#16332d] dark:bg-[#0b1e1b]">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#00a78e]" />
            <div className="min-w-0">
              <p className="text-[11px] text-[#4f6f69] dark:text-[#8fb8b0]">{t('dashboard.pharmacy.time')}</p>
              <p className="mt-0.5 text-xs font-semibold leading-snug text-[#00211c] dark:text-white">
                {pick(placement.trainingTime)}
              </p>
            </div>
          </div>
        </div>

        {/* Weekly Schedule Strip */}
        <div className="rounded-xl border border-[#eef7f5] bg-white p-3 dark:border-[#16332d] dark:bg-[#0b1e1b]">
          <div className="mb-2 flex items-center justify-between gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#4f6f69] dark:text-[#8fb8b0]">
              <CalendarDays className="h-3.5 w-3.5 text-[#00a78e]" />
              {t('dashboard.pharmacy.days')}
            </span>
            <span className="font-semibold text-[#00211c] dark:text-white">{pick(placement.trainingDays)}</span>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {weekdays.map((day, idx) => {
              const active = placement.activeWeekdays.includes(idx);
              return (
                <span
                  key={day}
                  className={`flex h-7 items-center justify-center rounded-lg text-[11px] font-medium ${
                    active
                      ? 'bg-[#eef8f6] font-semibold text-[#007a68] border border-[#cdebe5] dark:bg-[#10291f] dark:text-[#5fd3bf] dark:border-[#1e403a]'
                      : 'bg-[#f8faf9] text-[#8aa39e] dark:bg-[#0d201d] dark:text-[#52736d]'
                  }`}
                >
                  {day}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Coordinator Contact Footer */}
      <div className="flex flex-col gap-2.5 border-t border-[#eef7f5] pt-3.5 sm:flex-row sm:items-center sm:justify-between dark:border-[#16332d]">
        <div className="min-w-0">
          <p className="text-[11px] text-[#4f6f69] dark:text-[#8fb8b0]">{t('dashboard.pharmacy.coordinator')}</p>
          <p className="truncate text-xs font-semibold text-[#00211c] dark:text-white">
            {pick(placement.coordinator.name)}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:shrink-0">
          <a
            href={`tel:${placement.coordinator.phone.replace(/\s+/g, '')}`}
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-[#dcefea] bg-[#f8fcfb] px-3 text-xs font-medium text-[#00211c] transition-colors hover:border-[#00a78e] dark:border-[#1e403a] dark:bg-[#0d231f] dark:text-white"
          >
            <Phone className="h-3.5 w-3.5 text-[#00a78e]" />
            <span>{t('dashboard.pharmacy.call')}</span>
          </a>
          <a
            href={`mailto:${placement.coordinator.email}`}
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-[#dcefea] bg-[#f8fcfb] px-3 text-xs font-medium text-[#007a68] transition-colors hover:border-[#00a78e] hover:bg-[#eef8f6] dark:border-[#1e403a] dark:bg-[#0d231f] dark:text-[#5fd3bf]"
          >
            <Mail className="h-3.5 w-3.5 text-[#00a78e]" />
            <span>{t('dashboard.pharmacy.email')}</span>
          </a>
        </div>
      </div>
    </DashboardCard>
  );
}
