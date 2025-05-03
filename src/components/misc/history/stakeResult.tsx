import { useTranslation } from "react-i18next";

export default function StakeResult({ info }: any) {
  const { t } = useTranslation();
  return (
    <div className={"history_bot_stakes"}>
      <div className={"history_bot_stakes_top"}>
        <div className={"history_bot_stakes_top_icon-title"}>
          <img src={"/media/images/rocket.png"} />
          <div className={"history_nowrap"}>
            {t(
              info.type == "crash"
                ? "history.game_type.crash"
                : "history.game_type.other"
            )}
          </div>
        </div>
        <div className={"history_bot_stakes_top_date-time"}>{info.date}</div>
      </div>
      <div className={"history_bot_stakes_bot"}>
        <div className={"history_bot_stakes_bot_element"}>
          <div className={"taper_info_section_clarification"}>
            {t("history.bet")}
          </div>
          <img
            src={
              info.moneyType == "crypto"
                ? "/media/icons/bitcoin.svg"
                : "/media/icons/cash.svg"
            }
          />
          <div className={"taper_info_section_counting-quantity"}>
            {info.stake}
          </div>
        </div>
        <div className={"history_bot_stakes_bot_element"}>
          <div className={"history_nowrap"}>{t("history.multiplier")}</div>
          <div className={"taper_info_section_clarification"}>
            {t("history.multiplier_x")}
          </div>
          <div className={"taper_info_section_counting-quantity"}>
            {info.multiplier}
          </div>
        </div>
        <div className={"history_bot_stakes_bot_element"}>
          <div className={"history_nowrap"}>{t("history.win")}</div>
          <img
            src={
              info.moneyType == "crypto"
                ? "/media/icons/bitcoin.svg"
                : "/media/icons/cash.svg"
            }
          />
          <div className={"taper_info_section_counting-quantity"}>
            {info.cash}
          </div>
        </div>
      </div>
    </div>
  );
}
