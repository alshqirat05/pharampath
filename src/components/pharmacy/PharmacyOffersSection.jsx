'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Clock,
  MapPin,
  PlusCircle,
  Trash2,
  Users,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DashboardCard from '@/components/dashboard/DashboardCard';
import SectorTag from '@/components/ui/SectorTag';
import { useLanguage } from '@/context/LanguageProvider';

export default function PharmacyOffersSection({ offers, onDeleteOffer, onOpenAddOffer }) {
  const { t } = useTranslation('common');
  const { pick, isRTL, language } = useLanguage();
  const isEn = language === 'en';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <DashboardCard
      icon={BriefcaseBusiness}
      title={isEn ? 'Published Pharmacy Offers' : 'العروض والإعلانات المنشورة'}
      subtitle={
        isEn
          ? 'Active training opportunities published by your pharmacy'
          : 'قائمة الإعلانات التدريبية التي نشرتها الصيدلية وتظهر للطلاب'
      }
      action={
        <button
          type="button"
          onClick={onOpenAddOffer}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#a70019] px-3.5 py-2 text-xs font-bold text-white shadow-2xs transition-colors hover:bg-[#8a0015]"
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span>{isEn ? 'Add New Offer' : 'إضافة إعلان جديد'}</span>
        </button>
      }
      className="h-full"
    >
      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-2">
        {offers.map((opp) => {
          const reqs = pick(opp.requirements) || [];

          return (
            <article
              key={opp.id}
              className="rounded-xl border border-[#eef7f5] bg-[#f8fcfb] p-4 transition-all hover:border-[#cdebe5] dark:border-[#16332d] dark:bg-[#0d231f] dark:hover:border-[#1e403a]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <SectorTag sectorId={opp.sector} short />
                  {opp.isCustom && (
                    <span className="rounded-full border border-[#cdebe5] bg-[#eef8f6] px-2 py-0.5 text-[10px] font-bold text-[#006455] dark:border-[#1e403a] dark:bg-[#10291f] dark:text-[#5fd3bf]">
                      {isEn ? 'New' : 'مضاف حديثاً'}
                    </span>
                  )}
                </div>

                <span className="inline-flex items-center gap-1 rounded-full border border-[#f3b8c1] bg-[#fde8eb] px-2.5 py-0.5 text-[11px] font-bold text-[#7a0012] dark:border-[#7a0012] dark:bg-[#3d0009]/30 dark:text-[#ff6b81]">
                  <Users className="h-3 w-3 text-[#a70019] dark:text-[#ff6b81]" />
                  {opp.availablePositions} {t('latestOpportunities.positions')}
                </span>
              </div>

              <h3 className="font-display text-sm sm:text-base font-bold text-[#00211c] dark:text-white leading-snug mb-1">
                {pick(opp.title)}
              </h3>

              <p className="text-xs text-[#4f6f69] dark:text-[#8fb8b0] line-clamp-2 mb-3">
                {pick(opp.summary)}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 rounded-lg border border-[#eef7f5] bg-white p-2.5 mb-3 text-[11px] text-[#00211c] dark:border-[#16332d] dark:bg-[#0b1e1b] dark:text-[#e8f7f4]">
                <div className="flex items-center gap-1.5 min-w-0">
                  <MapPin className="h-3.5 w-3.5 text-[#00a78e] shrink-0" />
                  <span className="truncate">{pick(opp.locationDetail)}</span>
                </div>
                <div className="flex items-center gap-1.5 min-w-0">
                  <Clock className="h-3.5 w-3.5 text-[#00a78e] shrink-0" />
                  <span className="truncate">{pick(opp.schedule)}</span>
                </div>
                <div className="flex items-center gap-1.5 min-w-0" dir="ltr">
                  <CalendarDays className="h-3.5 w-3.5 text-[#a70019] dark:text-[#ff6b81] shrink-0" />
                  <span className="truncate">
                    {opp.availableDates.from} → {opp.availableDates.to}
                  </span>
                </div>
              </div>

              {reqs.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {reqs.slice(0, 3).map((req, idx) => (
                    <span
                      key={idx}
                      className="rounded-md border border-[#dcefea] bg-white px-2 py-0.5 text-[10px] font-medium text-[#4f6f69] dark:border-[#1e403a] dark:bg-[#0b1e1b] dark:text-[#8fb8b0]"
                    >
                      • {req}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#eef7f5] dark:border-[#16332d]">
                <Link
                  href={`/opportunities/${opp.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00a78e] hover:text-[#008672] transition-colors"
                >
                  <span>{isEn ? 'Preview Student View' : 'معاينة الإعلان كما يراه الطالب'}</span>
                  <ArrowIcon className="h-3.5 w-3.5" />
                </Link>

                {opp.isCustom && (
                  <button
                    type="button"
                    onClick={() => onDeleteOffer(opp.id)}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[#f3b8c1] bg-[#fde8eb]/70 px-2.5 py-1 text-[11px] font-semibold text-[#7a0012] transition-colors hover:bg-[#a70019] hover:text-white dark:border-[#7a0012]/50 dark:bg-[#3d0009]/30 dark:text-[#ff6b81] dark:hover:bg-[#a70019] dark:hover:text-white"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>{isEn ? 'Delete' : 'حذف'}</span>
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </DashboardCard>
  );
}

