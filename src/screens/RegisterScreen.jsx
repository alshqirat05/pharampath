'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';
import { SECTORS, CITIES } from '@/data/sectorsConfig';
import InputField from '@/components/ui/InputField';
import { useLanguage } from '@/context/LanguageProvider';

export default function RegisterScreen() {
  const { t } = useTranslation('common');
  const { pick } = useLanguage();

  const [role, setRole] = useState('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('amman');
  const [sector, setSector] = useState('community');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-[85vh] bg-[#FAFAFA] py-14 sm:py-20 flex items-center">
      <div className="mx-auto w-full max-w-lg px-4 sm:px-6">
        <div className="rounded-2xl border border-zinc-200 bg-white p-7 sm:p-8 shadow-xs">
          <h1 className="font-display text-2xl font-bold text-zinc-900 mb-2">
            {t('authPages.registerTitle')}
          </h1>
          <p className="text-sm text-zinc-500 mb-6">{t('authPages.registerSubtitle')}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="block text-xs font-semibold text-zinc-800 mb-1.5">
                {t('authPages.roleLabel')}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`rounded-xl border p-3 text-start transition-all cursor-pointer ${
                    role === 'student'
                      ? 'bg-zinc-900 border-zinc-900 text-white'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                  }`}
                >
                  <span className="block text-xs font-bold">{t('authPages.roleStudent')}</span>
                  <span className="block text-[11px] opacity-80 mt-0.5">{t('authPages.roleStudentDesc')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('coordinator')}
                  className={`rounded-xl border p-3 text-start transition-all cursor-pointer ${
                    role === 'coordinator'
                      ? 'bg-zinc-900 border-zinc-900 text-white'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                  }`}
                >
                  <span className="block text-xs font-bold">{t('authPages.roleCoordinator')}</span>
                  <span className="block text-[11px] opacity-80 mt-0.5">{t('authPages.roleCoordinatorDesc')}</span>
                </button>
              </div>
            </div>

            <InputField
              id="register-name"
              label={t('authPages.fullNameLabel')}
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <InputField
              id="register-email"
              type="email"
              label={t('authPages.emailLabel')}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <label className="block">
                <span className="block text-xs font-semibold text-zinc-800 mb-1.5">{t('authPages.cityLabel')}</span>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 focus:border-teal-600 focus:bg-white focus:outline-none"
                >
                  {CITIES.map((c) => (
                    <option key={c.id} value={c.id}>{pick(c.label)}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="block text-xs font-semibold text-zinc-800 mb-1.5">{t('authPages.sectorLabel')}</span>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 focus:border-teal-600 focus:bg-white focus:outline-none"
                >
                  {SECTORS.map((s) => (
                    <option key={s.id} value={s.id}>{pick(s.label)}</option>
                  ))}
                </select>
              </label>
            </div>

            <InputField
              id="register-password"
              type="password"
              label={t('authPages.passwordLabel')}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {submitted && (
              <div className="rounded-xl bg-teal-50 border border-teal-200 p-3 flex items-center gap-2 text-xs font-medium text-teal-900">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{t('authPages.sampleNotice')}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-zinc-900 hover:bg-teal-600 text-white py-3 text-sm font-semibold transition-colors cursor-pointer"
            >
              {t('authPages.registerSubmit')}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-zinc-100 text-xs text-zinc-500 flex items-center justify-between">
            <span>{t('authPages.switchToLogin')}</span>
            <Link href="/auth/login" className="font-semibold text-teal-700 hover:underline">
              {t('authPages.loginSubmit')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
