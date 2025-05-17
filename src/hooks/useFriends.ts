"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { useFriendsStore } from "@/store/friendsStore";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { sendSafe } from "@/utils/sendSafe";

export const useFriends = () => {
  const { room, stateData, setStateData } = useGameStore(); // 👈 добавили stateData и setStateData
  const {
    setFriends,
    appendFriends,
    page,
    isLoading,
    startLoading,
    stopLoading,
    friends,
    total,
    reset,
  } = useFriendsStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (!room) return;

    const unsubscribe = room.onMessage("friendsList", (data) => {
      console.log("[Server] friendsList", data);

      if (!data.status || !data.list) {
        toast.error(data.message || t("toast.friends_list_error"));
        stopLoading();
        return;
      }

      const { friends: newFriends, total: newTotal } = data.list;

      if (page === 1) {
        setFriends(newFriends, newTotal);
      } else {
        appendFriends(newFriends, newTotal);
      }
    });

    const unsubscribeReward = room.onMessage("getFriendReward", (data) => {
      console.log("[Server] getFriendReward", data);

      if (data.success && data.reward) {
        toast.success(t("toast.friend_reward_success"));

        // 1. Обновить баланс
        setStateData((prevState) => ({
          ...prevState!,
          balance: prevState!.balance + data.reward.claim,
        }));

        // 2. Обновить статус друга как завершённый
        setFriends(
          friends.map((f) =>
            f.id === data.reward.rewardId ? { ...f, finished: true } : f
          ),
          total
        );
      } else {
        toast.error(data.message || t("toast.friend_reward_error"));
      }
    });

    startLoading();
    sendSafe(room, "getFriendsList", { page: 1, pageSize: 10 });

    return () => {
      unsubscribe();
      unsubscribeReward();
    };
  }, [
    room,
    page,
    setFriends,
    appendFriends,
    startLoading,
    stopLoading,
    reset,
    setStateData,
    stateData,
    t,
    friends,
    total,
  ]);

  const loadNextPage = () => {
    if (!room || isLoading || friends.length >= total) return;

    startLoading();
    sendSafe(room, "getFriendsList", { page: page + 1, pageSize: 10 });
  };

  const claimReward = (rewardId: number) => {
    if (!room) return;
    sendSafe(room, "getFriendReward", { rewardId });
  };

  return { loadNextPage, claimReward };
};
