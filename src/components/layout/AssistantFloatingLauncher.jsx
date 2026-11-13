'use client';

import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'motion/react';
import { MessageSquareText, X } from 'lucide-react';
import AssistantChatPanel from '@/components/assistant/AssistantChatPanel';
import { useAssistantWidget } from '@/context/AssistantWidgetContext';
import { useLanguage } from '@/context/LanguageProvider';
import { useReducedMotionSafe } from '@/motion/useReducedMotionSafe';

export default function AssistantFloatingLauncher() {
  const { t } = useTranslation('common');
  const { language } = useLanguage();
  const { isOpen, toggleAssistant, closeAssistant } = useAssistantWidget();
  const reduced = useReducedMotionSafe();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="assistant-widget-popup"
            role="dialog"
            aria-label={t('assistantPage.title')}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: 'min(430px, calc(100dvh - 6.5rem))' }}
            className="fixed bottom-20 end-4 sm:end-6 z-50 w-[calc(100vw-2rem)] sm:w-[370px]"
          >
            <AssistantChatPanel variant="widget" onClose={closeAssistant} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-5 end-4 sm:end-6 z-50"
      >
        <button
          type="button"
          onClick={toggleAssistant}
          aria-expanded={isOpen}
          aria-label={
            isOpen
              ? language === 'en'
                ? 'Close Drug Assistant'
                : 'إغلاق المساعد الدوائي'
              : t('nav.assistant')
          }
          className={`inline-flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
            isOpen
              ? 'w-12 h-12 rounded-full bg-[#00211c] dark:bg-[#0b1e1b] text-white border border-[#a70019]/60 hover:bg-[#a70019] hover:border-[#a70019] shadow-lg shadow-[#004339]/25'
              : 'px-5 py-3 rounded-full bg-[#a70019] text-white border border-[#c41e37] hover:bg-[#8a0015] hover:scale-105 text-xs sm:text-sm font-semibold shadow-lg shadow-[#a70019]/25'
          }`}
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-[#fde8eb] animate-pulse" />
              <MessageSquareText className="w-4 h-4 shrink-0 text-white" />
              <span>{t('nav.assistant')}</span>
            </>
          )}
        </button>
      </motion.div>
    </>
  );
}
