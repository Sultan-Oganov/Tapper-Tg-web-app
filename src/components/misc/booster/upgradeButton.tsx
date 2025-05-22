"use client";

import { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { useGameEvents } from "@/hooks/useGameEvents";
import { toast } from "sonner";
import { Dialog } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { formatterNumber } from "@/utils/foramatter";

export default function UpgradeButton({ info }: { info: any }) {
  const { stateData } = useGameStore();
  const { buyMultiTap, buyEnergyUpgrade } = useGameEvents();
  const [open, setOpen] = useState(false);
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const isAvailable =
    info.unlocked && stateData?.balance && stateData?.balance >= info.price;

  const handleBuy = () => {
    if (info.type === "multitap") {
      buyMultiTap();
    } else if (info.type === "energy") {
      buyEnergyUpgrade();
    } else {
      toast.error(t("boosters.unknown_booster"));
    }
    setOpen(false);
  };

  return (
    <>
      <div
        onClick={() => {
          if (!isAvailable) {
            toast.error(t("boosters.not_available"));
            return;
          }
          setOpen(true);
        }}
        className={`amplifiers_boosters_taps ${
          !isAvailable && "amplifiers_boosters_taps_noactive"
        } cursor-pointer`}
      >
        <div className={"amplifiers_boosters_taps_left"}>
          <div className={"amplifiers_boosters_image"}>
            <img src={info.icon} />
          </div>
          <div className={"amplifiers_boosters_taps_left-text"}>
            <div className="amplifiers_boosters_taps_left-title line-clamp-2">
              {info.name}
            </div>
            <div className={"amplifiers_boosters_taps_left-accessibility"}>
              {isAvailable
                ? t("boosters.available")
                : t("boosters.unavailable")}
            </div>
          </div>
        </div>
        <div className={"amplifiers_boosters_taps_boosters-right"}>
          <div className={"amplifiers_boosters_taps_boosters-right-line"}></div>
          <div className={"amplifiers_boosters_taps_boosters-right-lvl"}>
            <div className={"amplifiers_boosters_taps_left-accessibility"}>
              {t("boosters.lvl", { level: info.lvl })}
            </div>
            <div className={"taper_info_section_counting px-[13.5px]"}>
              <img src={"/media/icons/bitcoin.svg"} />
              <div className={"taper_info_section_counting-quantity"}>
                {Number(info.price) > 1000
                  ? formatterNumber(Number(info.price), language)
                  : Number(info.price)?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className="fixed inset-0 bg-black/50 z-40" />
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Dialog.Panel className="bg-[#101828] p-6 rounded max-w-sm w-full text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{info.name}</h3>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>
            <img
              src={info.icon}
              alt={info.name}
              className="w-12 h-12 mx-auto mb-4"
            />
            <p className="text-sm text-center mb-6 text-white/80">
              {info.description || t("boosters.default_description")}
            </p>
            <div className="flex justify-between items-center text-sm mb-4">
              <div className="text-white/70">Lvl {info.lvl}</div>
              <div className="flex items-center gap-1">
                <img src="/media/icons/bitcoin.svg" className="w-4 h-4" />
                <span>
                  {info.price.toLocaleString()}
                  {/* {Number(info.price) > 1000
                    ? formatterNumber(Number(info.price), language)
                    : Number(info.price)?.toLocaleString()} */}
                </span>
              </div>
            </div>
            <button
              onClick={handleBuy}
              className="w-full bg-blue-600 py-2 rounded text-white font-semibold"
            >
              {t("boosters.activate")}
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
