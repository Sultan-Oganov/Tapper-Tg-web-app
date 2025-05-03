"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { useGameEvents } from "@/hooks/useGameEvents";
import { toast } from "sonner";
import { differenceInSeconds } from "date-fns";
import { useTranslation } from "react-i18next";

function formatSecondsToHHMMSS(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export default function FreeUpgrade() {
  const { stateData } = useGameStore();
  const { activateTurbo, restoreEnergy } = useGameEvents();

  const [turboCooldown, setTurboCooldown] = useState<null | string>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        stateData?.nextTurboBoostTime &&
        stateData.nextTurboBoostTime > Date.now()
      ) {
        const seconds = differenceInSeconds(
          new Date(stateData.nextTurboBoostTime),
          new Date()
        );
        setTurboCooldown(formatSecondsToHHMMSS(seconds));
      } else {
        setTurboCooldown("");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [stateData?.nextTurboBoostTime]);

  const handleEnergyClick = () => {
    if (
      stateData?.energyRestoreRemaining &&
      stateData.energyRestoreRemaining > 0
    ) {
      restoreEnergy();
      toast.success(t("toast.energy_restored"));
    } else {
      toast.error(t("toast.no_energy_restore"));
    }
  };

  const handleTurboClick = () => {
    const now = Date.now();
    if (
      !stateData?.turboBoostStatus &&
      stateData?.nextTurboBoostTime &&
      stateData.nextTurboBoostTime > now
    ) {
      toast.error(t("toast.turbo_cooldown"));
      return;
    }

    if (!stateData?.turboBoostStatus) {
      activateTurbo();
      toast.success(t("toast.turbo_activated"));
    } else {
      toast.error(t("toast.turbo_active"));
    }
  };

  const restoreTime = stateData?.nextEnergyRestoreTime
    ? new Date(stateData.nextEnergyRestoreTime * 1000).toLocaleTimeString()
    : "00:00:00";

  const shouldShowRestoreTimer =
    (stateData?.energyRestoreRemaining ?? 0) === 0 &&
    !!stateData?.nextEnergyRestoreTime;

  const shouldShowTurboTimer =
    !stateData?.turboBoostStatus &&
    stateData?.nextTurboBoostTime &&
    stateData.nextTurboBoostTime > Date.now();

  return (
    <div className="amplifiers_boosters">
      {/* Полная энергия */}
      <div
        className="amplifiers_boosters_taps cursor-pointer"
        onClick={handleEnergyClick}
      >
        <div className="amplifiers_boosters_taps_left !border-none">
          <div className="amplifiers_boosters_image">
            <img src="/media/icons/booster_lightning.png" />
          </div>
          <div className="amplifiers_boosters_taps_left-text">
            <div className="amplifiers_boosters_taps_left-title">
              {t("boosters.full_energy")}
            </div>
            <div className="amplifiers_boosters_taps_left-accessibility">
              {stateData?.energyRestoreRemaining ?? 0}/6{" "}
              {t("boosters.available")?.toLowerCase()}
            </div>
          </div>
        </div>
        {shouldShowRestoreTimer && (
          <div className="amplifiers_boosters_taps_free-right-time">
            {restoreTime}
          </div>
        )}
      </div>

      {/* Скорость Турбо */}
      <div
        className="amplifiers_boosters_taps cursor-pointer"
        onClick={handleTurboClick}
      >
        <div className="amplifiers_boosters_taps_left !border-none">
          <div className="amplifiers_boosters_image">
            <img src="/media/icons/booster_rocket.png" />
          </div>
          <div className="amplifiers_boosters_taps_left-text">
            <div className="amplifiers_boosters_taps_left-title">
              {t("boosters.speed_turbo")}
            </div>
            <div className="amplifiers_boosters_taps_left-accessibility">
              {stateData?.turboBoostStatus
                ? t("boosters.activated")
                : shouldShowTurboTimer
                ? t("boosters.unavailable")
                : t("boosters.available")}
            </div>
          </div>
        </div>
        {shouldShowTurboTimer && (
          <div className="amplifiers_boosters_taps_free-right-time">
            {turboCooldown}
          </div>
        )}
      </div>
    </div>
  );
}
