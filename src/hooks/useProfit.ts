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

    console.log("[useProfit] Waiting for offlineCardProfit...");

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

    // 🔧 Fallback: if nothing arrives after 2 seconds — force send
    const fallbackTimeout = setTimeout(() => {
      console.warn(
        "[useProfit] No offlineCardProfit received — sending manually."
      );
      sendSafe(room, "collectCardsProfit");
    }, 2000);

    return () => {
      unsubscribeProfit();
      clearTimeout(fallbackTimeout);
    };
  }, [room]);

  useEffect(() => {
    if (!room) return;

    const unsubscribe = room.onMessage("profitCardsCollectStatus", (data) => {
      console.log("[Server] profitCardsCollectStatus", data);
      // можешь показать тост/модалку или обновить стейт
    });

    return () => unsubscribe();
  }, [room]);
};
