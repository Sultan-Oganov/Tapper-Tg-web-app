import { useTranslation } from "react-i18next";

export default function CheckForm() {
  const { t } = useTranslation();
  return (
    <div className={"sections_taper mb-[12px]"}>
      <div className={"check_form red-background"}>
        <div className={"check_form_title pl-[9px]"}>
          {t("check.subtitle")}&nbsp;
          <span>({t("check.hash_type")})</span>
        </div>

        <div className={"check_form_bot"}>
          <input type="text" placeholder={t("check.input_placeholder")} />
          <button className={"py-[14px]"}>{t("check.check_button")}</button>
          <div className={"check_form_image"}>
            <img src={"/media/images/policeman.png"} />
          </div>
        </div>
      </div>
    </div>
  );
}
