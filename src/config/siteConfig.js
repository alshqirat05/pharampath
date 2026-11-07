/**
 * Site-wide configuration.
 * BRAND_NAME is the single constant for the brand name across the app.
 */

export const BRAND_NAME = 'PharmaPath';

export const siteConfig = {
  brandName: BRAND_NAME,
  contactEmail: 'info@pharmapath.edu.jo',
  defaultLanguage: 'ar',
  supportedLanguages: ['ar', 'en'],
  languageStorageKey: 'pharmapath-language',

  navLinks: [
    { labelKey: 'nav.home', href: '/' },
    { labelKey: 'nav.opportunities', href: '/opportunities' },
    { labelKey: 'nav.assistant', href: '/assistant' },
    { labelKey: 'nav.references', href: '/references' },
    { labelKey: 'nav.about', href: '/about' },
  ],
};
