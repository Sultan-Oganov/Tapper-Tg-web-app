import { useTranslation } from "react-i18next";

export default function Partnership() {
  const { t } = useTranslation();

  return (
    <div className={"px-[20px]"}>
      <div className={"sections_taper"}>
        <div className={"join_card sea-background"}>
          <div className={"join_card_top"}>
            <h3>{t("partnership.title1")}</h3>
            <p>{t("partnership.desc1")}</p>
          </div>
          <div className={"join_card_image"}>
            <img src={"/media/images/join_partners.png"} />
          </div>
        </div>

        <div className={"join_card violet-background"}>
          <div className={"join_card_top"}>
            <h3>{t("partnership.title2")}</h3>
            <p>{t("partnership.desc2")}</p>
          </div>
          <div className={"join_card_image"}>
            <img src={"/media/images/join_bonus.png"} />
          </div>
        </div>

        <div className={"join_card green-background"}>
          <div className={"join_card_top"}>
            <h3>{t("partnership.title3")}</h3>
            <p>{t("partnership.desc3")}</p>
          </div>
          <div className={"join_card_image"}>
            <img src={"/media/images/join_money.png"} />
          </div>
        </div>
      </div>

      <button className={"join_button blue-background py-[14px] my-[12px]"}>
        {t("partnership.button")}
      </button>
    </div>
  );
}
