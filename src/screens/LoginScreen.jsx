'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';
import InputField from '@/components/ui/InputField';

export default function LoginScreen() {
  const { t } = useTranslation('common');
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-[82vh] bg-[#FAFAFA] py-14 sm:py-20 flex items-center">
      <div className="mx-auto w-full max-w-md px-4 sm:px-6">
        <div className="rounded-2xl border border-zinc-200 bg-white p-7 sm:p-8 shadow-xs">
          <h1 className="font-display text-2xl font-bold text-zinc-900 mb-2">
            {t('authPages.loginTitle')}
          </h1>
          <p className="text-sm text-zinc-500 mb-6">{t('authPages.loginSubtitle')}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="block text-xs font-semibold text-zinc-800 mb-1.5">
                {t('authPages.roleLabel')}
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`rounded-xl border py-2.5 px-3 text-xs font-semibold transition-all cursor-pointer ${
                    role === 'student'
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-zinc-50 text-zinc-700 border-zinc-200'
                  }`}
                >
                  {t('authPages.roleStudent')}
                </button>
                <button
                  type="button"
                  onClick={() => setRole('coordinator')}
                  className={`rounded-xl border py-2.5 px-3 text-xs font-semibold transition-all cursor-pointer ${
                    role === 'coordinator'
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-zinc-50 text-zinc-700 border-zinc-200'
                  }`}
                >
                  {t('authPages.roleCoordinator')}
                </button>
              </div>
            </div>

            <InputField
              id="login-email"
              type="email"
              label={t('authPages.emailLabel')}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
              id="login-password"
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
              {t('authPages.loginSubmit')}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-zinc-100 text-xs text-zinc-500 flex items-center justify-between">
            <span>{t('authPages.switchToRegister')}</span>
            <Link href="/auth/register" className="font-semibold text-teal-700 hover:underline">
              {t('authPages.registerSubmit')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
