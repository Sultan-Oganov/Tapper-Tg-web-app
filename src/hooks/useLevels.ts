"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { useLevelsStore } from "@/store/levelsStore";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const useLevels = () => {
  const { room, stateData } = useGameStore();
  const { setLevels, setTopPlayers } = useLevelsStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (!room || !stateData?.level) return;
    // Отправка с указанием текущего уровня
    room.send("helpLevels", { level: stateData.level });

    const unsubscribe = room.onMessage("levelsData", (data) => {
      console.log("[levelsData] получено от сервера:", data);

      if (!data?.levels?.length) {
        toast.error(t("toast.levels_load_error"));
        return;
      }

      setLevels(data.currentLevel ?? 0, data.levels);
      if (data.requestedLevel?.rating) {
        setTopPlayers(data.requestedLevel.rating);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [room, setLevels, setTopPlayers, stateData?.level]);
};
