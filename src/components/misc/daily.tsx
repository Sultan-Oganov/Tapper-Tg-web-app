"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useDailyReward } from "@/hooks/useDailyReward";
import { useDailyRewardStore } from "@/store/dailyRewardStore";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export default function DailyReward() {
  const [isOpen, setIsOpen] = useState(false);
  const { rewards } = useDailyRewardStore();
  const { requestDailyRewards, claimDailyReward } = useDailyReward();
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) requestDailyRewards();
  }, [isOpen]);
  const currentAvailable = rewards.find((r) => r.isAvailable && !r.isCollected);
  const alreadyCollected = rewards.every(
    (r) => !r.isAvailable || r.isCollected
  );
  return (
    <>
      <button
        className="flex justify-between items-center w-full bg-white/5 rounded-[12px] px-4 py-3"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center justify-center gap-2 bg-white rounded-full px-3 py-1 text-black font-bold text-[14px]">
          <img src="/media/icons/bitcoin.svg" className="w-[20px]" />
          {alreadyCollected
            ? t("tasks.dailyReward.received")
            : `+${currentAvailable?.reward?.toLocaleString("ru-RU") || "0"}`}
        </div>
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* центрируем */}
        <div className="fixed inset-0 flex items-center justify-center p-[20px] bg-[#0F1430B8]">
          <DialogPanel className="bg-[#1D234F] w-full rounded-[16px] px-[12px] pt-[20px] pb-[24px] max-w-[400px] space-y-[20px]">
            {/* Сетка */}
            <div className="grid grid-cols-3 gap-[12px]">
              {rewards.map((reward) => {
                const isAvailable = reward.isAvailable && !reward.isCollected;
                const isCollected = reward.isCollected;

                return (
                  <div
                    key={reward.day}
                    onClick={() => {
                      if (isAvailable) claimDailyReward();
                    }}
                    className={clsx(
                      "rounded-[12px] cursor-pointer flex flex-col items-center justify-center gap-[6px] py-[10px] transition-colors",
                      {
                        // доступный день
                        "bg-blue-gradient text-white": isCollected,
                        // полученный день
                        "bg-[#2B3569] text-white": isAvailable,
                        // недоступный
                        "bg-[#FFFFFF0D] text-white/50":
                          !isAvailable && !isCollected,
                      }
                    )}
                  >
                    <div>
                      {t("tasks.dailyReward.day")} {reward.day}
                    </div>
                    <img src="/media/icons/bitcoin.svg" className="w-[16px]" />
                    <div>{reward.reward}</div>
                  </div>
                );
              })}
            </div>

            {/* Подпись */}
            <div className="flex gap-[8px] items-start">
              <img
                src="/media/images/tasks.png"
                className="min-w-12 max-w-12"
                alt="task icon"
              />
              <div>
                <h3 className="text-white font-semibold text-[16px]">
                  {t("tasks.dailyReward.title")}
                </h3>
                <p className="text-white/50 text-[12px]">
                  {t("tasks.dailyReward.description")}
                </p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
