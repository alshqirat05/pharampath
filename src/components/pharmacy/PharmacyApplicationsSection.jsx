'use client';

import { useState } from 'react';
import {
  Calendar,
  Check,
  Clock,
  GraduationCap,
  Mail,
  Phone,
  Users,
  X,
} from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { WORKING_HOURS_OPTIONS } from '@/data/sectorsConfig';
import { useLanguage } from '@/context/LanguageProvider';

const STATUS_STYLE = {
  accepted: {
    pill: 'border-[#cdebe5] bg-[#eef8f6] text-[#006455] dark:border-[#1e403a] dark:bg-[#10291f] dark:text-[#5fd3bf]',
    avatar: 'bg-[#00a78e] text-white',
    dot: 'bg-[#00a78e]',
    labelAr: 'مقبول',
    labelEn: 'Accepted',
  },
  pending: {
    pill: 'border-[#dcefea] bg-[#f8fcfb] text-[#4f6f69] dark:border-[#1e403a] dark:bg-[#0d231f] dark:text-[#8fb8b0]',
    avatar: 'bg-[#eef8f6] text-[#006455] border border-[#cdebe5] dark:bg-[#10291f] dark:text-[#99dcd2] dark:border-[#1e403a]',
    dot: 'bg-[#00a78e]',
    labelAr: 'قيد المراجعة',
    labelEn: 'Pending',
  },
  rejected: {
    pill: 'border-[#f3b8c1] bg-[#fde8eb]/80 text-[#7a0012] dark:border-[#7a0012]/60 dark:bg-[#3d0009]/35 dark:text-[#ff6b81]',
    avatar: 'bg-[#fde8eb] text-[#a70019] border border-[#f3b8c1] dark:bg-[#3d0009]/40 dark:text-[#ff6b81] dark:border-[#7a0012]/50',
    dot: 'bg-[#a70019]',
    labelAr: 'مرفوض',
    labelEn: 'Rejected',
  },
};

export default function PharmacyApplicationsSection({
  applications,
  onAccept,
  onReject,
}) {
  const { pick, language } = useLanguage();
  const isEn = language === 'en';
  const [filter, setFilter] = useState('all');

  const counts = {
    all: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
    accepted: applications.filter((a) => a.status === 'accepted').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  };

  const filtered =
    filter === 'all' ? applications : applications.filter((a) => a.status === filter);

  const tabs = [
    { id: 'all', label: isEn ? 'All' : 'الكل', count: counts.all },
    { id: 'pending', label: isEn ? 'Pending' : 'قيد المراجعة', count: counts.pending },
    { id: 'accepted', label: isEn ? 'Accepted' : 'مقبول', count: counts.accepted },
    { id: 'rejected', label: isEn ? 'Rejected' : 'مرفوض', count: counts.rejected },
  ];

  return (
    <DashboardCard
      icon={Users}
      title={isEn ? 'Student Training Applications' : 'طلبات الطلاب المتقدمين للتدريب'}
      subtitle={
        isEn
          ? 'Review applicants and accept or reject requests'
          : 'مراجعة المتقدمين وقبول أو رفض طلبات التدريب'
      }
      action={
        <div className="flex flex-wrap items-center gap-1.5">
          {tabs.map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                  active
                    ? 'border-[#00a78e] bg-[#00a78e] text-white'
                    : 'border-[#dcefea] bg-[#f8fcfb] text-[#4f6f69] hover:border-[#00a78e] dark:border-[#1e403a] dark:bg-[#0d231f] dark:text-[#8fb8b0]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 text-[10px] font-bold ${
                    active
                      ? 'bg-white/20 text-white'
                      : 'bg-[#eef8f6] text-[#006455] dark:bg-[#10291f] dark:text-[#99dcd2]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      }
    >
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-[#eef7f5] bg-[#f8fcfb] p-6 text-center text-xs text-[#4f6f69] dark:border-[#16332d] dark:bg-[#0d231f] dark:text-[#8fb8b0]">
          {isEn ? 'No applications in this category.' : 'لا توجد طلبات ضمن هذا التصنيف حالياً.'}
        </div>
      ) : (
        <div className="divide-y divide-[#eef7f5] rounded-xl border border-[#eef7f5] bg-[#f8fcfb]/60 dark:divide-[#16332d] dark:border-[#16332d] dark:bg-[#0d231f]/60">
          {filtered.map((app) => {
            const meta = STATUS_STYLE[app.status] || STATUS_STYLE.pending;
            const shift = WORKING_HOURS_OPTIONS.find((w) => w.id === app.preferredShift);
            const studentName = isEn && app.studentNameEn ? app.studentNameEn : app.studentName;
            const initials = studentName
              .split(' ')
              .filter(Boolean)
              .slice(0, 2)
              .map((p) => p[0])
              .join('');

            return (
              <article
                key={app.id}
                className="flex flex-col gap-3 p-4 transition-colors hover:bg-white dark:hover:bg-[#0b1e1b] sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Student Identity & Info */}
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${meta.avatar}`}
                  >
                    {initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-[#00211c] dark:text-white">
                        {studentName}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${meta.pill}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                        <span>{isEn ? meta.labelEn : meta.labelAr}</span>
                      </span>
                    </div>

                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[#007a68] dark:text-[#5fd3bf] font-medium truncate">
                      <GraduationCap className="h-3.5 w-3.5 shrink-0 text-[#00a78e]" />
                      <span className="truncate">
                        {pick(app.university)} · {pick(app.academicYear)}
                      </span>
                    </p>

                    {app.note && (
                      <p className="mt-1 text-xs text-[#4f6f69] dark:text-[#8fb8b0] line-clamp-1">
                        {pick(app.note)}
                      </p>
                    )}

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#7a958f] dark:text-[#6f978f]">
                      {shift && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3 text-[#00a78e]" />
                          {pick(shift.label)}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1" dir="ltr">
                        <Calendar className="h-3 w-3 text-[#00a78e]" />
                        {app.appliedDate}
                      </span>
                      <a
                        href={`mailto:${app.email}`}
                        title={app.email}
                        className="inline-flex items-center gap-1 hover:text-[#00a78e] transition-colors"
                      >
                        <Mail className="h-3 w-3 text-[#00a78e]" />
                        <span>{isEn ? 'Email' : 'البريد'}</span>
                      </a>
                      <a
                        href={`tel:${app.phone.replace(/\s+/g, '')}`}
                        title={app.phone}
                        className="inline-flex items-center gap-1 hover:text-[#a70019] transition-colors"
                      >
                        <Phone className="h-3 w-3 text-[#a70019] dark:text-[#ff6b81]" />
                        <span dir="ltr">{app.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Accept / Reject Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 sm:self-center">
                  <button
                    type="button"
                    onClick={() => onAccept(app.id)}
                    disabled={app.status === 'accepted'}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                      app.status === 'accepted'
                        ? 'bg-[#eef8f6] text-[#006455] border border-[#cdebe5] opacity-75 cursor-default dark:bg-[#10291f] dark:text-[#5fd3bf] dark:border-[#1e403a]'
                        : 'bg-[#00a78e] hover:bg-[#008672] text-white shadow-2xs active:scale-[0.98]'
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>{isEn ? 'Accept' : 'قبول'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onReject(app.id)}
                    disabled={app.status === 'rejected'}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                      app.status === 'rejected'
                        ? 'bg-[#fde8eb] text-[#7a0012] border border-[#f3b8c1] opacity-75 cursor-default dark:bg-[#3d0009]/40 dark:text-[#ff6b81] dark:border-[#7a0012]/50'
                        : 'bg-[#a70019] hover:bg-[#8a0015] text-white shadow-2xs active:scale-[0.98]'
                    }`}
                  >
                    <X className="h-3.5 w-3.5" />
                    <span>{isEn ? 'Reject' : 'رفض'}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </DashboardCard>
  );
}
