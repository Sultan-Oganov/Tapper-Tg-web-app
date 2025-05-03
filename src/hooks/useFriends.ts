"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { useFriendsStore } from "@/store/friendsStore";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const useFriends = () => {
  const { room } = useGameStore();
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

      if (data.success) {
        toast.success(t("toast.friend_reward_success"));
        reset();
        room.send("getFriendsList", { page: 1, pageSize: 10 });
      } else {
        toast.error(data.message || t("toast.friend_reward_error"));
      }
    });

    startLoading();
    room.send("getFriendsList", { page: 1, pageSize: 10 });

    return () => {
      unsubscribe();
      unsubscribeReward();
    };
  }, [room]);

  const loadNextPage = () => {
    if (!room || isLoading) return;

    if (friends.length >= total) return;

    startLoading();
    room.send("getFriendsList", { page: page + 1, pageSize: 10 });
  };

  const claimReward = (rewardId: number) => {
    if (!room) return;
    console.log("[Client] Sending getFriendReward", rewardId);
    room.send("getFriendReward", { rewardId });
  };

  return { loadNextPage, claimReward };
};
