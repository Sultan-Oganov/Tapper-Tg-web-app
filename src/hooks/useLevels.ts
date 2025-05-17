import { useEffect, useRef } from "react";
import { useGameStore } from "@/store/gameStore";
import { useLevelsStore } from "@/store/levelsStore";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { sendSafe } from "@/utils/sendSafe";

export const useLevels = () => {
  const { room, stateData } = useGameStore();
  const { setLevels, setTopPlayers } = useLevelsStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (!room) return;

    sendSafe(room, "helpLevels", {});

    const unsubscribe = room.onMessage("levelsData", (data) => {
      console.log("[levelsData] получено от сервера:", data);

      if (!data?.levels?.length) {
        toast.error(t("toast.levels_load_error"));
        return;
      }

      const activeLevel = data.currentLevel;

      setLevels(activeLevel, data.levels);

      if (data.requestedLevel?.rating) {
        setTopPlayers(data.requestedLevel.rating);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [room, setLevels, setTopPlayers]);
};
