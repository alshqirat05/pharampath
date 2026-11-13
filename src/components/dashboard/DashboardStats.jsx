'use client';

import { useTranslation } from 'react-i18next';
import { CalendarCheck, CalendarDays, Hourglass, Inbox } from 'lucide-react';
import { useLanguage } from '@/context/LanguageProvider';

function Stat({ icon: Icon, label, value, unit, hint, tone = 'teal' }) {
  const iconTone =
    tone === 'rose'
      ? 'border-[#f3b8c1] bg-[#fde8eb]/75 text-[#a70019] dark:border-[#7a0012]/50 dark:bg-[#3d0009]/25 dark:text-[#ff6b81]'
      : 'border-[#d5eee9] bg-[#eef8f6] text-[#00a78e] dark:border-[#1e403a] dark:bg-[#10291f] dark:text-[#5fd3bf]';

  return (
    <div className="flex items-start gap-3.5 bg-white p-4 dark:bg-[#0b1e1b] sm:p-5">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${iconTone}`}>
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-[#4f6f69] dark:text-[#8fb8b0]">{label}</p>
        <p className="mt-1 flex items-baseline gap-1.5">
          <span className="text-2xl font-bold tabular-nums leading-none text-[#00211c] dark:text-white">{value}</span>
          {unit && <span className="text-xs font-medium text-[#4f6f69] dark:text-[#8fb8b0]">{unit}</span>}
        </p>
        {hint && <p className="mt-1 truncate text-[11px] text-[#7a958f] dark:text-[#6f978f]">{hint}</p>}
      </div>
    </div>
  );
}

export default function DashboardStats({ placement, bookings }) {
  const { t } = useTranslation('common');
  const { pick } = useLanguage();
  const { countdown, activeWeekdays } = placement;
  const accepted = bookings.filter((b) => b.status === 'accepted').length;
  const pending = bookings.filter((b) => b.status === 'pending').length;

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#dcefea] bg-[#dcefea] dark:border-[#1e403a] dark:bg-[#1e403a] lg:grid-cols-4">
      <Stat
        icon={Hourglass}
        label={t('dashboard.stats.remaining')}
        value={countdown.remainingDays}
        unit={t('dashboard.stats.daysUnit')}
        hint={t('dashboard.stats.untilEnd', { date: countdown.endDate })}
        tone="rose"
      />
      <Stat
        icon={CalendarCheck}
        label={t('dashboard.stats.elapsed')}
        value={countdown.completedDays}
        unit={t('dashboard.stats.daysUnit')}
        hint={t('dashboard.stats.ofTotal', { total: countdown.totalDays })}
      />
      <Stat
        icon={CalendarDays}
        label={t('dashboard.stats.weeklyDays')}
        value={activeWeekdays.length}
        unit={t('dashboard.stats.perWeek')}
        hint={pick(placement.trainingDays)}
      />
      <Stat
        icon={Inbox}
        label={t('dashboard.stats.bookings')}
        value={bookings.length}
        hint={t('dashboard.stats.bookingsBreakdown', { accepted, pending })}
      />
    </div>
  );
}
