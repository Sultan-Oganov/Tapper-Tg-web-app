import { useEffect, useCallback } from "react";
import { useGameStore } from "@/store/gameStore";
import { useCardsStore } from "@/store/cardsStore";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const useCards = () => {
  const { room } = useGameStore();
  const { setCards, setMenu, setIsLoading } = useCardsStore();
  const { t } = useTranslation();

  const requestCards = useCallback(() => {
    if (!room) return;
    setIsLoading(true);
    room.send("getCardsInfo");
    console.log("[Client] Sent: getCardsInfo");
  }, [room]);

  const buyCard = useCallback(
    (cardId: number) => {
      if (!room) return;
      room.send("buyCard", { cardId });
      console.log("[Client] Sent: buyCard", cardId);
    },
    [room]
  );

  const collectProfit = useCallback(() => {
    if (!room) return;
    room.send("collectCardsProfit");
    console.log("[Client] Sent: collectCardsProfit");
  }, [room]);

  useEffect(() => {
    if (!room) return;

    const unsubscribeInfo = room.onMessage("cardsInfo", (data) => {
      console.log("[Server] cardsInfo", data);
      setCards(data.cards);
      setMenu(data.menu);
      setIsLoading(false);
    });

    const unsubscribeBuy = room.onMessage("profitCardsBuyStatus", (data) => {
      console.log("[Server] profitCardsBuyStatus", data);
      if (data.status) {
        toast.success(data.message || t("toast.card_buy_success"));
        // Ждём новый cardsInfo от сервера
      } else {
        toast.error(data.message || t("toast.card_buy_error"));
      }
    });

    const unsubscribeProfit = room.onMessage("offlineCardProfit", (data) => {
      console.log("[Server] offlineCardProfit", data);
      if (data.profit > 0) {
        toast.success(
          t("toast.card_profit_collected", {
            amount: `+${data.profit?.toLocaleString()}`,
          })
        );
      }
    });

    return () => {
      unsubscribeInfo();
      unsubscribeBuy();
      unsubscribeProfit();
    };
  }, [room, setCards, setMenu, setIsLoading]);

  return {
    requestCards,
    buyCard,
    collectProfit,
  };
};
