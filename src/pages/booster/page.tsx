"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useGameStore } from "@/store/gameStore";
import FreeUpgrade from "@/components/misc/booster/freeUpgrade";
import UpgradeButton from "@/components/misc/booster/upgradeButton";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import Loader from "@/components/misc/loader";

export default function Booster() {
  const { stateData, isConnecting, isReconnecting } = useGameStore();
  const { t } = useTranslation();

  const activeBoostersCount =
    (stateData?.turboBoostStatus ? 1 : 0) +
    (stateData?.energyRestoreRemaining && stateData.energyRestoreRemaining > 0
      ? 1
      : 0);

  const paidBoosters = [
    {
      id: "multitap",
      name: t("boosters.boost_multitap"),
      lvl: stateData?.multiTapLevel ?? 0,
      price: stateData?.multiTapCost ?? 0,
      unlocked: true,
      icon: "/media/icons/booster_zipper.png",
      type: "multitap",
    },
    {
      id: "energy",
      name: t("boosters.boost_max_energy"),
      lvl: stateData?.energyMaxLevel ?? 0,
      price: stateData?.energyUpgradeCost ?? 0,
      unlocked: true,
      icon: "/media/icons/booster_lightning.png",
      type: "energy",
    },
  ];

  if (isConnecting || isReconnecting || !stateData) {
    return <Loader />;
  }

  return (
    <div className="px-[20px]">
      <div className="sections_taper">
        <div className="amplifiers px-[12px] py-[10px] blue-background">
          <div className="amplifiers_active px-[12px] py-[10px]">
            <div className="amplifiers_active_text">
              {t("boosters.active_title")}
            </div>
            <div className="amplifiers_active_zipper">
              <img src={"/media/icons/zipper_yellow.png"} />
              <div className="amplifiers_active_zipper-figure">
                +{activeBoostersCount}
              </div>
            </div>
          </div>
          <div className="taper_wallet">
            <img src={"/media/icons/bitcoin.svg"} />
            <div className="taper_wallet_amount">
              {stateData?.balance?.toLocaleString()}
            </div>
          </div>
          <div className="amplifiers_work">
            <div className="amplifiers_work_line"></div>
            <a className="amplifiers_active_zipper-figure">
              {t("boosters.how_it_works")}
            </a>
          </div>
        </div>

        <TabGroup>
          <TabList className="down_taps">
            {[t("boosters.tabs.free"), t("boosters.tabs.paid")].map(
              (label, idx) => (
                <Tab key={idx} className="outline-none cursor-pointer w-full">
                  {({ selected }) => (
                    <span
                      className={clsx(
                        selected
                          ? "active down_taps_card py-[8px]"
                          : "down_taps_card py-[8px]"
                      )}
                    >
                      {label}
                    </span>
                  )}
                </Tab>
              )
            )}
          </TabList>

          <TabPanels>
            <TabPanel>
              <FreeUpgrade />
            </TabPanel>
            <TabPanel>
              <div className="amplifiers_boosters">
                {paidBoosters.map((item) => (
                  <UpgradeButton info={item} key={item.id} />
                ))}
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
