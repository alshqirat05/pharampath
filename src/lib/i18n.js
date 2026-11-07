import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import arCommon from '../locales/ar/common.json';
import enCommon from '../locales/en/common.json';

const resources = {
  ar: { common: arCommon },
  en: { common: enCommon },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar',
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common'],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

export const getDir = (lang) => {
  return lang === 'ar' ? 'rtl' : 'ltr';
};

