import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./Locale/en.json";
import translationAr from "./Locale/ar.json";

const resources = {
  en: {
    translation: translationEn,
  },
  ar: {
    translation: translationAr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
