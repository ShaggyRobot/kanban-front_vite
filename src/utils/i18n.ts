import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: localStorage.getItem('i18nextLng') ?? 'ru',
    fallbackLng: 'en',
    debug: false,
    detection: {
      order: ['query-string', 'cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
