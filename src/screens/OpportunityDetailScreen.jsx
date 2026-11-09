'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Clock,
  CalendarDays,
  Users,
  CheckCircle2,
  Mail,
  Phone,
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Sparkles,
  X,
  LayoutDashboard,
  ShieldCheck,
} from 'lucide-react';
import { getOpportunityById, opportunitiesSample } from '@/data/opportunitiesSample';
import { getCityById, WORKING_HOURS_OPTIONS, PROFESSIONAL_INTERESTS } from '@/data/sectorsConfig';
import { saveBooking, getStoredBookings } from '@/data/studentDashboardData';
import SectorTag from '@/components/ui/SectorTag';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageProvider';

export default function OpportunityDetailScreen({ params }) {
  const resolvedParams = use(params);
  const { t } = useTranslation('common');
  const { pick, isRTL } = useLanguage();
  const opp = getOpportunityById(resolvedParams?.id);
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  const [isBooked, setIsBooked] = useState(() => {
    if (!opp?.id) return false;
    return getStoredBookings().some((b) => b.opportunityId === opp.id);
  });
  const [showModal, setShowModal] = useState(false);

  if (!opp) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-[#00211c] dark:text-white mb-6">404</h1>
        <Button href="/opportunities" variant="primary">{t('opportunityDetail.backToAll')}</Button>
      </div>
    );
  }

  const handleBook = () => {
    saveBooking(opp);
    setIsBooked(true);
    setShowModal(true);
  };

  const city = getCityById(opp.city);
  const wh = WORKING_HOURS_OPTIONS.find((w) => w.id === opp.workingHours);
  const interest = PROFESSIONAL_INTERESTS.find((i) => i.id === opp.interest);
  const requirements = pick(opp.requirements) || [];
  const related = opportunitiesSample.filter((item) => item.sector === opp.sector && item.id !== opp.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#f6fbfa] dark:bg-[#051411] pb-20 transition-colors">
      <section className="bg-white dark:bg-[#061a16] border-b border-[#99dcd2]/70 dark:border-[#1e403a] py-10 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/opportunities" className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#006455] dark:text-[#99dcd2] hover:text-[#00a78e] mb-5">
            <BackArrow className="w-4 h-4" />
            <span>{t('opportunityDetail.backToAll')}</span>
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <SectorTag sectorId={opp.sector} />
            {city && (
              <span className="px-3 py-1 rounded-full bg-[#ccede8]/70 dark:bg-[#0b1e1b] text-[#004339] dark:text-[#ccede8] border border-[#99dcd2] dark:border-[#1e403a] text-xs font-medium">
                {pick(city.label)}
              </span>
            )}
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl leading-snug mb-1.5 text-[#00211c] dark:text-white">{pick(opp.title)}</h1>
          <p className="text-sm text-[#006455] dark:text-[#99dcd2] font-medium">{pick(opp.organization)}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <div className="lg:col-span-7 space-y-5">
          <div className="rounded-2xl bg-white dark:bg-[#0b1e1b] border border-[#99dcd2] dark:border-[#1e403a] p-6 shadow-2xs">
            <h2 className="font-display text-base sm:text-lg font-bold text-[#00211c] dark:text-white mb-2.5">{t('opportunityDetail.overview')}</h2>
            <p className="text-sm text-[#004339]/80 dark:text-[#99dcd2]/90 leading-relaxed">{pick(opp.summary)}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5 pt-5 border-t border-[#ccede8] dark:border-[#1e403a]">
              <div className="rounded-xl bg-[#ccede8]/20 dark:bg-[#061a16] p-3.5 border border-[#99dcd2]/70 dark:border-[#1e403a]">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-[#006455] dark:text-[#99dcd2] mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#00a78e]" />
                  {t('opportunityDetail.locationLabel')}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#00211c] dark:text-white">{pick(opp.locationDetail)}</p>
              </div>
              <div className="rounded-xl bg-[#ccede8]/20 dark:bg-[#061a16] p-3.5 border border-[#99dcd2]/70 dark:border-[#1e403a]">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-[#006455] dark:text-[#99dcd2] mb-1">
                  <Users className="w-3.5 h-3.5 text-[#00a78e]" />
                  {t('opportunityDetail.positionsLabel')}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#00211c] dark:text-white">{opp.availablePositions} {t('latestOpportunities.positions')}</p>
              </div>
              <div className="rounded-xl bg-[#ccede8]/20 dark:bg-[#061a16] p-3.5 border border-[#99dcd2]/70 dark:border-[#1e403a]">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-[#006455] dark:text-[#99dcd2] mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#00a78e]" />
                  {t('opportunityDetail.scheduleLabel')}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#00211c] dark:text-white">{pick(opp.schedule)}</p>
                {wh && <p className="text-xs text-[#006455] dark:text-[#99dcd2]/80 mt-0.5">{pick(wh.label)}</p>}
              </div>
              <div className="rounded-xl bg-[#ccede8]/20 dark:bg-[#061a16] p-3.5 border border-[#99dcd2]/70 dark:border-[#1e403a]">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-[#006455] dark:text-[#99dcd2] mb-1">
                  <CalendarDays className="w-3.5 h-3.5 text-[#00a78e]" />
                  {t('opportunityDetail.datesLabel')}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#00211c] dark:text-white" dir="ltr">{opp.availableDates.from} → {opp.availableDates.to}</p>
                {interest && <p className="text-xs text-[#006455] dark:text-[#99dcd2]/80 mt-0.5">{t('opportunityDetail.interestLabel')}: {pick(interest)}</p>}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-[#0b1e1b] border border-[#99dcd2] dark:border-[#1e403a] p-6 shadow-2xs">
            <h2 className="font-display text-base sm:text-lg font-bold text-[#00211c] dark:text-white mb-3.5">{t('opportunityDetail.requirementsLabel')}</h2>
            <ul className="space-y-2.5">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-[#004339] dark:text-[#e8f7f4]">
                  <CheckCircle2 className="w-4 h-4 text-[#00a78e] shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:col-span-5 space-y-5">
          {/* Main Booking Action Card */}
          <div className="rounded-2xl bg-gradient-to-br from-[#00a78e] via-[#008672] to-[#004339] p-6 text-white shadow-md relative overflow-hidden">
            <div className="pointer-events-none absolute -top-10 -end-10 w-36 h-36 rounded-full bg-white/10 blur-xl" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>شواغر معتمدة</span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-white/90 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{opp.availablePositions} مقاعد شاغرة</span>
                </span>
              </div>

              <h2 className="font-display text-lg sm:text-xl font-bold text-white mb-1.5">
                {t('opportunityDetail.bookTraining')}
              </h2>
              <p className="text-xs text-white/85 leading-relaxed mb-5">
                احجز تدريبك في هذه المنشأة الآن لمتابعة طلبك والجدول الزمني عبر لوحة تحكم الطالب الخاصة بك.
              </p>

              {isBooked ? (
                <div className="space-y-2.5">
                  <div className="rounded-xl bg-white/20 border border-white/30 p-3 text-xs font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ccede8] shrink-0" />
                    <span>{t('opportunityDetail.alreadyBooked')}</span>
                  </div>
                  <Link
                    href="/dashboard"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#004339] hover:bg-[#ccede8] py-3 px-4 text-xs sm:text-sm font-bold transition-all shadow-xs"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#00a78e]" />
                    <span>{t('opportunityDetail.viewInDashboard')}</span>
                  </Link>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleBook}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-[#ccede8] text-[#004339] py-3 px-4 text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer active:scale-[0.99]"
                >
                  <CalendarCheck className="w-4 h-4 text-[#00a78e]" />
                  <span>{t('opportunityDetail.bookTraining')}</span>
                </button>
              )}
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="rounded-2xl bg-white dark:bg-[#0b1e1b] border border-[#99dcd2] dark:border-[#1e403a] p-6 shadow-xs">
            <h2 className="font-display text-lg font-bold text-[#00211c] dark:text-white mb-2">{t('opportunityDetail.contactBoxTitle')}</h2>
            <p className="text-xs sm:text-sm text-[#004339]/80 dark:text-[#99dcd2]/80 leading-relaxed mb-4">{t('opportunityDetail.contactBoxNote')}</p>
            <div className="rounded-xl bg-[#ccede8]/25 dark:bg-[#061a16] border border-[#99dcd2]/70 dark:border-[#1e403a] p-4 mb-5 space-y-1">
              <span className="text-xs font-semibold text-[#006455] dark:text-[#99dcd2] block">{t('opportunityDetail.coordinatorLabel')}</span>
              <p className="font-display text-sm sm:text-base font-bold text-[#00211c] dark:text-white">{pick(opp.contact.coordinator)}</p>
              <p className="text-xs font-mono text-[#004339] dark:text-[#99dcd2]" dir="ltr">{opp.contact.email}</p>
              <p className="text-xs font-mono text-[#004339] dark:text-[#99dcd2]" dir="ltr">{opp.contact.phone}</p>
            </div>
            <div className="flex flex-col gap-2.5">
              <a
                href={`mailto:${opp.contact.email}?subject=${encodeURIComponent(pick(opp.title))}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#00a78e] hover:bg-[#008672] text-white px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{t('opportunityDetail.emailAction')}</span>
              </a>
              <a
                href={`tel:${opp.contact.phone.replace(/\s+/g, '')}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#ccede8]/60 dark:bg-[#061a16] hover:bg-[#ccede8] dark:hover:bg-[#132b26] text-[#004339] dark:text-[#ccede8] border border-[#99dcd2] dark:border-[#1e403a] px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 text-[#00a78e]" />
                <span>{t('opportunityDetail.callAction')}</span>
              </a>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <h2 className="font-display text-lg font-bold text-[#00211c] dark:text-white mb-4">{t('opportunityDetail.relatedTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/opportunities/${item.id}`}
                className="rounded-2xl bg-white dark:bg-[#0b1e1b] border border-[#99dcd2] dark:border-[#1e403a] p-4 hover:border-[#00a78e] dark:hover:border-[#00a78e] transition-all flex items-center justify-between gap-4"
              >
                <div>
                  <SectorTag sectorId={item.sector} short />
                  <h3 className="font-display text-sm font-bold text-[#00211c] dark:text-white mt-2">{pick(item.title)}</h3>
                  <p className="text-xs text-[#006455] dark:text-[#99dcd2] mt-0.5">{pick(item.organization)}</p>
                </div>
                <ForwardArrow className="w-4 h-4 text-[#00a78e] shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Booking Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#0b1e1b] border border-[#99dcd2] dark:border-[#1e403a] p-6 sm:p-8 shadow-xl">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-5 end-5 p-2 rounded-xl text-[#004339]/60 dark:text-[#99dcd2]/60 hover:bg-[#ccede8]/30 dark:hover:bg-[#061a16] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#ccede8] dark:bg-[#061a16] border border-[#00a78e] text-[#00a78e] flex items-center justify-center shrink-0">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#00a78e] uppercase tracking-wider block">
                  {t('dashboard.history.pending')}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#00211c] dark:text-white">
                  {t('opportunityDetail.bookingSuccessTitle')}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#004339]/80 dark:text-[#99dcd2]/80 leading-relaxed mb-5">
              {t('opportunityDetail.bookingSuccessDesc')}
            </p>

            <div className="rounded-2xl bg-[#f6fbfa] dark:bg-[#061a16] border border-[#99dcd2]/60 dark:border-[#1e403a] p-4 mb-6 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#004339]/70 dark:text-[#99dcd2]/70 font-medium">الجهة التدريبية:</span>
                <span className="font-bold text-[#00211c] dark:text-white truncate max-w-[240px]">{pick(opp.organization)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#004339]/70 dark:text-[#99dcd2]/70 font-medium">المواعيد:</span>
                <span className="font-semibold text-[#00211c] dark:text-white">{pick(opp.schedule)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#004339]/70 dark:text-[#99dcd2]/70 font-medium">الحالة:</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  قيد المراجعة (Pending)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/dashboard"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#00a78e] hover:bg-[#008672] text-white py-3 px-4 text-xs sm:text-sm font-bold transition-all shadow-xs text-center"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{t('opportunityDetail.viewInDashboard')}</span>
              </Link>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full py-3 px-4 rounded-xl border border-[#99dcd2] dark:border-[#1e403a] text-[#004339] dark:text-[#ccede8] hover:bg-[#ccede8]/30 dark:hover:bg-[#061a16] text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                {t('opportunityDetail.closeModal')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
