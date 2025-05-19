"use client";

import { Card } from "@/types/gameEvents";
import { useCards } from "@/hooks/useCards";
import { useGameStore } from "@/store/gameStore";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { formatterNumber } from "@/utils/foramatter";

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
        "tokens_extended_card !gap-0 !p-0 !pb-4 overflow-hidden",
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
      <div className="h-24 relative">
        <img
          src={`/media/images/bear-${(card.id % 2) + 1}.png`}
          className={"w-full h-full object-cover"}
        />
        <div className="tokens_card_top-options !absolute top-2.5 right-2.5 z-10">
          <img src="/media/icons/point.svg" />
        </div>
      </div>

      {/* Content */}

      <div className="w-full bg-[#FFFFFF05] px-4 py-2">
        <div className="w-full flex justify-between items-center mb-1.5">
          <h3 className="tokens_card_bot_chapters-text">{card.name}</h3>{" "}
          <p className="tokens_card_bot_chapters-text">№{card.id}</p>
        </div>
        <div className="tokens_card_bot_chapters-text text-[#898DA3]">
          {t("home.lvl_prefix")} {card.level}
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 pt-2.5">
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

        <hr className="text-[#FFFFFF08]" />

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
    </div>
  );
}
