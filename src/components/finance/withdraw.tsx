import { useTranslation } from "react-i18next";

export default function WithdrawTab() {
  const { t } = useTranslation();

  return (
    <div className={"wrapper__deposit"}>
      <img
        className={"absolute"}
        src={"/media/images/depozitBox.png"}
        alt={"Deposit"}
      />
      <div className={"flex flex-col gap-[8px] z-[1]"}>
        <div className={"input__wrapper"}>
          <input
            className={"input-style"}
            placeholder={t("finance.withdraw.sum_placeholder")}
          />
        </div>
        <div className={"input__wrapper"}>
          <label>{t("finance.withdraw.network_label")}</label>
          <input
            className={"input-style"}
            placeholder={t("finance.withdraw.sum_placeholder")}
          />
        </div>
        <div className={"input__wrapper"}>
          <label>{t("finance.withdraw.amount_label")}</label>
          <input
            className={"input-style"}
            placeholder={t("finance.withdraw.sum_placeholder")}
          />
        </div>
        <div className={"input__wrapper"}>
          <label>{t("finance.withdraw.wallet_label")}</label>
          <input
            className={"input-style"}
            placeholder={t("finance.withdraw.wallet_placeholder")}
          />
        </div>
      </div>
      <div className={"finance__rate z-[1]"}>
        <div className={"text-center"}>
          {t("finance.withdraw.current_rate")}
        </div>
        <div
          className={"text-white text-[14px] justify-center flex items-center"}
        >
          <img
            className={"w-[16px]"}
            src={"/media/icons/cash.svg"}
            alt="cash logo"
          />
          100 = 1$
        </div>
      </div>
    </div>
  );
}
