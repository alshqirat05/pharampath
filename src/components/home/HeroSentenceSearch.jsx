'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Search, MapPin, Building2, Clock, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { SECTORS, CITIES, WORKING_HOURS_OPTIONS } from '@/data/sectorsConfig';
import HeroFloatingBackdrop from './HeroFloatingBackdrop';
import { useLanguage } from '@/context/LanguageProvider';

export default function HeroSentenceSearch() {
  const { t } = useTranslation('common');
  const { pick, isRTL } = useLanguage();
  const router = useRouter();
  const heroRef = useRef(null);

  const [city, setCity] = useState('');
  const [sector, setSector] = useState('');
  const [workingHours, setWorkingHours] = useState('');

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 110, damping: 26 });

  const heroScale = useTransform(smoothScroll, [0, 1], [1, 0.82]);
  const heroOpacity = useTransform(smoothScroll, [0, 0.95], [1, 0.2]);
  const heroY = useTransform(smoothScroll, [0, 1], [0, 70]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (sector) params.set('sector', sector);
    if (workingHours) params.set('workingHours', workingHours);
    const qs = params.toString();
    router.push(qs ? `/opportunities?${qs}` : '/opportunities');
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#ccede8]/65 via-[#f6fbfa] to-[#ccede8]/35 dark:from-[#061a16] dark:via-[#051411] dark:to-[#09221d] border-b border-[#99dcd2]/80 dark:border-[#1e403a] py-12 sm:py-16 lg:py-22"
    >
      <HeroFloatingBackdrop />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
          className="relative overflow-hidden rounded-[36px] bg-white/92 dark:bg-[#0b1e1b]/95 backdrop-blur-xl border-2 border-[#99dcd2] dark:border-[#1e403a] shadow-[0_24px_60px_-15px_rgba(0,67,57,0.16)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.6)] px-6 py-12 sm:px-12 sm:py-16 text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute -top-36 -end-36 w-80 h-80 rounded-full border border-dashed border-[#33b9a5]/40"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute -bottom-40 -start-40 w-96 h-96 rounded-full border border-[#f783ac]/30"
          />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ccede8] dark:bg-[#0f2924] text-[#004339] dark:text-[#99dcd2] border border-[#66cabb] dark:border-[#1e403a] text-xs font-bold">
                <motion.span
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-[#d6336c]"
                />
                {t('hero.badge')}
              </span>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#00211c] dark:text-white leading-[1.2] tracking-tight">
              {t('hero.title')}
            </h1>

            <p className="text-sm sm:text-base text-[#004339]/80 dark:text-[#99dcd2]/90 leading-relaxed max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>

            <form
              onSubmit={handleSubmit}
              role="search"
              className="bg-[#ccede8]/35 dark:bg-[#061a16]/70 rounded-3xl border border-[#99dcd2] dark:border-[#1e403a] p-4 sm:p-5 text-start mt-6 shadow-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3.5">
                <label className="block">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#004339] dark:text-[#ccede8] mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00a78e]" />
                    {t('hero.cityLabel')}
                  </span>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-2xl border border-[#99dcd2] dark:border-[#1e403a] bg-white dark:bg-[#0b1e1b] px-3.5 py-2.5 text-sm text-[#00211c] dark:text-white focus:border-[#00a78e] focus:outline-none"
                  >
                    <option value="">{t('hero.anyCity')}</option>
                    {CITIES.map((c) => (
                      <option key={c.id} value={c.id}>{pick(c.label)}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#004339] dark:text-[#ccede8] mb-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#d6336c]" />
                    {t('hero.sectorLabel')}
                  </span>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full rounded-2xl border border-[#99dcd2] dark:border-[#1e403a] bg-white dark:bg-[#0b1e1b] px-3.5 py-2.5 text-sm text-[#00211c] dark:text-white focus:border-[#00a78e] focus:outline-none"
                  >
                    <option value="">{t('hero.anySector')}</option>
                    {SECTORS.map((s) => (
                      <option key={s.id} value={s.id}>{pick(s.label)}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#004339] dark:text-[#ccede8] mb-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#00a78e]" />
                    {t('hero.hoursLabel')}
                  </span>
                  <select
                    value={workingHours}
                    onChange={(e) => setWorkingHours(e.target.value)}
                    className="w-full rounded-2xl border border-[#99dcd2] dark:border-[#1e403a] bg-white dark:bg-[#0b1e1b] px-3.5 py-2.5 text-sm text-[#00211c] dark:text-white focus:border-[#00a78e] focus:outline-none"
                  >
                    <option value="">{t('hero.anyHours')}</option>
                    {WORKING_HOURS_OPTIONS.map((wh) => (
                      <option key={wh.id} value={wh.id}>{pick(wh.label)}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#99dcd2]/70 dark:border-[#1e403a]">
                <Link
                  href="/assistant"
                  className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-[#006455] dark:text-[#99dcd2] hover:text-[#d6336c] py-1.5 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#d6336c]" />
                  <span>{t('hero.assistantBtn')}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#00a78e] hover:bg-[#008672] text-white px-7 py-2.5 text-sm font-bold shadow-sm transition-colors cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>{t('hero.searchBtn')}</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
