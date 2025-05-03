import { useTranslation } from "react-i18next";

export default function CrashStep() {
  const { t } = useTranslation();
  return (
    <>
      <div className={"info_card blue-background"}>
        <div className={"join_card_top w-3/5"}>
          <h3>{t("faq.steps.step1.title")}</h3>
          <p>{t("faq.steps.step1.desc")}</p>
        </div>
        <div className={"info_card_image"}>
          <img className={"h-[55px]"} src={"/media/images/info_step1.png"} />
        </div>
      </div>

      <div className={"info_card blue-background"}>
        <div className={"join_card_top w-3/5"}>
          <h3>{t("faq.steps.step2.title")}</h3>
          <p>{t("faq.steps.step2.desc")}</p>
        </div>
        <div className={"info_card_image"}>
          <img className={"h-[173px]"} src={"/media/images/info_step2.png"} />
        </div>
      </div>

      <div className={"info_card blue-background"}>
        <div className={"join_card_top w-3/5"}>
          <h3>{t("faq.steps.step3.title")}</h3>
          <p>{t("faq.steps.step3.desc")}</p>
        </div>
        <div className={"info_card_image"}>
          <img className={"h-[55px]"} src={"/media/images/info_step3.png"} />
        </div>
      </div>
    </>
  );
}
