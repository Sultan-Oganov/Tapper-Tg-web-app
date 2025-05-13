"use client";

import { Card } from "@/types/gameEvents";
import { useCards } from "@/hooks/useCards";
import { useGameStore } from "@/store/gameStore";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface Props {
  card: Card;
  reasons: string[];
}

export default function BigCard({ card, reasons }: Props) {
  const { buyCard } = useCards();
  const { stateData } = useGameStore();
  const { t } = useTranslation();

  const level = stateData?.level ?? 0;

  // Только проверка unlocked, как в ванильном коде
  const canBuy = card.unlocked;

  return (
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

      <div className={"tokens_extended_card-bot"}>
        <img
          src={`/media/images/bear-${(card.id % 2) + 1}.png`}
          className={"tokens_extended_card-bot-image rounded-full"}
        />
        <div className={"tokens_card_bot_chapters items-center"}>
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
        <div className="tokens_card_bot_chapters items-center">
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
            <div className="text-center tokens_card_bot_chapters-text w-full my-2">
              {t("home.next_level")}
            </div>
            <div className={"tokens_card_bot_chapters items-center"}>
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
            <div className="tokens_card_bot_chapters items-center">
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
