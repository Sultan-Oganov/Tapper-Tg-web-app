"use client";

import { useGameStore } from "@/store/gameStore";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export default function Invite() {
  const playerId = useGameStore((s) => s.playerId);
  const { t } = useTranslation();

  const handleCopyInviteLink = async () => {
    if (!playerId) {
      toast.error(t("friends.no_player_id"));
      return;
    }

    const inviteUrl = `https://t.me/OpenClickerCashBot?start=startapp_${playerId}`;

    try {
      await navigator.clipboard.writeText(inviteUrl);
      toast.success(t("friends.copy_success"));
    } catch (err) {
      toast.error(t("friends.copy_error"));
    }
  };

  return (
    <div className="friends_join">
      <div className="friends_join_form px-[12px] pt-[10px]">
        <div className="friends_join_quantity py-[16.5px] px-[12px]">
          <div className="amplifiers_active_text">{t("friends.title")}</div>
          <div className="award_top_description">0</div>
        </div>
        <div className="friends_join_form_img">
          <img src="/media/images/people.png" />
        </div>
      </div>

      <div className="friends_join_sections">
        <div className="friends_join_frame py-[13px]">
          <div className="friends_join_frame_img">
            <img src="/media/images/manyel.png" />
          </div>
          <div className="friends_join_frame_info">
            <div className="friends_join_frame_info_title">
              {t("friends.invite_friend")}
            </div>
            <div className="friends_join_frame_info_amount">
              <img src="/media/icons/bitcoin.png" />
              <div className="friends_join_frame_info_amount-text">
                +5000&nbsp;<span>{t("friends.reward_you_and_friend")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="friends_join_frame py-[13px]">
          <div className="friends_join_frame_img">
            <img src="/media/images/man_cash.png" />
          </div>
          <div className="friends_join_frame_info">
            <div className="friends_join_frame_info_title">
              {t("friends.invite_friend_premium")} &nbsp;<span>TG Premium</span>
            </div>
            <div className="friends_join_frame_info_amount">
              <img src="/media/icons/bitcoin.svg" />
              <div className="friends_join_frame_info_amount-text">
                +25000&nbsp;<span>{t("friends.reward_you_and_friend")}</span>
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleCopyInviteLink}>
          {t("friends.to_invite_friend")}
        </button>
      </div>
    </div>
  );
}
