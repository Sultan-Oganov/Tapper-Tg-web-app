"use client";

import { useTranslation } from "react-i18next";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function DepositTab() {
  const { t } = useTranslation();

  function toastCall() {
    toast.error(`${t("common.error")}!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }
  return (
    <div className={"wrapper__deposit"}>
      <ToastContainer />
      <img
        className={"absolute"}
        src={"/media/images/depozitBox.png"}
        alt={"Deposit"}
      />
      <div className={"flex flex-col gap-[8px] z-[1]"}>
        <div className={"balance__button"}>
          <div>{t("finance.deposit.balance")}</div>
          <div className={"balance__button-cash"}>
            <img src={"/media/icons/cash.svg"} alt="cash logo" />
            <div>20 000</div>
          </div>
        </div>
        <div className={"input__wrapper"}>
          <label>{t("finance.deposit.amount_label")}</label>
          <input
            className={"input-style"}
            placeholder={t("finance.deposit.amount_placeholder")}
          />
        </div>
        <div className={"input__wrapper"}>
          <label>{t("finance.deposit.promo_label")}</label>
          <input
            className={"input-style"}
            placeholder={t("finance.deposit.promo_placeholder")}
          />
        </div>
      </div>
      <div className={"finance__rate z-[1]"}>
        <div className={"text-center"}>{t("finance.deposit.rate_label")}</div>
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
      <button onClick={() => toastCall()}>
        {t("finance.deposit.test_button")}
      </button>
    </div>
  );
}
