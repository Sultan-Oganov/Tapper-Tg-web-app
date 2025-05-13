"use client";

import { Card } from "@/types/gameEvents";
import { useCards } from "@/hooks/useCards";
import { useGameStore } from "@/store/gameStore";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import BigCard from "./BigCard";
import { formatterNumber } from "@/utils/foramatter";

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
        !canBuy && "cursor-not-allowed opacity-40 pointer-events-none"
      )}
    >
      <div className="tokens_card_top">
        <div className="grow flex items-center gap-2.5">
          <img
            src={`/media/images/bear-${(card.id % 2) + 1}.png`}
            className={"w-[40px] h-[40px] rounded-full"}
          />
          <div className="flex-col gap-0.5">
            <div className="tokens_card_top-title">{card.name}</div>
            <div className="tokens_card_top-subtitle">№{card.id}</div>
          </div>
        </div>
        <div className="tokens_card_top-options">
          <img src="/media/icons/point.svg" />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className={"tokens_card_bot_chapters"}>
            <div className="tokens_card_bot_chapters-text text-[#ffffff7a]">
              {t("home.lvl_prefix")} {card.level}
            </div>
            <div className="tokens_card_bot_chapters-wallet">
              <img src="/media/icons/bitcoin.png" />
              <div className="tokens_card_bot_chapters-wallet-amount text-[#ffffff7a]">
                {formatterNumber?.format(card?.price) ||
                  card?.price?.toLocaleString()}
              </div>
            </div>
          </div>
          <img
            src="/media/icons/triangleRight.svg"
            className="w-5 h-5"
            alt="icon"
          />
          <div className={"tokens_card_bot_chapters items-end"}>
            <div className="tokens_card_bot_chapters-text">
              {t("home.lvl_prefix")} {card.level + 1}
            </div>
            <div className="tokens_card_bot_chapters-wallet">
              <img src="/media/icons/bitcoin.png" />
              <div className="tokens_card_bot_chapters-wallet-amount">
                {formatterNumber?.format(card?.nextPrice) ||
                  card?.nextPrice?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <hr className="text-[#3d3d3d7a]" />

        <div className="flex justify-between items-center">
          <div className="tokens_card_bot_chapters">
            <div className="tokens_card_bot_chapters-text text-[#ffffff7a]">
              {t("home.profit_per_hour")}
            </div>
            <div className="tokens_card_bot_chapters-wallet">
              <img src="/media/icons/bitcoin.png" />
              <div className="tokens_card_bot_chapters-wallet-amount text-[#ffffff7a]">
                {formatterNumber?.format(card.profit) ||
                  card.profit.toLocaleString()}
              </div>
            </div>
          </div>
          <img
            src="/media/icons/triangleRight.svg"
            className="w-5 h-5"
            alt="icon"
          />
          <div className="tokens_card_bot_chapters items-end">
            <div className="tokens_card_bot_chapters-text">
              {t("home.profit_per_hour")}
            </div>
            <div className="tokens_card_bot_chapters-wallet">
              <img src="/media/icons/bitcoin.png" />
              <div className="tokens_card_bot_chapters-wallet-amount">
                {formatterNumber?.format(card.nextProfit) ||
                  card.nextProfit.toLocaleString()}
              </div>
            </div>
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
      <button
        className="blue-background rounded-xl p-3.5 text-sm flex items-center justify-center gap-1.5 cursor-pointer"
        onClick={() => {
          if (canBuy) {
            buyCard(card.id);
          }
        }}
      >
        <img src="/media/icons/bitcoin.png" className="w-4 h-4" />
        {t("home.buy_btn")}
      </button>
    </div>
  );
}
