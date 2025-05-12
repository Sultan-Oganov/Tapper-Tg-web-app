import { useEffect, useCallback, useRef } from "react";
import { useGameStore } from "@/store/gameStore";
import { useCardsStore } from "@/store/cardsStore";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { sendSafe } from "@/utils/sendSafe";

export const useCards = () => {
  const { room, stateData } = useGameStore();
  const { setCards, setMenu, setIsLoading } = useCardsStore();
  const { t } = useTranslation();
  const isRequesting = useRef(false);

  const requestCards = useCallback(async () => {
    if (!room || isRequesting.current) return;

    try {
      isRequesting.current = true;
      setIsLoading(true);
      sendSafe(room, "getCardsInfo");
      console.log("[Client] Sent: getCardsInfo");
    } finally {
      isRequesting.current = false;
    }
  }, [room, setIsLoading]);

  const buyCard = useCallback(
    (cardId: number) => {
      if (!room) return;
      setIsLoading(true);
      sendSafe(room, "buyCard", { cardId });
      console.log("[Client] Sent: buyCard", cardId);
    },
    [room, setIsLoading]
  );

  useEffect(() => {
    if (!room) return;

    const unsubscribeInfo = room.onMessage("cardsInfo", (data) => {
      console.log("[Server] cardsInfo", data);
      if (!data.cards) return;

      setCards(data.cards);
      setMenu(data.menu || []);
      setIsLoading(false);
    });

    const unsubscribeBuy = room.onMessage("profitCardsBuyStatus", (data) => {
      console.log("[Server] profitCardsBuyStatus", data);
      if (data.status) {
        toast.success(data.message || t("toast.card_buy_success"));
        requestCards();
      } else {
        toast.error(data.message || t("toast.card_buy_error"));
        setIsLoading(false);
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
        sendSafe(room, "collectCardsProfit");
        console.log("[Client] Sent: collectCardsProfit (auto)");
        requestCards();
      }
    });

    room.onStateChange((state) => {
      if (state.userCards) {
        console.log("[Server] State changed, updating cards");
        setCards(state.userCards);
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribeInfo();
      unsubscribeBuy();
      unsubscribeProfit();
    };
  }, [room, setCards, setMenu, setIsLoading, requestCards, t]);

  return {
    requestCards,
    buyCard,
  };
};
