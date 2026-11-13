'use client';

import { useTranslation } from 'react-i18next';
import { Check, Flag } from 'lucide-react';
import DashboardCard from './DashboardCard';

const RING_SIZE = 148;
const RING_STROKE = 10;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function ProgressRing({ percent, value, label }) {
  const offset = RING_CIRCUMFERENCE * (1 - percent / 100);
  return (
    <div className="relative shrink-0" style={{ width: RING_SIZE, height: RING_SIZE }}>
      <svg width={RING_SIZE} height={RING_SIZE} className="-rotate-90" aria-hidden="true">
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          strokeWidth={RING_STROKE}
          className="stroke-[#eef7f5] dark:stroke-[#16332d]"
        />
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="stroke-[#00a78e] transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold tabular-nums leading-none text-[#00211c] dark:text-white">{value}</span>
        <span className="mt-1.5 text-xs font-medium text-[#4f6f69] dark:text-[#8fb8b0]">{label}</span>
      </div>
    </div>
  );
}

export default function TrainingCountdownSection({ placement }) {
  const { t } = useTranslation('common');
  const { countdown } = placement;
  const percent = Math.round((countdown.completedDays / countdown.totalDays) * 100);
  const stepperFill = 50 + percent / 2;

  const steps = [
    {
      key: 'accepted',
      label: t('dashboard.countdown.stageAccepted'),
      date: countdown.bookingConfirmedDate,
      state: 'done',
    },
    {
      key: 'start',
      label: t('dashboard.countdown.stageStart'),
      date: countdown.startDate,
      state: 'current',
    },
    {
      key: 'end',
      label: t('dashboard.countdown.stageEnd'),
      date: countdown.endDate,
      state: 'upcoming',
    },
  ];

  return (
    <DashboardCard
      title={t('dashboard.countdown.title')}
      description={t('dashboard.countdown.desc')}
      action={
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cdebe5] bg-[#eef8f6] px-2.5 py-1 text-xs font-semibold text-[#007a68] dark:border-[#1e403a] dark:bg-[#10291f] dark:text-[#5fd3bf]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00a78e]" />
          {t('dashboard.countdown.inProgress')}
        </span>
      }
      className="h-full"
      bodyClassName="flex flex-col justify-between gap-6"
    >
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <ProgressRing percent={percent} value={countdown.remainingDays} label={t('dashboard.countdown.remaining')} />

        <div className="flex w-full flex-1 flex-col gap-4">
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-[#dcefea] bg-[#dcefea] text-center dark:border-[#16332d] dark:bg-[#16332d]">
            {[
              { label: t('dashboard.countdown.start'), value: countdown.startDate },
              { label: t('dashboard.countdown.end'), value: countdown.endDate },
              {
                label: t('dashboard.countdown.total'),
                value: `${countdown.totalDays} ${t('dashboard.stats.daysUnit')}`,
              },
            ].map((item) => (
              <div key={item.label} className="bg-[#f8fcfb] px-2 py-3 dark:bg-[#0d231f]">
                <dt className="text-[11px] text-[#4f6f69] dark:text-[#8fb8b0]">{item.label}</dt>
                <dd className="mt-1 text-xs sm:text-[13px] font-semibold tabular-nums text-[#00211c] dark:text-white" dir="ltr">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div>
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#00211c] dark:text-white">
                {t('dashboard.countdown.elapsedPct', { pct: percent })}
              </span>
              <span className="tabular-nums font-medium text-[#4f6f69] dark:text-[#8fb8b0]">
                {countdown.completedDays} / {countdown.totalDays} {t('dashboard.stats.daysUnit')}
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#eef7f5] dark:bg-[#16332d]">
              <div className="h-full rounded-full bg-[#00a78e]" style={{ width: `${percent}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stepper: booking accepted → start → end */}
      <ol className="relative grid grid-cols-3 border-t border-[#eef7f5] pt-5 dark:border-[#16332d]">
        <div
          className="absolute end-[16.666%] start-[16.666%] top-[35px] h-0.5 bg-[#e3f1ee] dark:bg-[#16332d]"
          aria-hidden="true"
        >
          <div className="h-full bg-[#00a78e]" style={{ width: `${stepperFill}%` }} />
        </div>

        {steps.map((step) => (
          <li key={step.key} className="relative flex flex-col items-center text-center">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full ring-4 ${
                step.state === 'upcoming'
                  ? 'border border-[#cfe6e1] bg-[#f8fcfb] text-[#4f6f69] ring-white dark:border-[#1e403a] dark:bg-[#0d231f] dark:text-[#8fb8b0] dark:ring-[#0b1e1b]'
                  : step.state === 'current'
                    ? 'bg-[#a70019] text-white ring-[#fde8eb] dark:ring-[#3d0009]/40'
                    : 'bg-[#00a78e] text-white ring-white dark:ring-[#0b1e1b]'
              }`}
            >
              {step.state === 'upcoming' ? (
                <Flag className="h-3.5 w-3.5" />
              ) : (
                <Check className="h-4 w-4" strokeWidth={2.5} />
              )}
            </span>
            <span className="mt-2 text-xs font-semibold text-[#00211c] dark:text-white">{step.label}</span>
            <span className="mt-0.5 text-[11px] tabular-nums text-[#4f6f69] dark:text-[#8fb8b0]" dir="ltr">
              {step.date}
            </span>
          </li>
        ))}
      </ol>
    </DashboardCard>
  );
}
