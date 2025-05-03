import { useTranslation } from "react-i18next";

export default function HistoryTab() {
  const { t } = useTranslation();

  return (
    <div className={"flex flex-col gap-[8px]"}>
      <div className={"wrapper__bets"}>
        <div className={"flex flex-col gap-[10px]"}>
          <div className={"flex justify-between text-[14px]"}>
            <div className={"flex gap-[8px] w-full"}>
              <div className={"text-[#FFFFFF]/50 flex gap-[4px]"}>
                <div className={"w-[20px]"}>
                  <img
                    className={"w-[20px]"}
                    src={"/media/icons/cash.png"}
                    alt="cash"
                  />
                </div>
                {t("finance.history.withdraw_label")}
              </div>
              <div className={"text-[#0CD99D]"}>
                ({t("finance.history.success_status")})
              </div>
            </div>
            <div className={"text-[#FFFFFF]/50"}>12/12/2024</div>
          </div>
          <div className={"card__inner flex text-white text-[14px] gap-[8px]"}>
            <img
              className={"w-[16px]"}
              src={"/media/icons/cash.svg"}
              alt="cash logo"
            />
            <div>20 000</div>
          </div>
        </div>
      </div>
      <div className={"card__inner text-center text-white text-[14px]"}>
        {t("finance.history.close")}
      </div>
    </div>
  );
}
