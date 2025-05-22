"use client";

import { useEffect, useRef } from "react";
import { useGameStore } from "@/store/gameStore";
import { useFriendsStore } from "@/store/friendsStore";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { sendSafe } from "@/utils/sendSafe";

export const useFriends = () => {
  const hasFetchedRef = useRef(false);
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
    if (!room || hasFetchedRef.current) return;

    hasFetchedRef.current = true;

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

      if (data.success) {
        toast.success(t("toast.friend_reward_success"));

        // 1. Обновляем баланс, если reward.claim есть
        if (data.reward?.claim) {
          setStateData((prev) => ({
            ...prev!,
            balance: prev!.balance + data.reward.claim,
          }));
        }

        // 2. Обновляем статус друга как завершённый (даже если reward не пришёл)
        setFriends(
          friends.map((f) =>
            f.id === data.reward?.rewardId ? { ...f, finished: true } : f
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  useEffect(() => {
    return () => {
      hasFetchedRef.current = false;
    };
  }, []);

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
