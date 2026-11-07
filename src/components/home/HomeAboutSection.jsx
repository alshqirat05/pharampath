'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Layers, BookOpenCheck, PhoneCall, ArrowLeft, ArrowRight, Building2 } from 'lucide-react';
import { SECTORS } from '@/data/sectorsConfig';
import scientistIllustration from '@/imgs/undraw_scientist_5td0.svg';
import { useLanguage } from '@/context/LanguageProvider';

export default function HomeAboutSection() {
  const { t } = useTranslation('common');
  const { pick, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const pillars = [
    {
      icon: Layers,
      iconBg: 'bg-[#00a78e] text-white',
      title: t('homeAbout.pillar1Title'),
      desc: t('homeAbout.pillar1Desc'),
    },
    {
      icon: BookOpenCheck,
      iconBg: 'bg-[#d6336c] text-white',
      title: t('homeAbout.pillar2Title'),
      desc: t('homeAbout.pillar2Desc'),
    },
    {
      icon: PhoneCall,
      iconBg: 'bg-[#006455] text-white',
      title: t('homeAbout.pillar3Title'),
      desc: t('homeAbout.pillar3Desc'),
    },
  ];

  const nodePositions = [
    'top-3 start-4',
    'top-3 end-4',
    'bottom-3 start-4',
    'bottom-3 end-4',
  ];

  return (
    <section className="py-20 lg:py-26 bg-white border-b border-[#99dcd2]/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Self-Running Orbital Animation with undraw_scientist_5td0.svg */}
          <div className="lg:col-span-5">
            <div className="relative h-84 sm:h-96 rounded-3xl bg-[#ccede8]/35 border border-[#99dcd2] p-6 flex items-center justify-center overflow-hidden shadow-xs">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                className="absolute w-68 h-68 rounded-full border-2 border-dashed border-[#33b9a5]/60"
              />

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="absolute w-52 h-52 rounded-full border border-[#66cabb]"
              >
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#00a78e] shadow-sm" />
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#d6336c] shadow-sm" />
              </motion.div>

              <motion.div
                animate={{ scale: [0.85, 1.5], opacity: [0.45, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
                className="absolute w-36 h-36 rounded-full border-2 border-[#00a78e]/45 pointer-events-none"
              />

              {/* Central Scientist SVG Illustration (undraw_scientist_5td0.svg) */}
              <motion.div
                animate={{ y: [-7, 7, -7], scale: [1, 1.04, 1] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center"
              >
                <Image
                  src={scientistIllustration}
                  alt="PharmaPath Scientist Illustration"
                  className="w-full h-full object-contain drop-shadow-md"
                  priority
                />
              </motion.div>

              {SECTORS.map((s, idx) => {
                const isNahdiNode = idx === 1;
                return (
                  <motion.div
                    key={s.id}
                    animate={{
                      y: idx % 2 === 0 ? [-6, 6, -6] : [6, -6, 6],
                    }}
                    transition={{
                      duration: 3.2 + idx * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className={`absolute ${nodePositions[idx]} z-20 rounded-2xl bg-white/95 backdrop-blur-xs border ${
                      isNahdiNode ? 'border-[#fbcfe8]' : 'border-[#99dcd2]'
                    } px-3 py-2 shadow-sm flex items-center gap-2`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                        isNahdiNode
                          ? 'bg-[#fce7f3] text-[#d6336c]'
                          : 'bg-[#ccede8] text-[#006455]'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <span className="block text-[10px] font-mono text-[#008672] leading-none">
                        {s.index}
                      </span>
                      <span className="text-xs font-bold text-[#00211c]">
                        {pick(s.shortLabel)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Platform Idea & 3 Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="inline-block text-xs font-bold text-[#004339] bg-[#ccede8] border border-[#99dcd2] px-3.5 py-1 rounded-full mb-3">
                {t('homeAbout.badge')}
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#00211c] leading-snug mb-3">
                {t('homeAbout.title')}
              </h2>
              <p className="text-sm sm:text-base text-[#004339]/80 leading-relaxed">
                {t('homeAbout.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.6,
                      ease: 'easeInOut',
                    }}
                    className="rounded-2xl bg-[#ccede8]/25 border border-[#99dcd2] p-4 flex flex-col justify-between gap-3"
                  >
                    <span className={`w-10 h-10 rounded-xl ${pillar.iconBg} flex items-center justify-center shadow-xs`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-sm sm:text-base text-[#00211c] mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[#004339]/80 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#00a78e] hover:bg-[#008672] text-white px-6 py-3 text-xs sm:text-sm font-bold shadow-xs transition-colors"
              >
                <span>{t('homeAbout.moreBtn')}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
