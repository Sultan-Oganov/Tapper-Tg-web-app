// src/hooks/useGameNotifications.ts
"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const useGameNotifications = () => {
  const { room } = useGameStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (!room) return;

    const unsubscribers = [
      room.onMessage("turboBoost", (data) => {
        console.log("[Server] turboBoost", data);
        if (data.success && data.code === "Enable") {
          toast.success(t("toast.turbo_activated"));
        } else {
          toast.error(data.message || t("toast.turbo_error"));
        }
      }),

      room.onMessage("restoreInstantEnergy", (data) => {
        console.log("[Server] restoreInstantEnergy", data);
        if (data.success && data.code === "OK") {
          toast.success(t("toast.energy_restored"));
        } else {
          toast.error(data.message || t("toast.energy_restore_error"));
        }
      }),

      room.onMessage("buyEnergyResult", (data) => {
        console.log("[Server] buyEnergyResult", data);
        if (data.success) {
          toast.success(t("toast.energy_upgrade_success"));
        } else {
          toast.error(data.message || t("toast.energy_upgrade_error"));
        }
      }),

      room.onMessage("buyMultiTapResult", (data) => {
        console.log("[Server] buyMultiTapResult", data);
        if (data.success) {
          toast.success(t("toast.multitap_upgrade_success"));
        } else {
          toast.error(data.message || t("toast.multitap_upgrade_error"));
        }
      }),
    ];

    return () => {
      unsubscribers.forEach((unsub) => unsub?.());
    };
  }, [room]);
};
