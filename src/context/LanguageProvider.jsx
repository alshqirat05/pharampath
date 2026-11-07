'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { siteConfig } from '@/config/siteConfig';

const LanguageContext = createContext({
  language: 'ar',
  isRTL: true,
  isRtl: true,
  pick: (obj) => (obj ? obj.ar ?? obj.en ?? '' : ''),
  setLanguage: () => {},
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem(siteConfig.languageStorageKey);
      if (saved === 'ar' || saved === 'en') return saved;
    }
    return siteConfig.defaultLanguage;
  });

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    window.localStorage.setItem(siteConfig.languageStorageKey, language);
  }, [language]);

  const setLanguage = useCallback((nextLang) => {
    const normalized = nextLang === 'en' ? 'en' : 'ar';
    setLanguageState(normalized);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  const pick = useCallback(
    (bilingualObj) => {
      if (!bilingualObj) return '';
      if (typeof bilingualObj === 'string') return bilingualObj;
      return bilingualObj[language] ?? bilingualObj.ar ?? bilingualObj.en ?? '';
    },
    [language]
  );

  const isRTL = language === 'ar';

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider
        value={{
          language,
          isRTL,
          isRtl: isRTL,
          pick,
          setLanguage,
          toggleLanguage,
        }}
      >
        {children}
      </LanguageContext.Provider>
    </I18nextProvider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
