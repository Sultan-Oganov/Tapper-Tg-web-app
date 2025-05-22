import MainControllerTab from "@/components/misc/tabs/mainControllerTab";
import BoosterBuy from "@/components/tapper/boosterBuy";
import { useGameStore } from "@/store/gameStore";
import { formatterNumber } from "@/utils/foramatter";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router";

export default function Boost() {
  const { stateData } = useGameStore();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const {
    state: { showBoost },
  } = useLocation();

  return (
    <div className={"px-[20px]"}>
      <div className={"sections_taper"}>
        {showBoost && (
          <div className="boost_frame !gap-5">
            <div className="taper_info px-[12px]">
              {[
                {
                  label: t("home.tapper_click"),
                  value: `+${
                    stateData?.turboBoostStatus
                      ? (stateData.clickValue ?? 0) * 2
                      : stateData?.clickValue ?? 0
                  }`,
                },
                {
                  label: t("home.tapper_to_upgrade"),
                  value:
                    Number(stateData?.clicksRemainingForNextLevel) > 1000
                      ? formatterNumber(
                          Number(stateData?.clicksRemainingForNextLevel),
                          language
                        )
                      : Number(
                          stateData?.clicksRemainingForNextLevel
                        )?.toLocaleString(),
                },
                {
                  label: t("home.tapper_per_hour"),
                  value: stateData?.profitPerHour
                    ? stateData.profitPerHour > 1000000
                      ? formatterNumber(stateData?.profitPerHour, language)
                      : stateData?.profitPerHour?.toLocaleString()
                    : 0,
                },
              ].map(({ label, value }, i) => (
                <div className="taper_info_section" key={i}>
                  <div className="taper_info_section_clarification">
                    {label}
                  </div>
                  <div className="taper_info_section_counting">
                    <img src="/media/icons/bitcoin.svg" />
                    <div className="taper_info_section_counting-quantity">
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="taper_wallet px-[12px]">
              <img src="/media/icons/bitcoin.svg" />
              <div className="taper_wallet_amount font-[family-name:var(--font-calculatrix)]">
                {stateData?.balance?.toLocaleString()}
              </div>
            </div>

            <hr className="text-[#FFFFFF08] w-full" />

            <BoosterBuy className="px-[12px]" />
          </div>
        )}
        <MainControllerTab />
      </div>
      {/* <DefaultTapper /> */}
    </div>
  );
}
