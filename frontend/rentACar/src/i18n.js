import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '/src/locales/en-US/translation.json';
import translationTR from '/src/locales/tr-TR/translation.json';

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
    lng: localStorage.getItem("lang"), // Default dil
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react için gerekli
    }
  });

export default i18n;
