"use client";

import { useCardsStore } from "@/store/cardsStore";
import CardItem from "./cardItem";
import { useMemo } from "react";
import { useGameStore } from "@/store/gameStore";
import { useTranslation } from "react-i18next";

interface Props {
  cardType: number;
  variant?: "default" | "compact";
}

export default function CardTabs({ cardType, variant = "default" }: Props) {
  const { isLoading } = useCardsStore();
  const { stateData } = useGameStore();
  const cards = stateData?.userCards ?? [];
  const { t } = useTranslation();

  const filteredCards = useMemo(
    () => cards.filter((card) => card.cardType === cardType),
    [cards, cardType]
  );

  return (
    <div className="sections_taper mt-[8px]">
      <div className="tokens_extended">
        {isLoading ? (
          <div
            className={
              variant === "compact"
                ? "flex flex-col gap-[12px]"
                : "grid grid-cols-2 gap-[12px]"
            }
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="tokens_extended_card animate-pulse bg-white/5 rounded-xl h-[200px]"
              ></div>
            ))}
          </div>
        ) : filteredCards.length === 0 ? (
          <div className="text-center text-white/50 py-6">
            {t("home.cards_empty")}
          </div>
        ) : (
          <div
            className={
              variant === "compact"
                ? "flex flex-col gap-[12px]"
                : "grid grid-cols-2 gap-[12px]"
            }
          >
            {filteredCards.map((card) => (
              <CardItem key={card.id} card={card} variant={variant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
