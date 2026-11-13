'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import {
  Bot,
  User,
  Send,
  RotateCcw,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  X,
  BookOpen,
} from 'lucide-react';
import { STARTER_PROMPTS } from '@/data/assistantPromptsSample';
import { useLanguage } from '@/context/LanguageProvider';

function getInitialMessage(lang) {
  return {
    id: 'welcome',
    role: 'assistant',
    content:
      lang === 'en'
        ? 'Hello! I am your Educational Drug Information Assistant. Pick a suggested question below or type your pharmacology question for a clear explanation and clinical references.'
        : 'أهلاً بك في المساعد التعليمي للمعلومات الدوائية. اختر سؤالاً مقترحاً بالأسفل أو اكتب سؤالك الدوائي للحصول على شرح مبسط مع المراجع الرسمية.',
    references: [
      { title: 'DailyMed (NIH)', url: 'https://dailymed.nlm.nih.gov/dailymed/' },
      { title: 'JFDA (الأردن)', url: 'https://www.jfda.jo/' },
    ],
  };
}

export default function AssistantChatPanel({ variant = 'widget', onClose }) {
  const { t } = useTranslation('common');
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'ar';
  const isWidget = variant === 'widget';
  const counterRef = useRef(1);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [chatMessages, setChatMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showStarters, setShowStarters] = useState(true);

  const messages = [getInitialMessage(lang), ...chatMessages];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [chatMessages.length, isLoading]);

  useEffect(() => {
    if (isWidget) {
      const timer = setTimeout(() => inputRef.current?.focus(), 180);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isWidget]);

  const resetChat = () => {
    setChatMessages([]);
    setInput('');
    setShowStarters(true);
  };

  const sendQuestion = async (questionText) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading) return;

    counterRef.current += 1;
    setChatMessages((prev) => [
      ...prev,
      { id: `u-${counterRef.current}`, role: 'user', content: trimmed },
    ]);
    setInput('');
    setShowStarters(false);
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, language: lang }),
      });
      const data = await response.json();
      counterRef.current += 1;
      setChatMessages((prev) => [
        ...prev,
        {
          id: `a-${counterRef.current}`,
          role: 'assistant',
          content: data.reply || '—',
          references: data.references || [],
        },
      ]);
    } catch {
      counterRef.current += 1;
      setChatMessages((prev) => [
        ...prev,
        {
          id: `e-${counterRef.current}`,
          role: 'assistant',
          content:
            lang === 'en'
              ? 'Unable to reach the educational assistant right now.'
              : 'تعذر الاتصال بالمساعد التعليمي حالياً.',
          references: [],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`border border-[#99dcd2] dark:border-[#1e403a] bg-white dark:bg-[#0b1e1b] overflow-hidden flex flex-col ${
        isWidget ? 'h-full rounded-3xl shadow-2xl shadow-[#00211c]/20' : 'rounded-2xl shadow-xs'
      }`}
    >
      {/* Header */}
      <div
        className={`bg-[#00211c] dark:bg-[#04120f] text-white flex items-center justify-between gap-2 border-b border-[#004339] shrink-0 ${
          isWidget ? 'px-4 py-3' : 'px-5 py-4'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-8 h-8 rounded-xl bg-[#a70019] border border-[#c41e37] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Bot className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-bold truncate">
              {isWidget ? t('nav.assistant') : t('assistantPage.title')}
            </p>
            <span className="text-[11px] text-[#f3b8c1] block truncate">
              {t('assistantPage.sampleModeBadge')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <Link
            href="/references"
            onClick={onClose}
            title={t('nav.references')}
            aria-label={t('nav.references')}
            className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-[#99dcd2] hover:text-white transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setShowStarters((prev) => !prev)}
            title={t('assistantPage.starterTitle')}
            aria-label={t('assistantPage.starterTitle')}
            className={`inline-flex items-center justify-center w-8 h-8 rounded-xl transition-colors cursor-pointer ${
              showStarters
                ? 'bg-[#a70019] text-white'
                : 'bg-white/10 hover:bg-white/20 text-[#99dcd2] hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={resetChat}
            title={t('assistantPage.clearChat')}
            aria-label={t('assistantPage.clearChat')}
            className="inline-flex items-center gap-1.5 px-2.5 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {!isWidget && <span>{t('assistantPage.clearChat')}</span>}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label={lang === 'en' ? 'Close assistant' : 'إغلاق المساعد'}
              className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white/10 hover:bg-[#a70019] text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Chat Messages */}
      <div
        data-lenis-prevent
        className={`flex-1 min-h-0 overflow-y-auto bg-[#f6fbfa] dark:bg-[#051411] ${
          isWidget ? 'p-3 space-y-2.5' : 'p-5 space-y-4 min-h-[340px] max-h-[460px]'
        }`}
      >
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <span
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  isUser
                    ? 'bg-[#00a78e] text-white'
                    : 'bg-[#fde8eb] dark:bg-[#3d0009]/40 border border-[#f3b8c1] dark:border-[#7a0012]/60 text-[#a70019] dark:text-[#ff6b81]'
                }`}
              >
                {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </span>

              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-[#004339] text-white rounded-se-sm'
                    : 'bg-white dark:bg-[#0b1e1b] border border-[#99dcd2] dark:border-[#1e403a] text-[#00211c] dark:text-[#e8f7f4] rounded-ss-sm'
                }`}
              >
                <p>{msg.content}</p>
                {msg.references && msg.references.length > 0 && (
                  <div className="mt-2 pt-1.5 border-t border-[#ccede8] dark:border-[#1e403a]">
                    <span className="block text-[10px] font-semibold text-[#006455] dark:text-[#99dcd2] mb-1">
                      {t('assistantDemo.referenceLabel')}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.references.map((ref) => (
                        <a
                          key={ref.title}
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#ccede8]/70 dark:bg-[#061a16] text-[#004339] dark:text-[#99dcd2] border border-[#99dcd2] dark:border-[#1e403a] text-[10px] font-semibold hover:bg-[#a70019] hover:border-[#a70019] hover:text-white transition-colors"
                        >
                          <span>{ref.title}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {showStarters && (
          <div className="rounded-xl bg-white dark:bg-[#0b1e1b] border border-[#99dcd2]/80 dark:border-[#1e403a] p-2.5 space-y-1.5">
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#004339] dark:text-[#ccede8]">
              <HelpCircle className="w-3 h-3 text-[#a70019] dark:text-[#ff6b81]" />
              {t('assistantPage.starterTitle')}
            </span>
            <div className="flex flex-col gap-1">
              {STARTER_PROMPTS[lang].map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendQuestion(prompt)}
                  disabled={isLoading}
                  className="text-start px-2.5 py-1.5 rounded-lg bg-[#f6fbfa] dark:bg-[#061a16] border border-[#99dcd2]/80 dark:border-[#1e403a] text-[11px] font-medium text-[#004339] dark:text-[#ccede8] hover:border-[#a70019] hover:text-[#a70019] dark:hover:border-[#ff6b81] dark:hover:text-[#ff6b81] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-semibold text-[#a70019] dark:text-[#ff6b81] px-2">
            <span className="w-2 h-2 rounded-full bg-[#a70019] animate-ping" />
            <span>{t('assistantPage.thinking')}</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Educational Disclaimer */}
      <div className="px-3 py-1.5 bg-[#ccede8]/20 dark:bg-[#061a16] border-t border-[#99dcd2]/70 dark:border-[#1e403a] flex items-center gap-1.5 text-[10px] text-[#004339] dark:text-[#99dcd2] shrink-0">
        <ShieldAlert className="w-3 h-3 text-[#a70019] shrink-0" />
        <span className="truncate">{t('disclaimer.text')}</span>
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendQuestion(input);
        }}
        className="p-2.5 bg-white dark:bg-[#0b1e1b] border-t border-[#99dcd2] dark:border-[#1e403a] flex items-center gap-2 shrink-0"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('assistantPage.inputPlaceholder')}
          className="flex-1 min-w-0 rounded-xl border border-[#99dcd2] dark:border-[#1e403a] bg-[#f6fbfa] dark:bg-[#061a16] px-3 py-2 text-xs sm:text-sm text-[#00211c] dark:text-white placeholder:text-[#004339]/55 dark:placeholder:text-[#99dcd2]/50 focus:border-[#a70019] focus:bg-white dark:focus:bg-[#061a16] focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          aria-label={t('assistantPage.sendButton')}
          className="inline-flex items-center justify-center rounded-xl bg-[#a70019] hover:bg-[#8a0015] text-white w-9 h-9 transition-colors disabled:opacity-50 cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
