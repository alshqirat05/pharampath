'use client';

import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Bot, User, Send, RotateCcw, ExternalLink, ShieldAlert, HelpCircle } from 'lucide-react';
import { STARTER_PROMPTS } from '@/data/assistantPromptsSample';
import { useLanguage } from '@/context/LanguageProvider';

function getInitialMessage(lang) {
  return {
    id: 'welcome',
    role: 'assistant',
    content:
      lang === 'en'
        ? 'Hello! I am your Educational Drug Information Assistant. Click any suggested question above or type your pharmacology question below for a clear explanation and verified clinical references.'
        : 'أهلاً بك في المساعد التعليمي للمعلومات الدوائية. اختر أحد الأسئلة المقترحة أعلاه بنقرة واحدة، أو اكتب سؤالك الدوائي بالأسفل للحصول على شرح مبسط ومرتبط بالمراجع الرسمية.',
    references: [
      { title: 'DailyMed (NIH)', url: 'https://dailymed.nlm.nih.gov/dailymed/' },
      { title: 'JFDA (الأردن)', url: 'https://www.jfda.jo/' },
    ],
  };
}

export default function AssistantChatPanel() {
  const { t } = useTranslation('common');
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'ar';
  const counterRef = useRef(1);

  const [messages, setMessages] = useState(() => [getInitialMessage(lang)]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetChat = () => {
    setMessages([getInitialMessage(lang)]);
    setInput('');
  };

  const sendQuestion = async (questionText) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading) return;

    counterRef.current += 1;
    setMessages((prev) => [...prev, { id: `u-${counterRef.current}`, role: 'user', content: trimmed }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, language: lang }),
      });
      const data = await response.json();
      counterRef.current += 1;
      setMessages((prev) => [
        ...prev,
        { id: `a-${counterRef.current}`, role: 'assistant', content: data.reply || '—', references: data.references || [] },
      ]);
    } catch {
      counterRef.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${counterRef.current}`,
          role: 'assistant',
          content: lang === 'en' ? 'Unable to reach the educational assistant right now.' : 'تعذر الاتصال بالمساعد التعليمي حالياً.',
          references: [],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-xs overflow-hidden flex flex-col">
      <div className="px-5 py-4 bg-zinc-900 text-white flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-400/30 text-teal-300 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </span>
          <div>
            <p className="text-xs sm:text-sm font-bold">{t('assistantPage.title')}</p>
            <span className="text-[11px] text-teal-300">{t('assistantPage.sampleModeBadge')}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={resetChat}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t('assistantPage.clearChat')}</span>
        </button>
      </div>

      <div className="px-5 py-4 bg-zinc-50 border-b border-zinc-200/80">
        <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 mb-2.5">
          <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
          {t('assistantPage.starterTitle')}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {STARTER_PROMPTS[lang].map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendQuestion(prompt)}
              disabled={isLoading}
              className="text-start px-3.5 py-2 rounded-xl bg-white border border-zinc-200 text-xs font-medium text-zinc-700 hover:border-teal-600 hover:text-teal-700 transition-colors cursor-pointer disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div data-lenis-prevent className="p-5 space-y-4 min-h-[340px] max-h-[460px] overflow-y-auto bg-[#FAFAFA]">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${isUser ? 'bg-zinc-900 text-white' : 'bg-white border border-zinc-200 text-teal-600'}`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </span>

              <div className={`max-w-2xl rounded-2xl px-4 py-3 text-sm leading-relaxed ${isUser ? 'bg-zinc-900 text-white rounded-se-sm' : 'bg-white border border-zinc-200 text-zinc-800 rounded-ss-sm'}`}>
                <p>{msg.content}</p>
                {msg.references && msg.references.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-zinc-100">
                    <span className="block text-[11px] font-semibold text-zinc-400 mb-1.5">
                      {t('assistantDemo.referenceLabel')}:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {msg.references.map((ref) => (
                        <a
                          key={ref.title}
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200/80 text-xs font-semibold hover:bg-teal-600 hover:text-white transition-colors"
                        >
                          <span>{ref.title}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 px-2">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping" />
            <span>{t('assistantPage.thinking')}</span>
          </div>
        )}
      </div>

      <div className="px-5 py-2.5 bg-zinc-50 border-t border-zinc-200 flex items-center gap-2 text-xs text-zinc-600">
        <ShieldAlert className="w-4 h-4 text-teal-600 shrink-0" />
        <span>{t('disclaimer.text')}</span>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); sendQuestion(input); }}
        className="p-4 bg-white border-t border-zinc-200 flex items-center gap-2.5"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('assistantPage.inputPlaceholder')}
          className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-teal-600 focus:bg-white focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 hover:bg-teal-600 text-white px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">{t('assistantPage.sendButton')}</span>
        </button>
      </form>
    </div>
  );
}
