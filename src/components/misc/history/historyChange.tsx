import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function HistoryChange() {
  const { t } = useTranslation();
  return (
    <>
      <div className={"history_dollar"}>
        <div className={"history_amount"}>
          <img src={"/media/icons/cash.svg"} />
          <div className={"history_amount_quantity"}>5000</div>
        </div>
        <div className={"history_buttons"}>
          <button
            className={
              "taper_info_section_counting-quantity history__card-button"
            }
          >
            {t("history.deposit")}
          </button>
          <Link
            to={"/finance"}
            className={
              "taper_info_section_counting-quantity history__card-button"
            }
          >
            {t("history.withdraw")}
          </Link>
        </div>
        <div className={"history_bag"}>
          <img src={"/media/images/money-cash.png"} />
        </div>
      </div>

      <div className={"history_bitcoin"}>
        <div className={"history_amount"}>
          <img src={"/media/icons/cash.svg"} />
          <div className={"history_amount_quantity"}>5000</div>
        </div>
        <div className={"history_buttons"}>
          <button
            className={
              "taper_info_section_counting-quantity history__card-button"
            }
          >
            {t("history.exchange")}
          </button>
          <button
            className={
              "taper_info_section_counting-quantity history__card-button"
            }
          >
            {t("history.history")}
          </button>
        </div>
        <div className={"history_bag"}>
          <img src={"/media/images/money-cash.png"} />
        </div>
      </div>
    </>
  );
}
