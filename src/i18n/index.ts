import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationRU from "./locales/ru/translation.json";
import translationEN from "./locales/en/translation.json";

const resources = {
  ru: { translation: translationRU },
  en: { translation: translationEN },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "ru", // стартовый язык
  fallbackLng: "ru", // запасной язык
  interpolation: { escapeValue: false },
});

export default i18n;
