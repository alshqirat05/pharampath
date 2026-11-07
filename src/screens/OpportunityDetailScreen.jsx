'use client';

import { use } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { MapPin, Clock, CalendarDays, Users, CheckCircle2, Mail, Phone, ArrowLeft, ArrowRight } from 'lucide-react';
import { getOpportunityById, opportunitiesSample } from '@/data/opportunitiesSample';
import { getCityById, WORKING_HOURS_OPTIONS, PROFESSIONAL_INTERESTS } from '@/data/sectorsConfig';
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

  if (!opp) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-zinc-900 mb-6">404</h1>
        <Button href="/opportunities" variant="primary">{t('opportunityDetail.backToAll')}</Button>
      </div>
    );
  }

  const city = getCityById(opp.city);
  const wh = WORKING_HOURS_OPTIONS.find((w) => w.id === opp.workingHours);
  const interest = PROFESSIONAL_INTERESTS.find((i) => i.id === opp.interest);
  const requirements = pick(opp.requirements) || [];
  const related = opportunitiesSample.filter((item) => item.sector === opp.sector && item.id !== opp.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      <section className="bg-white border-b border-zinc-200/80 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/opportunities" className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-500 hover:text-zinc-900 mb-5">
            <BackArrow className="w-4 h-4" />
            <span>{t('opportunityDetail.backToAll')}</span>
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <SectorTag sectorId={opp.sector} />
            {city && <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium">{pick(city.label)}</span>}
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl leading-snug mb-1.5 text-zinc-900">{pick(opp.title)}</h1>
          <p className="text-sm text-zinc-500 font-medium">{pick(opp.organization)}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <div className="lg:col-span-7 space-y-5">
          <div className="rounded-2xl bg-white border border-zinc-200 p-6 shadow-2xs">
            <h2 className="font-display text-base sm:text-lg font-bold text-zinc-900 mb-2.5">{t('opportunityDetail.overview')}</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">{pick(opp.summary)}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5 pt-5 border-t border-zinc-100">
              <div className="rounded-xl bg-zinc-50 p-3.5 border border-zinc-200/70">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  {t('opportunityDetail.locationLabel')}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-zinc-900">{pick(opp.locationDetail)}</p>
              </div>
              <div className="rounded-xl bg-zinc-50 p-3.5 border border-zinc-200/70">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 mb-1">
                  <Users className="w-3.5 h-3.5 text-teal-600" />
                  {t('opportunityDetail.positionsLabel')}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-zinc-900">{opp.availablePositions} {t('latestOpportunities.positions')}</p>
              </div>
              <div className="rounded-xl bg-zinc-50 p-3.5 border border-zinc-200/70">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 mb-1">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  {t('opportunityDetail.scheduleLabel')}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-zinc-900">{pick(opp.schedule)}</p>
                {wh && <p className="text-xs text-zinc-500 mt-0.5">{pick(wh.label)}</p>}
              </div>
              <div className="rounded-xl bg-zinc-50 p-3.5 border border-zinc-200/70">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 mb-1">
                  <CalendarDays className="w-3.5 h-3.5 text-teal-600" />
                  {t('opportunityDetail.datesLabel')}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-zinc-900" dir="ltr">{opp.availableDates.from} → {opp.availableDates.to}</p>
                {interest && <p className="text-xs text-zinc-500 mt-0.5">{t('opportunityDetail.interestLabel')}: {pick(interest)}</p>}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-zinc-200 p-6 shadow-2xs">
            <h2 className="font-display text-base sm:text-lg font-bold text-zinc-900 mb-3.5">{t('opportunityDetail.requirementsLabel')}</h2>
            <ul className="space-y-2.5">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-zinc-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:col-span-5 rounded-2xl bg-white border border-zinc-200 p-6 shadow-xs">
          <h2 className="font-display text-lg font-bold text-zinc-900 mb-2">{t('opportunityDetail.contactBoxTitle')}</h2>
          <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed mb-4">{t('opportunityDetail.contactBoxNote')}</p>
          <div className="rounded-xl bg-zinc-50 border border-zinc-200/80 p-4 mb-5 space-y-1">
            <span className="text-xs font-semibold text-zinc-400 block">{t('opportunityDetail.coordinatorLabel')}</span>
            <p className="font-display text-sm sm:text-base font-bold text-zinc-900">{pick(opp.contact.coordinator)}</p>
            <p className="text-xs font-mono text-zinc-600" dir="ltr">{opp.contact.email}</p>
            <p className="text-xs font-mono text-zinc-600" dir="ltr">{opp.contact.phone}</p>
          </div>
          <div className="flex flex-col gap-2.5">
            <a
              href={`mailto:${opp.contact.email}?subject=${encodeURIComponent(pick(opp.title))}`}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 hover:bg-teal-600 text-white px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{t('opportunityDetail.emailAction')}</span>
            </a>
            <a
              href={`tel:${opp.contact.phone.replace(/\s+/g, '')}`}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors"
            >
              <Phone className="w-4 h-4 text-teal-600" />
              <span>{t('opportunityDetail.callAction')}</span>
            </a>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <h2 className="font-display text-lg font-bold text-zinc-900 mb-4">{t('opportunityDetail.relatedTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/opportunities/${item.id}`}
                className="rounded-2xl bg-white border border-zinc-200 p-4 hover:border-teal-600/60 transition-all flex items-center justify-between gap-4"
              >
                <div>
                  <SectorTag sectorId={item.sector} short />
                  <h3 className="font-display text-sm font-bold text-zinc-900 mt-2">{pick(item.title)}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{pick(item.organization)}</p>
                </div>
                <ForwardArrow className="w-4 h-4 text-teal-600 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
