import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '../public/locales/en-EN/translation.json';
import translationTR from '../public/locales/tr-TR/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  tr: {
    translation: translationTR
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr', // Default dil
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false // react için gerekli
    }
  });

export default i18n;
