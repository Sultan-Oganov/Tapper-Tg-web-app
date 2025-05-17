import { useEffect, useCallback, useRef } from "react";
import { useGameStore } from "@/store/gameStore";
import { useCardsStore } from "@/store/cardsStore";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { sendSafe } from "@/utils/sendSafe";
import { Card } from "@/types/gameEvents";

export const useCards = () => {
  const { room } = useGameStore();
  const { setCards, setMenu, setIsLoading, cards } = useCardsStore();
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
      if (data.status && data.card) {
        // 👇 обнови карточку локально без перезагрузки всех карточек
        const newCards = cards.map((card) =>
          card.id === data.card.id ? { ...card, ...data.card } : card
        );
        setCards(newCards);
        toast.success(data.message || t("toast.card_buy_success"));
      } else {
        toast.error(data.message || t("toast.card_buy_error"));
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
    };
  }, [room, setCards, setMenu, setIsLoading, requestCards, t]);

  return {
    requestCards,
    buyCard,
  };
};
