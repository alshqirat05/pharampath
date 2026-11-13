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
import { saveBooking, getStoredBookings, useUserRegistered } from '@/data/studentDashboardData';
import SectorTag from '@/components/ui/SectorTag';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageProvider';

export default function OpportunityDetailScreen({ params }) {
  const resolvedParams = use(params);
  const { t } = useTranslation('common');
  const { pick, isRTL, language } = useLanguage();
  const opp = getOpportunityById(resolvedParams?.id);
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  const isRegistered = useUserRegistered();
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
    <div className="min-h-screen bg-[#f4faf8] dark:bg-[#051411] pb-20 transition-colors">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-white dark:bg-[#0b1e1b] border-b border-[#dcefea] dark:border-[#1e403a] py-10 sm:py-12">
        <div className="pointer-events-none absolute -top-24 -end-20 w-72 h-72 rounded-full bg-[#00a78e]/8 blur-3xl dark:bg-[#00a78e]/12" />
        <div className="pointer-events-none absolute -bottom-24 -start-16 w-64 h-64 rounded-full bg-[#a70019]/6 blur-3xl dark:bg-[#a70019]/10" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#4f6f69] dark:text-[#8fb8b0] hover:text-[#00a78e] dark:hover:text-[#5fd3bf] mb-5 transition-colors"
          >
            <BackArrow className="w-4 h-4" />
            <span>{t('opportunityDetail.backToAll')}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <SectorTag sectorId={opp.sector} />
            {city && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#f3b8c1] bg-[#fde8eb]/75 text-[#7a0012] dark:border-[#7a0012]/50 dark:bg-[#3d0009]/30 dark:text-[#ff6b81] text-xs font-semibold">
                <MapPin className="w-3 h-3" />
                <span>{pick(city.label)}</span>
              </span>
            )}
          </div>

          <h1 className="font-display font-bold text-2xl sm:text-3xl leading-snug mb-1.5 text-[#00211c] dark:text-white">
            {pick(opp.title)}
          </h1>
          <p className="text-sm text-[#007a68] dark:text-[#5fd3bf] font-semibold">
            {pick(opp.organization)}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Content Column */}
        <div className="lg:col-span-7 space-y-5">
          {/* Overview Card */}
          <div className="rounded-2xl bg-white dark:bg-[#0b1e1b] border border-[#dcefea] dark:border-[#1e403a] p-6 shadow-xs">
            <h2 className="font-display text-base sm:text-lg font-bold text-[#00211c] dark:text-white mb-2.5">
              {t('opportunityDetail.overview')}
            </h2>
            <p className="text-sm text-[#4f6f69] dark:text-[#99dcd2]/90 leading-relaxed">
              {pick(opp.summary)}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5 pt-5 border-t border-[#eef7f5] dark:border-[#16332d]">
              <div className="rounded-xl bg-[#f8fcfb] dark:bg-[#0d231f] p-3.5 border border-[#eef7f5] dark:border-[#16332d]">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-[#4f6f69] dark:text-[#8fb8b0] mb-1">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#d5eee9] bg-[#eef8f6] text-[#00a78e] dark:border-[#1e403a] dark:bg-[#10291f] dark:text-[#5fd3bf]">
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                  {t('opportunityDetail.locationLabel')}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#00211c] dark:text-white mt-1.5">
                  {pick(opp.locationDetail)}
                </p>
              </div>

              <div className="rounded-xl bg-[#f8fcfb] dark:bg-[#0d231f] p-3.5 border border-[#eef7f5] dark:border-[#16332d]">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-[#4f6f69] dark:text-[#8fb8b0] mb-1">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#f3b8c1] bg-[#fde8eb]/75 text-[#a70019] dark:border-[#7a0012]/50 dark:bg-[#3d0009]/25 dark:text-[#ff6b81]">
                    <Users className="w-3.5 h-3.5" />
                  </span>
                  {t('opportunityDetail.positionsLabel')}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#00211c] dark:text-white mt-1.5">
                  {opp.availablePositions} {t('latestOpportunities.positions')}
                </p>
              </div>

              <div className="rounded-xl bg-[#f8fcfb] dark:bg-[#0d231f] p-3.5 border border-[#eef7f5] dark:border-[#16332d]">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-[#4f6f69] dark:text-[#8fb8b0] mb-1">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#d5eee9] bg-[#eef8f6] text-[#00a78e] dark:border-[#1e403a] dark:bg-[#10291f] dark:text-[#5fd3bf]">
                    <Clock className="w-3.5 h-3.5" />
                  </span>
                  {t('opportunityDetail.scheduleLabel')}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#00211c] dark:text-white mt-1.5">
                  {pick(opp.schedule)}
                </p>
                {wh && (
                  <p className="text-xs text-[#4f6f69] dark:text-[#8fb8b0] mt-0.5">
                    {pick(wh.label)}
                  </p>
                )}
              </div>

              <div className="rounded-xl bg-[#f8fcfb] dark:bg-[#0d231f] p-3.5 border border-[#eef7f5] dark:border-[#16332d]">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-[#4f6f69] dark:text-[#8fb8b0] mb-1">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#d5eee9] bg-[#eef8f6] text-[#00a78e] dark:border-[#1e403a] dark:bg-[#10291f] dark:text-[#5fd3bf]">
                    <CalendarDays className="w-3.5 h-3.5" />
                  </span>
                  {t('opportunityDetail.datesLabel')}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#00211c] dark:text-white mt-1.5" dir="ltr">
                  {opp.availableDates.from} → {opp.availableDates.to}
                </p>
                {interest && (
                  <p className="text-xs text-[#4f6f69] dark:text-[#8fb8b0] mt-0.5">
                    {t('opportunityDetail.interestLabel')}: {pick(interest)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Requirements Card */}
          <div className="rounded-2xl bg-white dark:bg-[#0b1e1b] border border-[#dcefea] dark:border-[#1e403a] p-6 shadow-xs">
            <h2 className="font-display text-base sm:text-lg font-bold text-[#00211c] dark:text-white mb-3.5">
              {t('opportunityDetail.requirementsLabel')}
            </h2>
            <ul className="space-y-2.5">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-[#004339] dark:text-[#e8f7f4]">
                  <CheckCircle2 className="w-4 h-4 text-[#00a78e] shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Unified Booking & Contact Sidebar Card */}
        <aside className="lg:col-span-5">
          <div className="rounded-2xl bg-white dark:bg-[#0b1e1b] border border-[#dcefea] dark:border-[#1e403a] shadow-xs">
            <div className="p-6">
              {/* Status Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#f3b8c1] bg-[#fde8eb]/75 text-[#7a0012] dark:border-[#7a0012]/50 dark:bg-[#3d0009]/30 dark:text-[#ff6b81] text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#a70019] dark:text-[#ff6b81]" />
                  <span>{language === 'en' ? 'Verified Placement' : 'شواغر معتمدة'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#cdebe5] bg-[#eef8f6] text-[#006455] dark:border-[#1e403a] dark:bg-[#10291f] dark:text-[#99dcd2] text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00a78e]" />
                  <span>{opp.availablePositions} {t('latestOpportunities.positions')}</span>
                </span>
              </div>

              <h2 className="font-display text-lg font-bold text-[#00211c] dark:text-white mb-1.5">
                {t('opportunityDetail.bookAndContactTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-[#4f6f69] dark:text-[#8fb8b0] leading-relaxed mb-4">
                {t('opportunityDetail.contactBoxNote')}
              </p>

              {/* Coordinator Info Box */}
              <div className="rounded-xl bg-[#f8fcfb] dark:bg-[#0d231f] border border-[#eef7f5] dark:border-[#16332d] p-4 mb-5 space-y-2">
                <span className="text-[11px] font-semibold text-[#007a68] dark:text-[#5fd3bf] block">
                  {t('opportunityDetail.coordinatorLabel')}
                </span>
                <p className="font-display text-sm sm:text-base font-bold text-[#00211c] dark:text-white">
                  {pick(opp.contact.coordinator)}
                </p>
                <div className="pt-1 space-y-1.5 border-t border-[#eef7f5] dark:border-[#16332d]">
                  <p className="flex items-center gap-2 text-xs font-mono text-[#4f6f69] dark:text-[#99dcd2]" dir="ltr">
                    <Mail className="w-3.5 h-3.5 text-[#00a78e] shrink-0" />
                    <span className="truncate">{opp.contact.email}</span>
                  </p>
                  <p className="flex items-center gap-2 text-xs font-mono text-[#4f6f69] dark:text-[#99dcd2]" dir="ltr">
                    <Phone className="w-3.5 h-3.5 text-[#a70019] dark:text-[#ff6b81] shrink-0" />
                    <span>{opp.contact.phone}</span>
                  </p>
                </div>
              </div>

              {/* Unified Actions: Booking (replaces Email/Messaging) + Direct Call */}
              <div className="flex flex-col gap-2.5">
                {isBooked ? (
                  <div className="space-y-2.5">
                    <div className="rounded-xl border border-[#cdebe5] bg-[#eef8f6] dark:border-[#1e403a] dark:bg-[#10291f] p-3 text-xs font-semibold text-[#006455] dark:text-[#5fd3bf] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00a78e] shrink-0" />
                      <span>{t('opportunityDetail.alreadyBooked')}</span>
                    </div>
                    {isRegistered && (
                      <Link
                        href="/dashboard"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#00a78e] hover:bg-[#008672] text-white py-3 px-4 text-xs sm:text-sm font-bold transition-all shadow-xs"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>{t('opportunityDetail.viewInDashboard')}</span>
                      </Link>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleBook}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#00a78e] hover:bg-[#008672] text-white py-3 px-4 text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer active:scale-[0.99]"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>{t('opportunityDetail.bookTraining')}</span>
                  </button>
                )}

                <a
                  href={`tel:${opp.contact.phone.replace(/\s+/g, '')}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#f8fcfb] dark:bg-[#0d231f] hover:bg-[#eef8f6] dark:hover:bg-[#132b26] text-[#004339] dark:text-[#ccede8] border border-[#dcefea] dark:border-[#1e403a] hover:border-[#00a78e] px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#00a78e]" />
                  <span>{t('opportunityDetail.callAction')}</span>
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Opportunities */}
      {related.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <h2 className="font-display text-lg font-bold text-[#00211c] dark:text-white mb-4">
            {t('opportunityDetail.relatedTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/opportunities/${item.id}`}
                className="rounded-2xl bg-white dark:bg-[#0b1e1b] border border-[#dcefea] dark:border-[#1e403a] p-4 hover:border-[#00a78e] dark:hover:border-[#00a78e] shadow-xs transition-all flex items-center justify-between gap-4"
              >
                <div>
                  <SectorTag sectorId={item.sector} short />
                  <h3 className="font-display text-sm font-bold text-[#00211c] dark:text-white mt-2">
                    {pick(item.title)}
                  </h3>
                  <p className="text-xs text-[#4f6f69] dark:text-[#8fb8b0] mt-0.5">
                    {pick(item.organization)}
                  </p>
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
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#0b1e1b] border border-[#dcefea] dark:border-[#1e403a] p-6 sm:p-8 shadow-xl">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-5 end-5 p-2 rounded-xl text-[#4f6f69] dark:text-[#8fb8b0] hover:bg-[#eef8f6] dark:hover:bg-[#0d231f] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#eef8f6] dark:bg-[#10291f] border border-[#cdebe5] dark:border-[#1e403a] text-[#00a78e] flex items-center justify-center shrink-0">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#a70019] dark:text-[#ff6b81] uppercase tracking-wider block">
                  {t('dashboard.history.pending')}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#00211c] dark:text-white">
                  {t('opportunityDetail.bookingSuccessTitle')}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#4f6f69] dark:text-[#99dcd2]/85 leading-relaxed mb-5">
              {t('opportunityDetail.bookingSuccessDesc')}
            </p>

            <div className="rounded-2xl bg-[#f8fcfb] dark:bg-[#0d231f] border border-[#eef7f5] dark:border-[#16332d] p-4 mb-6 space-y-2.5">
              <div className="flex justify-between items-center text-xs gap-2">
                <span className="text-[#4f6f69] dark:text-[#8fb8b0] font-medium">
                  {language === 'en' ? 'Organization:' : 'الجهة التدريبية:'}
                </span>
                <span className="font-bold text-[#00211c] dark:text-white truncate max-w-[240px]">
                  {pick(opp.organization)}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs gap-2">
                <span className="text-[#4f6f69] dark:text-[#8fb8b0] font-medium">
                  {language === 'en' ? 'Schedule:' : 'المواعيد:'}
                </span>
                <span className="font-semibold text-[#00211c] dark:text-white">
                  {pick(opp.schedule)}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs gap-2">
                <span className="text-[#4f6f69] dark:text-[#8fb8b0] font-medium">
                  {language === 'en' ? 'Status:' : 'الحالة:'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#f3b8c1] bg-[#fde8eb]/75 text-[#7a0012] dark:border-[#7a0012]/50 dark:bg-[#3d0009]/30 dark:text-[#ff6b81] font-bold text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a70019]" />
                  {t('dashboard.history.pending')}
                </span>
              </div>
            </div>

            <div className={isRegistered ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : 'flex'}>
              {isRegistered && (
                <Link
                  href="/dashboard"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#00a78e] hover:bg-[#008672] text-white py-3 px-4 text-xs sm:text-sm font-bold transition-all shadow-xs text-center"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{t('opportunityDetail.viewInDashboard')}</span>
                </Link>
              )}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full py-3 px-4 rounded-xl border border-[#dcefea] dark:border-[#1e403a] bg-[#f8fcfb] dark:bg-[#0d231f] text-[#004339] dark:text-[#ccede8] hover:bg-[#eef8f6] dark:hover:bg-[#132b26] text-xs sm:text-sm font-bold transition-colors cursor-pointer"
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
