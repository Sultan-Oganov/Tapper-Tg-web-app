import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { sendSafe } from "@/utils/sendSafe";

export const useProfit = () => {
  const { room } = useGameStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (!room) return;

    const unsubscribeProfit = room.onMessage("offlineCardProfit", (data) => {
      console.log("[Server] offlineCardProfit", data);

      if (data.profit > 0) {
        toast.success(
          t("toast.card_profit_collected", {
            amount: `+${data.profit?.toLocaleString()}`,
          })
        );
        sendSafe(room, "collectCardsProfit");
      }
    });

    return () => {
      unsubscribeProfit();
    };
  }, [room]);
};
