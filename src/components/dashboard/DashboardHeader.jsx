'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Compass, GraduationCap, LogOut, PencilLine } from 'lucide-react';
import { useLanguage } from '@/context/LanguageProvider';

export default function DashboardHeader({ profile, onEditProfile }) {
  const { t } = useTranslation('common');
  const { language } = useLanguage();
  const name = language === 'en' && profile.fullNameEn ? profile.fullNameEn : profile.fullName;
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('');

  const roleText =
    profile.role === 'coordinator' ? t('authPages.roleCoordinator') : t('authPages.roleStudent');

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#dcefea] bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5 dark:border-[#1e403a] dark:bg-[#0b1e1b]">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#00a78e] text-base font-bold text-white shadow-xs">
          {initials}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#00a78e]">{t('dashboard.pageLabel')}</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-[#cdebe5] bg-[#eef8f6] px-2.5 py-0.5 text-[11px] font-semibold text-[#006455] dark:border-[#1e403a] dark:bg-[#10291f] dark:text-[#99dcd2]">
              <GraduationCap className="h-3 w-3 text-[#00a78e]" />
              <span>{roleText}</span>
            </span>
          </div>
          <h1 className="mt-0.5 truncate text-lg font-bold text-[#00211c] dark:text-white sm:text-2xl">
            {t('dashboard.greeting', { name })}
          </h1>
          <p className="mt-0.5 text-xs text-[#4f6f69] dark:text-[#8fb8b0] sm:text-sm">
            {t('dashboard.subtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:shrink-0">
        <Link
          href="/opportunities"
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-[#00a78e] px-3.5 text-xs font-semibold text-white transition-colors hover:bg-[#008672] sm:px-4 sm:text-sm"
        >
          <Compass className="h-4 w-4 shrink-0" />
          <span className="truncate">{t('dashboard.actions.browse')}</span>
        </Link>
        <button
          type="button"
          onClick={onEditProfile}
          className="inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[#dcefea] bg-[#f8fcfb] px-3.5 text-xs font-semibold text-[#00211c] transition-colors hover:border-[#00a78e] hover:bg-[#eef8f6] dark:border-[#1e403a] dark:bg-[#0d231f] dark:text-white dark:hover:border-[#00a78e] sm:px-4 sm:text-sm"
        >
          <PencilLine className="h-4 w-4 shrink-0 text-[#00a78e]" />
          <span className="truncate">{t('dashboard.actions.edit')}</span>
        </button>
        <Link
          href="/auth/login"
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-[#dcefea] bg-white px-3.5 text-xs font-medium text-[#4f6f69] transition-colors hover:border-[#00a78e] hover:text-[#00211c] dark:border-[#1e403a] dark:bg-[#0b1e1b] dark:text-[#8fb8b0] dark:hover:text-white sm:px-4 sm:text-sm"
        >
          <LogOut className="h-4 w-4 shrink-0 rtl:-scale-x-100" />
          <span className="truncate">{t('dashboard.actions.logout')}</span>
        </Link>
      </div>
    </div>
  );
}
