import { useEffect, useRef } from "react";
import { useGameStore } from "@/store/gameStore";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { sendSafe } from "@/utils/sendSafe";
import { RoomState } from "@/types/gameEvents";

export const useGameEvents = () => {
  const { room, setStateData } = useGameStore();
  const { t } = useTranslation();

  const sendClick = (position?: { left: number; top: number }) => {
    if (!room) return;
    sendSafe(
      room,
      "click",
      position ? { left: position.left, top: position.top } : {}
    );
  };

  const activateTurbo = () => {
    if (!room) return;
    sendSafe(room, "activateTurbo");
  };

  const restoreEnergy = () => {
    if (!room) return;
    sendSafe(room, "restoreEnergy");
  };

  const buyMultiTap = () => {
    if (!room) return;
    sendSafe(room, "buyMultiTap");
  };

  const buyEnergyUpgrade = () => {
    if (!room) return;
    sendSafe(room, "buyEnergyUpgrade");
  };

  const changeLanguage = (language: string) => {
    if (!room) return;
    sendSafe(room, "changeLanguage", { language });
  };

  useEffect(() => {
    if (!room) return;

    const onUpdateState = (newState: RoomState) => {
      setStateData({ ...newState });
    };

    const onError = (data: any) => {
      console.error("[Server Error]", data);
      toast.error(data.message || t("toast.server_error"));
    };

    const onTurboBoost = (data: any) => {
      if (data.success && data.code === "Enable") {
        toast.success(t("toast.turbo_activated"));
      } else {
        toast.error(data.message || t("toast.turbo_error"));
      }
    };

    const onRestoreEnergy = (data: any) => {
      if (data.success && data.code === "OK") {
        toast.success(t("toast.energy_restored"));
      } else {
        toast.error(data.message || t("toast.energy_restore_error"));
      }
    };

    const onBuyMultiTap = (data: any) => {
      if (data.success) {
        toast.success(t("toast.multitap_upgrade_success"));
      } else {
        toast.error(data.message || t("toast.multitap_upgrade_error"));
      }
    };

    const onBuyEnergyUpgrade = (data: any) => {
      if (data.success) {
        toast.success(t("toast.energy_upgrade_success"));
      } else {
        toast.error(data.message || t("toast.energy_upgrade_error"));
      }
    };

    room.onMessage("error", onError);
    room.onMessage("turboBoost", onTurboBoost);
    room.onMessage("restoreInstantEnergy", onRestoreEnergy);
    room.onMessage("buyMultiTapResult", onBuyMultiTap);
    room.onMessage("buyEnergyResult", onBuyEnergyUpgrade);
    room.onStateChange(onUpdateState);

    return () => {
      room.removeAllListeners();
    };
  }, [room, setStateData, t]);

  return {
    sendClick,
    activateTurbo,
    changeLanguage,
    restoreEnergy,
    buyMultiTap,
    buyEnergyUpgrade,
  };
};
