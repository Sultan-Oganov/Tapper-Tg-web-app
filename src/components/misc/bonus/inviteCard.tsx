import { useTranslation } from "react-i18next";

export default function InviteCard() {
  const { t } = useTranslation();

  return (
    <div className={"friends_bonus_frame py-[11px] px-[9px]"}>
      <div className={"friends_join_frame_left"}>
        <img src={"/media/images/green-cashier.png"} />
        <div className={"friends_join_frame_left_info"}>
          <div className={"friends_join_frame_left_info_title"}>
            {t("friends.bonus.for_friend")}
          </div>
          <div className={"friends_join_frame_info_amount"}>
            <img src={"/media/icons/bitcoin.svg"} />
            <div className={"friends_join_frame_info_amount-text"}>+5000</div>
          </div>
        </div>
      </div>
      <div className="line_vertical"></div>
      <div className={"friends_join_frame_right"}>
        <div className={"friends_join_frame_right_info"}>
          <div className={"friends_join_frame_right_info_title"}>
            {t("friends.bonus.tg_premium")}
          </div>
          <div className={"friends_join_frame_info_amount"}>
            <img src={"/media/icons/bitcoin.svg"} />
            <div className={"friends_join_frame_info_amount-text"}>+5000</div>
          </div>
        </div>
      </div>
    </div>
  );
}
