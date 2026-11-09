'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowUpLeft, ArrowUpRight, Calendar, CheckCircle2, Clock3, Inbox, XCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageProvider';
import DashboardCard from './DashboardCard';

const STATUS_STYLE = {
  accepted: {
    icon: CheckCircle2,
    badge:
      'border-[#cdebe5] bg-[#eef8f6] text-[#007a68] dark:border-[#1e403a] dark:bg-[#10291f] dark:text-[#5fd3bf]',
    dot: 'bg-[#00a78e]',
  },
  pending: {
    icon: Clock3,
    badge:
      'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800/50 dark:bg-amber-950/40 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
  rejected: {
    icon: XCircle,
    badge:
      'border-[#fbcfe8] bg-[#fce7f3]/70 text-[#9c1c47] dark:border-[#9d174d]/60 dark:bg-[#831843]/30 dark:text-[#f472b6]',
    dot: 'bg-[#d6336c]',
  },
};

export default function BookingsHistorySection({ bookings }) {
  const { t } = useTranslation('common');
  const { language, isRTL } = useLanguage();
  const [filter, setFilter] = useState('all');
  const pick = (field) => (typeof field === 'object' && field !== null ? field[language] || field.ar : field);
  const ExternalArrow = isRTL ? ArrowUpLeft : ArrowUpRight;

  const counts = {
    all: bookings.length,
    accepted: bookings.filter((b) => b.status === 'accepted').length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    rejected: bookings.filter((b) => b.status === 'rejected').length,
  };

  const tabs = [
    { id: 'all', label: t('dashboard.history.all'), count: counts.all },
    { id: 'accepted', label: t('dashboard.history.accepted'), count: counts.accepted },
    { id: 'pending', label: t('dashboard.history.pending'), count: counts.pending },
    { id: 'rejected', label: t('dashboard.history.rejected'), count: counts.rejected },
  ];

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <DashboardCard
      title={t('dashboard.history.title')}
      description={t('dashboard.history.desc')}
      className="h-full"
      bodyClassName="flex flex-col gap-4"
    >
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#eef7f5] pb-3.5 dark:border-[#16332d]">
        {tabs.map((tab) => {
          const active = filter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? 'bg-[#00a78e] text-white'
                  : 'bg-[#f5faf9] text-[#4f6f69] hover:bg-[#e9f5f2] dark:bg-[#0d231f] dark:text-[#8fb8b0] dark:hover:bg-[#13302b]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[11px] tabular-nums ${
                  active
                    ? 'bg-white/20 text-white'
                    : 'bg-white text-[#00211c] dark:bg-[#0b1e1b] dark:text-[#8fb8b0]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-[#dcefea] py-10 text-center dark:border-[#1e403a]">
          <Inbox className="h-7 w-7 text-[#7a958f]" />
          <p className="mt-2 text-xs font-medium text-[#4f6f69] dark:text-[#8fb8b0]">{t('dashboard.history.empty')}</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden overflow-hidden rounded-xl border border-[#eef7f5] md:block dark:border-[#16332d]">
            <table className="w-full text-start text-xs">
              <thead className="bg-[#f8fcfb] text-[11px] font-semibold text-[#4f6f69] dark:bg-[#0d231f] dark:text-[#8fb8b0]">
                <tr>
                  <th className="px-4 py-3 text-start">{t('dashboard.history.colSite')}</th>
                  <th className="px-3 py-3 text-start">{t('dashboard.history.colPeriod')}</th>
                  <th className="px-3 py-3 text-start">{t('dashboard.history.colDate')}</th>
                  <th className="px-3 py-3 text-start">{t('dashboard.history.colStatus')}</th>
                  <th className="px-4 py-3 text-end"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eef7f5] dark:divide-[#16332d]">
                {filtered.map((item) => {
                  const cfg = STATUS_STYLE[item.status] || STATUS_STYLE.pending;
                  return (
                    <tr
                      key={item.id}
                      className="bg-white transition-colors hover:bg-[#f9fdfc] dark:bg-[#0b1e1b] dark:hover:bg-[#0d231f]/70"
                    >
                      <td className="px-4 py-3.5 align-top">
                        <p className="font-bold text-[#00211c] dark:text-white">{pick(item.pharmacyName)}</p>
                        <p className="mt-0.5 text-[11px] text-[#4f6f69] dark:text-[#8fb8b0]">
                          {t(`sectors.${item.sector}.short`)} · {t(`cities.${item.city}`)}
                        </p>
                        {item.note && (
                          <p className="mt-1 line-clamp-1 text-[11px] text-[#6b8782] dark:text-[#6f978f]">
                            {pick(item.note)}
                          </p>
                        )}
                      </td>
                      <td className="px-3 py-3.5 align-top">
                        <p className="font-medium tabular-nums text-[#00211c] dark:text-white" dir="ltr">
                          {item.trainingPeriod}
                        </p>
                        <p className="mt-0.5 text-[11px] text-[#4f6f69] dark:text-[#8fb8b0]">{pick(item.schedule)}</p>
                      </td>
                      <td className="px-3 py-3.5 align-top tabular-nums text-[#4f6f69] dark:text-[#8fb8b0]" dir="ltr">
                        {item.bookingDate}
                      </td>
                      <td className="px-3 py-3.5 align-top">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${cfg.badge}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                          {t(`dashboard.history.${item.status}`)}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 align-top text-end">
                        <Link
                          href={`/opportunities/${item.opportunityId}`}
                          className="inline-flex items-center gap-1 font-semibold text-[#00a78e] hover:text-[#007a68]"
                        >
                          <span>{t('dashboard.history.viewAd')}</span>
                          <ExternalArrow className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="space-y-2.5 md:hidden">
            {filtered.map((item) => {
              const cfg = STATUS_STYLE[item.status] || STATUS_STYLE.pending;
              return (
                <div
                  key={item.id}
                  className="rounded-xl border border-[#dcefea] bg-[#f8fcfb] p-3.5 dark:border-[#16332d] dark:bg-[#0d231f]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold leading-snug text-[#00211c] dark:text-white">
                        {pick(item.pharmacyName)}
                      </h3>
                      <p className="mt-0.5 text-[11px] text-[#4f6f69] dark:text-[#8fb8b0]">
                        {t(`sectors.${item.sector}.short`)} · {t(`cities.${item.city}`)}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${cfg.badge}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                      {t(`dashboard.history.${item.status}`)}
                    </span>
                  </div>

                  <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-[#e5f3ef] pt-2.5 text-[11px] text-[#4f6f69] dark:border-[#16332d] dark:text-[#8fb8b0]">
                    <span className="inline-flex items-center gap-1 tabular-nums" dir="ltr">
                      <Calendar className="h-3 w-3 text-[#00a78e]" />
                      {item.trainingPeriod}
                    </span>
                    <Link
                      href={`/opportunities/${item.opportunityId}`}
                      className="inline-flex items-center gap-1 font-semibold text-[#00a78e]"
                    >
                      <span>{t('dashboard.history.viewAd')}</span>
                      <ExternalArrow className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </DashboardCard>
  );
}
