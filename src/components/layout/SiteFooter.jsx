'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Mail, Globe } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { useLanguage } from '@/context/LanguageProvider';

export default function SiteFooter() {
  const { t } = useTranslation('common');
  const { toggleLanguage } = useLanguage();

  return (
    <footer role="contentinfo" className="mt-auto bg-[#00211c] dark:bg-[#04120f] text-[#ccede8] border-t border-[#004339] dark:border-[#09221d] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-8 border-b border-[#004339] dark:border-[#09221d]">
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-[#00a78e] text-white font-display font-bold text-sm flex items-center justify-center">
                P
              </span>
              <span className="font-display font-bold text-base text-white">
                {siteConfig.brandName}
              </span>
            </div>
            <p className="text-sm text-[#99dcd2] leading-relaxed max-w-md">
              {t('footer.description')}
            </p>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#33b9a5] mb-3">
              {t('footer.quickLinks')}
            </h3>
            <ul className="grid grid-cols-2 gap-2.5 text-sm text-[#ccede8]">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#33b9a5] transition-colors">
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#33b9a5]">
              {t('footer.contactTitle')}
            </h3>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex items-center gap-2 text-sm text-[#ccede8] hover:text-white transition-colors"
              dir="ltr"
            >
              <Mail className="w-4 h-4 text-[#33b9a5] shrink-0" />
              <span>{siteConfig.contactEmail}</span>
            </a>
            <div>
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#006455] bg-[#004339] hover:bg-[#006455] text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#33b9a5]" />
                <span>{t('footer.languageBtn')}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 text-xs text-[#66cabb] leading-relaxed">
          <p>{t('disclaimer.text')}</p>
        </div>
      </div>
    </footer>
  );
}
