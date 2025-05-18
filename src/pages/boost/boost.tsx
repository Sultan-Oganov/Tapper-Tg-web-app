import MainControllerTab from "@/components/misc/tabs/mainControllerTab";
import { useGameStore } from "@/store/gameStore";
import { useTranslation } from "react-i18next";

export default function Boost() {
  const { stateData } = useGameStore();
  const { t } = useTranslation();

  return (
    <div className={"px-[20px]"}>
      <div className={"sections_taper"}>
        {/* <BoosterBuy /> */}
        <div className="boost_frame px-[12px] !gap-5">
          <div className="taper_wallet">
            <img src="/media/icons/bitcoin.svg" />
            <div className="taper_wallet_amount font-[family-name:var(--font-calculatrix)]">
              {stateData?.balance?.toLocaleString()}
            </div>
          </div>

          <div className="taper_info_section !w-full">
            <div className="taper_info_section_clarification">
              {t("home.profit_per_hour")}
            </div>
            <div className="taper_info_section_counting">
              <img src="/media/icons/bitcoin.svg" />
              <div className="taper_info_section_counting-quantity">
                {stateData?.profitPerHour?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        <MainControllerTab />
      </div>
      {/* <DefaultTapper /> */}
    </div>
  );
}
