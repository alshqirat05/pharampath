'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { useLanguage } from '@/context/LanguageProvider';

export default function SiteHeader() {
  const { t } = useTranslation('common');
  const { language, toggleLanguage } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href);

  return (
    <header
      style={{ viewTransitionName: 'site-header' }}
      className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-[#99dcd2]/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="w-9 h-9 rounded-2xl bg-[#00a78e] text-white font-display font-bold text-base flex items-center justify-center tracking-tight group-hover:bg-[#006455] transition-colors shadow-xs">
            P
          </span>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg leading-none text-[#00211c] tracking-tight">
              {siteConfig.brandName}
            </span>
            <span className="text-[10px] font-medium text-[#006455] mt-0.5">
              {language === 'ar' ? 'التدريب الصيدلاني' : 'Pharmacy Practice'}
            </span>
          </div>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-1 bg-[#ccede8]/45 p-1 rounded-2xl border border-[#99dcd2]/70"
        >
          {siteConfig.navLinks.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`relative px-4 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                  active ? 'text-white font-semibold' : 'text-[#004339] hover:text-[#00a78e]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-[#00a78e] -z-10 shadow-xs"
                  />
                )}
                <span>{t(item.labelKey)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#004339] bg-[#ccede8]/60 hover:bg-[#99dcd2]/60 border border-[#99dcd2] transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#008672]" />
            <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          <Link
            href="/auth/login"
            className="hidden sm:inline-flex px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#004339] hover:bg-[#ccede8]/50 transition-colors"
          >
            {t('nav.login')}
          </Link>

          <Link
            href="/auth/register"
            className="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs font-semibold bg-[#00a78e] text-white hover:bg-[#008672] transition-colors shadow-xs"
          >
            {t('nav.register')}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label="Menu"
            className="lg:hidden p-2 rounded-xl border border-[#99dcd2] text-[#004339] hover:bg-[#ccede8]/50 cursor-pointer"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-t border-[#99dcd2] bg-white"
          >
            <div className="px-4 py-4 space-y-3">
              <nav aria-label="Mobile" className="flex flex-col gap-1">
                {siteConfig.navLinks.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                        active ? 'bg-[#00a78e] text-white' : 'text-[#004339] hover:bg-[#ccede8]/40'
                      }`}
                    >
                      <span>{t(item.labelKey)}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#ccede8]">
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl text-xs font-semibold border border-[#99dcd2] text-[#004339]"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl text-xs font-semibold bg-[#00a78e] text-white"
                >
                  {t('nav.register')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
