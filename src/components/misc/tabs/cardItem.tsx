"use client";

import { Card } from "@/types/gameEvents";
import { useCards } from "@/hooks/useCards";
import { useGameStore } from "@/store/gameStore";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import BigCard from "./BigCard";

interface Props {
  card: Card;
  variant?: "default" | "compact";
}

export default function CardItem({ card, variant = "default" }: Props) {
  const { buyCard } = useCards();
  const { stateData } = useGameStore();
  const { t } = useTranslation();

  const level = stateData?.level ?? 0;
  const reasons: string[] = [];

  // Показываем причины только если карточка не разблокирована
  if (!card.unlocked) {
    if (card.dependencyCardId && card.dependencyCardLevel) {
      reasons.push(
        t("home.card_locked_reason_dependency", {
          id: card.dependencyCardId,
          level: card.dependencyCardLevel,
        })
      );
    }

    if (card.requiredLevel && level < card.requiredLevel) {
      reasons.push(
        t("home.card_locked_reason_level", {
          level: card.requiredLevel,
        })
      );
    }

    if (card.status === 0) {
      reasons.push(t("home.card_locked_reason_disabled"));
    }
  }

  // Только проверка unlocked, как в ванильном коде
  const canBuy = card.unlocked;
  const isBig = variant === "default";

  return isBig ? (
    <BigCard card={card} reasons={reasons} />
  ) : (
    <div
      className={clsx(
        "tokens_extended_card",
        canBuy
          ? "cursor-pointer"
          : "cursor-not-allowed opacity-40 pointer-events-none"
      )}
      onClick={() => {
        if (canBuy) {
          buyCard(card.id);
        }
      }}
    >
      <div className="tokens_card_top">
        <div className="tokens_card_top-title">
          #{card.id} {card.name}
        </div>
        <div className="tokens_card_top-options">
          <img src="/media/icons/point.svg" />
        </div>
      </div>

      <div className={"tokens_card_bot justify-between"}>
        <div className={"w-full flex gap-[12px] items-center"}>
          <img
            src={`/media/images/bear-${(card.id % 2) + 1}.png`}
            className={"w-[40px] h-[40px] rounded-xl"}
          />
          <div className="flex justify-between items-center grow flex-wrap">
            <div className={"tokens_card_bot_chapters flex-1/2"}>
              <div className="tokens_card_bot_chapters-text">
                {t("home.lvl_prefix")} {card.level}
              </div>
              <div className="tokens_card_bot_chapters-wallet">
                <img src="/media/icons/bitcoin.png" />
                <div className="tokens_card_bot_chapters-wallet-amount">
                  {card?.price?.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="tokens_card_bot_chapters flex-1/2">
              <div className="tokens_card_bot_chapters-text">
                {t("home.profit_per_hour")}
              </div>
              <div className="tokens_card_bot_chapters-wallet">
                <img src="/media/icons/bitcoin.png" />
                <div className="tokens_card_bot_chapters-wallet-amount">
                  +{card.profit.toLocaleString()}
                </div>
              </div>
            </div>
            {card?.nextPrice && card?.nextProfit && (
              <>
                <div className="text-center tokens_card_bot_chapters-text w-full my-2 -ml-3">
                  {t("home.next_level")}
                </div>
                <div className={"tokens_card_bot_chapters flex-1/2"}>
                  <div className="tokens_card_bot_chapters-text">
                    {t("home.lvl_prefix")} {card.level + 1}
                  </div>
                  <div className="tokens_card_bot_chapters-wallet">
                    <img src="/media/icons/bitcoin.png" />
                    <div className="tokens_card_bot_chapters-wallet-amount">
                      {card?.nextPrice?.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="tokens_card_bot_chapters flex-1/2">
                  <div className="tokens_card_bot_chapters-text">
                    {t("home.profit_per_hour")}
                  </div>
                  <div className="tokens_card_bot_chapters-wallet">
                    <img src="/media/icons/bitcoin.png" />
                    <div className="tokens_card_bot_chapters-wallet-amount">
                      +{card.nextProfit.toLocaleString()}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {reasons.length > 0 && (
        <div className="text-white/50 text-[12px] mt-2 text-center space-y-1">
          {reasons.map((reason, i) => (
            <div key={i}>{reason}</div>
          ))}
        </div>
      )}
    </div>
  );
}
