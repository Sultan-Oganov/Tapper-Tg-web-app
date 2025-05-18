import { useTranslation } from "react-i18next";
import { useGameEvents } from "@/hooks/useGameEvents";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const { changeLanguage: sendLanguageToServer } = useGameEvents();

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    sendLanguageToServer(lang);
  };

  const currentLang = i18n.language;

  return (
    <div className="relative">
      <select
        value={currentLang}
        onChange={(e) => changeLang(e.target.value)}
        className="w-full bg-white/[0.02] text-white h-[54px] px-[12px] rounded appearance-none flex items-center outline-none"
      >
        <option value="ru">{t("language.ru")}</option>
        <option value="en">{t("language.en")}</option>
      </select>

      <div className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2">
        <img
          src="/media/icons/arrow.svg"
          alt="arrow"
          className="w-4 h-4 rotate-90"
        />
      </div>
    </div>
  );
}
