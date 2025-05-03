import CrashStep from "@/components/misc/faq/crashStep";
import DisclosureFAQ from "@/components/misc/faq/disclosure";
import { useTranslation } from "react-i18next";

export default function FAQ() {
  const { t } = useTranslation();
  return (
    <div className={"px-[20px]"}>
      <div className={"sections_taper"}>
        <div className={"info_card_play blue-background"}>
          <div className={"join_card_top w-3/5"}>
            <h3>{t("faq.how_to_play")}</h3>
            <p>{t("faq.how_to_play_desc")}</p>
          </div>
          <div className={"info_card_image_play"}>
            <img src={"/media/images/info_how-play.png"} alt={"info"} />
          </div>
        </div>

        <div className={"down_taps"}>
          <div className={"down_taps_card py-[8px]"}>{t("faq.tabs.crash")}</div>
          <div className={"down_taps_card py-[8px]"}>{t("faq.tabs.tap")}</div>
        </div>

        <CrashStep />
      </div>

      <div className={"faq"}>
        <div className="fag_title">{t("faq.title")}</div>
        <div className="fag_questions">
          <DisclosureFAQ />
        </div>
      </div>

      <button className={"back_button py-[14px]"}>
        {t("faq.back_to_game")}
      </button>
    </div>
  );
}
