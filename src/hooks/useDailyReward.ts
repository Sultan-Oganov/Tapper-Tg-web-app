import { useEffect, useCallback } from "react";
import { useGameStore } from "@/store/gameStore";
import { useDailyRewardStore } from "@/store/dailyRewardStore";
import { toast } from "sonner";
import { Reward } from "@/types/gameEvents";
import { useTranslation } from "react-i18next";

export const useDailyReward = () => {
  const { room } = useGameStore();
  const { rewards, setRewards } = useDailyRewardStore();
  const { t } = useTranslation();

  const requestDailyRewards = useCallback(() => {
    if (!room) return;
    room.send("getDailyRewardInfo");
    console.log("[Event] Sent: getDailyRewardInfo");
  }, [room]);

  const claimDailyReward = useCallback(() => {
    if (!room) return;
    room.send("claimDailyReward");
    console.log("[Event] Sent: claimDailyReward");
  }, [room]);

  useEffect(() => {
    if (!room) return;

    const onDailyRewardInfo = (data: { availableRewards: Reward[] }) => {
      setRewards(data.availableRewards);
      console.log("[Server] Received dailyRewardInfo:", data);
    };

    const onRewardClaim = (data: {
      success: boolean;
      message: string;
      availableRewards: Reward[];
    }) => {
      if (data.success) {
        toast.success(data.message || t("toast.daily_reward_success"));
      } else {
        toast.error(data.message || t("toast.daily_reward_error"));
      }
      setRewards(data.availableRewards);
      console.log("[Server] Received rewardClaim:", data);
    };

    const unsubscribeInfo = room.onMessage(
      "dailyRewardInfo",
      onDailyRewardInfo
    );
    const unsubscribeClaim = room.onMessage("rewardClaim", onRewardClaim);

    return () => {
      unsubscribeInfo();
      unsubscribeClaim();
    };
  }, [room, setRewards]);

  return { rewards, requestDailyRewards, claimDailyReward };
};
