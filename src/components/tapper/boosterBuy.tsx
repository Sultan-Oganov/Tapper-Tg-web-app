import { useGameStore } from "@/store/gameStore";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
interface Props {
  className?: string;
}
const BoosterBuy: React.FC<Props> = ({ className }) => {
  const { stateData } = useGameStore();
  const { t } = useTranslation();
  const activeCards =
    stateData?.userCards?.filter((c) => c.status === 0).length ?? 0;
  const turboActive = stateData?.turboBoostStatus ? 1 : 0;
  const activeTotal = activeCards + turboActive;

  const maxBoosts = 5; // <-- здесь можешь заменить на dynamic если появится в state

  return (
    <div className={clsx("w-full flex flex-col", className)}>
      <div className={"taper_booster_try"}>
        <div className={"taper_booster_try_title"}>
          {t("home.try_boosters")}
        </div>
        <div className={"taper_booster_try_progress"}>
          (<span>{activeTotal}</span> / {maxBoosts})
        </div>
      </div>
      <div className={"taper_boosters"}>
        <div className={"taper_boosters_card"}>
          <div className={"taper_booster_card_frame light-blue-background"}>
            <div className={"taper_booster_card_img"}>
              <img src={"/media/images/zipper.png"} />
            </div>
          </div>
          <div className={"taper_booster_card_frame light-yellow-background"}>
            <div className={"taper_booster_card_img"}>
              <img src={"/media/images/lightning.png"} />
            </div>
          </div>
          <div className={"taper_booster_card_frame light-red-background"}>
            <div className={"taper_booster_card_img"}>
              <img src={"/media/images/rocket.png"} />
            </div>
          </div>
        </div>
        <Link to="/booster">
          <img
            src={"/media/icons/bitcoin.png"}
            className={"w-[19.26px] h-[19.99px]"}
          />
          <div className={"taper_boosters_buy"}>{t("home.buy")}</div>
        </Link>
      </div>
    </div>
  );
};

export default BoosterBuy;
