import { useTranslation } from "react-i18next";

export default function Tournament() {
  // TODO: REFACTORING
  // TODO: CREATE COMPONENTS
  const { t } = useTranslation();

  return (
    <div className={"px-[20px]"}>
      <div className={"sections_taper"}>
        <div className={"tournament_frame red-background"}>
          <div className={"tournament_top"}>
            <div className={"tournament_top_title"}>
              <span>{t("tournament.title")}</span>
              <div className={"tournament_top_title_amount"}>
                <img src={"/media/icons/bitcoin.svg"} />
                <h3>{t("tournament.reward")}</h3>
              </div>
            </div>
            <div className={"tournament_top_line"}></div>
            <div className={"tournament_top_description"}>
              {t("tournament.description")}
            </div>
          </div>
          <div className={"tournament_images"}>
            <div className={"tournament_image"}>
              <img src={"/media/images/guy.png"} />
            </div>
            <div className={"tournament_image"}>
              <img src={"/media/images/guy.png"} />
            </div>
            <div className={"tournament_image"}>
              <img src={"/media/images/guy.png"} />
            </div>
          </div>
          <button>{t("tournament.button")}</button>
        </div>
        <div className={"tournament_frame blue-background"}>
          <div className={"tournament_top"}>
            <div className={"tournament_top_title"}>
              <span>{t("tournament.title")}</span>
              <div className={"tournament_top_title_amount"}>
                <img src={"/media/icons/bitcoin.svg"} />
                <h3>{t("tournament.reward")}</h3>
              </div>
            </div>
            <div className={"tournament_top_line"}></div>
            <div className={"tournament_top_description"}>
              {t("tournament.description")}
            </div>
          </div>
          <div className={"tournament_images"}>
            <div className={"tournament_image"}>
              <img src={"/media/images/guy.png"} />
            </div>
            <div className={"tournament_image"}>
              <img src={"/media/images/guy.png"} />
            </div>
            <div className={"tournament_image"}>
              <img src={"/media/images/guy.png"} />
            </div>
          </div>
          <button>{t("tournament.button")}</button>
        </div>
      </div>
    </div>
  );
}
