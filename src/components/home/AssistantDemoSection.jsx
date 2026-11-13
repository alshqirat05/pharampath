'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { MessageSquareText, BookOpen, ShieldAlert, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
import { DEMO_QA } from '@/data/assistantPromptsSample';
import Robot3DAvatar from './Robot3DAvatar';
import { useLanguage } from '@/context/LanguageProvider';
import { useAssistantWidget } from '@/context/AssistantWidgetContext';

export default function AssistantDemoSection() {
  const { t } = useTranslation('common');
  const { language, isRTL } = useLanguage();
  const { openAssistant } = useAssistantWidget();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const items = DEMO_QA[language === 'en' ? 'en' : 'ar'];
  const current = items[selectedIndex] || items[0];
  const fullAnswer = current.answer || '';
  const isTyping = charCount < fullAnswer.length;
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    if (charCount < fullAnswer.length) {
      const timer = setTimeout(() => {
        setCharCount((prev) => Math.min(fullAnswer.length, prev + 2));
      }, 22);
      return () => clearTimeout(timer);
    }

    const cycleTimer = setTimeout(() => {
      setSelectedIndex((prev) => (prev + 1) % items.length);
      setCharCount(0);
    }, 5200);

    return () => clearTimeout(cycleTimer);
  }, [charCount, fullAnswer, items.length]);

  const handleSelectQuestion = (idx) => {
    setSelectedIndex(idx);
    setCharCount(0);
  };

  return (
    <section className="py-20 lg:py-26 bg-white dark:bg-[#051411] border-b border-[#99dcd2]/70 dark:border-[#1e403a] overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004339] dark:text-[#99dcd2] bg-[#ccede8] dark:bg-[#0b1e1b] border border-[#99dcd2] dark:border-[#1e403a] px-3.5 py-1 rounded-full">
              <MessageSquareText className="w-3.5 h-3.5 text-[#00a78e]" />
              {t('assistantDemo.badge')}
            </span>
            <span className="text-xs font-bold text-[#7a0012] dark:text-[#ff6b81] bg-[#fde8eb] dark:bg-[#3d0009]/30 border border-[#f3b8c1] dark:border-[#7a0012] px-3 py-1 rounded-full">
              {t('assistantDemo.demoTag')}
            </span>
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#00211c] dark:text-white mb-2">
            {t('assistantDemo.title')}
          </h2>
          <p className="text-sm sm:text-base text-[#004339]/80 dark:text-[#99dcd2]/80 leading-relaxed">
            {t('assistantDemo.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Autonomous 3D Moving Robot + Starter Questions */}
          <div className="lg:col-span-5 rounded-3xl bg-[#ccede8]/30 dark:bg-[#061a16] border border-[#99dcd2] dark:border-[#1e403a] p-6 flex flex-col justify-between">
            <div>
              <Robot3DAvatar isTyping={isTyping} />

              <h3 className="text-xs font-bold uppercase tracking-wider text-[#006455] dark:text-[#99dcd2] mb-3 mt-2">
                {t('assistantDemo.questionsHeading')}
              </h3>
              <div className="space-y-2">
                {items.map((item, idx) => {
                  const active = idx === selectedIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectQuestion(idx)}
                      className={`w-full text-start px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#00a78e] text-white border-[#00a78e] font-bold shadow-xs'
                          : 'bg-white dark:bg-[#0b1e1b] text-[#00211c] dark:text-[#e8f7f4] border-[#99dcd2] dark:border-[#1e403a] hover:border-[#00a78e]'
                      }`}
                    >
                      {item.question}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#99dcd2] dark:border-[#1e403a] flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={openAssistant}
                className="inline-flex items-center gap-2 rounded-xl bg-[#a70019] hover:bg-[#8a0015] text-white px-5 py-2.5 text-xs sm:text-sm font-bold transition-colors cursor-pointer shadow-xs"
              >
                <span>{t('assistantDemo.cta')}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
              <Link
                href="/references"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006455] dark:text-[#99dcd2] hover:text-[#a70019] px-2 py-2 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-[#a70019]" />
                <span>{t('assistantDemo.referencesCta')}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Static Card with Live Auto-Typing Chat Conversation */}
          <div className="lg:col-span-7 rounded-3xl border border-[#99dcd2] dark:border-[#1e403a] bg-[#ccede8]/25 dark:bg-[#061a16] p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex justify-end">
                <div className="max-w-xl rounded-2xl rounded-ee-sm bg-[#004339] dark:bg-[#004339]/80 text-white px-4 py-3.5">
                  <span className="block text-[11px] font-semibold text-[#66cabb] mb-1">
                    {t('assistantDemo.studentLabel')}
                  </span>
                  <p className="text-sm font-medium">{current.question}</p>
                </div>
              </div>

              <div className="rounded-2xl rounded-es-sm bg-white dark:bg-[#0b1e1b] border border-[#99dcd2] dark:border-[#1e403a] p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a70019] dark:text-[#ff6b81]">
                    <MessageSquareText className="w-3.5 h-3.5" />
                    {t('assistantDemo.assistantLabel')}
                  </span>
                  {isTyping && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#a70019]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a70019] animate-ping" />
                      {t('assistantPage.thinking')}
                    </span>
                  )}
                </div>

                <p className="text-sm sm:text-base text-[#00211c] dark:text-[#e8f7f4] leading-relaxed min-h-[5.5rem] mb-4">
                  {fullAnswer.slice(0, charCount)}
                  {isTyping && (
                    <span className="inline-block w-1.5 h-4 ms-1 align-middle bg-[#a70019] animate-pulse" />
                  )}
                </p>

                <div className="pt-3 border-t border-[#ccede8] dark:border-[#1e403a]">
                  <span className="block text-xs font-bold text-[#006455] dark:text-[#99dcd2] mb-2">
                    {t('assistantDemo.referenceLabel')}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {current.references.map((ref) => (
                      <a
                        key={ref.name}
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#ccede8]/70 dark:bg-[#061a16] border border-[#99dcd2] dark:border-[#1e403a] text-xs font-bold text-[#004339] dark:text-[#99dcd2] hover:bg-[#00a78e] hover:text-white transition-colors"
                      >
                        <span>{ref.name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-white dark:bg-[#0b1e1b] border border-[#99dcd2] dark:border-[#1e403a] px-4 py-3 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-[#a70019] shrink-0 mt-0.5" />
              <p className="text-xs text-[#004339] dark:text-[#99dcd2] leading-relaxed">
                <strong className="font-bold text-[#00211c] dark:text-white">{t('disclaimer.label')}: </strong>
                {t('disclaimer.text')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
