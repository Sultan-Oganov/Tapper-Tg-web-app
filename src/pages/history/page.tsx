import StakeResult from "@/components/misc/history/stakeResult";
import HistoryChange from "@/components/misc/history/historyChange";
import { useTranslation } from "react-i18next";

export default function History() {
  // TODO: REFACTORING
  // TODO: CREATE COMPONENTS
  const data = {
    stake: "100",
    type: "crash",
    date: "12/12/2024 15:45",
    multiplier: "12",
    cash: "122.12K",
    moneyType: "crypto",
  };
  const { t } = useTranslation();

  return (
    <div className={"px-[20px]"}>
      <div className={"sections_taper history"}>
        <div className={"history_sections"}>
          <div className={"friends_invited_frame py-[8px] px-[12px]"}>
            <div className={"friends_invited_frame_img"}>
              <img
                className={"rounded-full"}
                src={"/media/images/man_yellow.png"}
              />
            </div>
            <div className={"friends_invited_info"}>
              <div className={"friends_invited_info_title"}>
                {t("history.profile")}
              </div>
              <div className={"friends_invited_info_amount"}>
                <div className={"friends_invited_info_amount-text"}>
                  Герасим Муму
                </div>
              </div>
            </div>
          </div>
          <HistoryChange />
        </div>

        <div className={"history_bot"}>
          <div className={"history_sections"}>
            <div className={"history_bot_title"}>{t("history.title")}</div>
            <div className={"history_bot_select"}>
              <div
                className={"history_bot_select_element px-[14px] py-[11.5px]"}
              >
                <div className={"history_bot_select_element_option"}>
                  {t("history.all")}
                </div>
              </div>
              <div
                className={"history_bot_select_element px-[14px] py-[11.5px]"}
              >
                <div className={"history_bot_select_element_option-inactive"}>
                  {t("history.bet")}
                </div>
              </div>
            </div>

            <StakeResult info={data} />
          </div>
          <button> {t("history.load_more")}</button>
        </div>
      </div>
    </div>
  );
}
