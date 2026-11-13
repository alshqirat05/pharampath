'use client';

import { BriefcaseBusiness, CheckCircle2, Clock3, Users } from 'lucide-react';
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

export default function PharmacyStats({ offers, applications }) {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const pendingCount = applications.filter((a) => a.status === 'pending').length;
  const acceptedCount = applications.filter((a) => a.status === 'accepted').length;
  const totalSeats = offers.reduce((sum, opp) => sum + (Number(opp.availablePositions) || 0), 0);

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#dcefea] bg-[#dcefea] dark:border-[#1e403a] dark:bg-[#1e403a] lg:grid-cols-4">
      <Stat
        icon={Clock3}
        label={isEn ? 'Pending Applications' : 'طلبات بانتظار القرار'}
        value={pendingCount}
        unit={isEn ? 'requests' : 'طلبات'}
        hint={isEn ? 'Needs accept or reject' : 'تحتاج قبول أو رفض'}
        tone="rose"
      />
      <Stat
        icon={CheckCircle2}
        label={isEn ? 'Accepted Trainees' : 'الطلاب المقبولون'}
        value={acceptedCount}
        unit={isEn ? 'students' : 'طلاب'}
        hint={isEn ? 'Confirmed for training' : 'تم تأكيد تدريبهم'}
        tone="teal"
      />
      <Stat
        icon={BriefcaseBusiness}
        label={isEn ? 'Published Offers' : 'العروض المنشورة'}
        value={offers.length}
        unit={isEn ? 'offers' : 'إعلانات'}
        hint={isEn ? 'Visible to students' : 'ظاهرة للطلاب'}
        tone="teal"
      />
      <Stat
        icon={Users}
        label={isEn ? 'Available Seats' : 'إجمالي المقاعد'}
        value={totalSeats}
        unit={isEn ? 'seats' : 'مقاعد'}
        hint={isEn ? 'Across all offers' : 'ضمن كافة الإعلانات'}
        tone="rose"
      />
    </div>
  );
}

