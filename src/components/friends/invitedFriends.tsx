"use client";

import { useFriends } from "@/hooks/useFriends";
import { useFriendsStore } from "@/store/friendsStore";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loader from "../misc/loader";
import ShareInviteButton from "../misc/shareInviteButton";
import { useGameStore } from "@/store/gameStore";
import { useTranslation } from "react-i18next";

export default function InvitedFriends() {
  const { friends, total, isLoading } = useFriendsStore();
  const { loadNextPage, claimReward } = useFriends();
  const { playerId } = useGameStore();
  const { t } = useTranslation();

  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (inView && !isLoading && friends.length < total) {
      loadNextPage();
    }
  }, [inView, isLoading, friends.length, total]);

  return (
    <div className="friends_invited">
      <div className="friends_invited_title">{t("friends.title")}</div>

      <div className="friends_bonus_sections">
        {friends.length === 0 ? (
          <div className="bg-[#FFFFFF05] rounded-xl p-6 text-[#FFFFFF7A] text-center">
            {t("friends.empty_list")}
          </div>
        ) : (
          friends.map((friend, i) => (
            <div
              key={friend.id}
              ref={i === friends.length - 1 ? ref : undefined}
              className="friends_invited_frame py-[8px] px-[12px] flex justify-between items-center"
            >
              <div className="flex items-center gap-3 max-w-3/4">
                <div className="friends_invited_frame_img">
                  <img
                    src="/media/images/man_yellow.png"
                    alt={friend.name}
                    className="rounded-full min-w-8 min-h-8 max-w-8 max-h-8"
                  />
                </div>
                <div className="friends_invited_info">
                  <div className="friends_invited_info_title line-clamp-2 overflow-hidden text-ellipsis max-w-11/12 ">
                    {friend.name}
                  </div>
                  <div className="friends_invited_info_amount">
                    <img src="/media/icons/bitcoin.svg" />
                    <div className="friends_invited_info_amount-text">
                      +{friend.reward.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {!friend.finished && (
                <button
                  onClick={() => claimReward(friend.id)}
                  className="max-w-1/5 !p-0 text-sm text-white bg-purple-700 hover:bg-purple-800 rounded transition"
                >
                  {t("friends.claim_reward")}
                </button>
              )}
            </div>
          ))
        )}

        {isLoading && <Loader className="!h-[60px]" />}

        {playerId && <ShareInviteButton userId={Number(playerId)} />}
      </div>
    </div>
  );
}
