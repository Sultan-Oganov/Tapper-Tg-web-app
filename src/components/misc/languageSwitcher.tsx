import { useTranslation } from "react-i18next";
import { useGameEvents } from "@/hooks/useGameEvents"; // добавляем

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const { changeLanguage: sendLanguageToServer } = useGameEvents();

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    sendLanguageToServer(lang);
  };
  return (
    <div
      className={
        "bg-white/[0.02] py-[13px] px-[12px] flex items-center gap-[8px] h-[54px]"
      }
    >
      <label>{t("language.title")}: </label>
      <select
        value={i18n.language}
        onChange={(e) => changeLang(e.target.value)}
        className="bg-gray-800 text-white p-1 rounded"
      >
        <option value="ru">{t("language.ru")}</option>
        <option value="en">{t("language.en")}</option>
      </select>
    </div>
  );
}
