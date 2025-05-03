import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { z } from "zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

// Определяем схему для валидируемых данных
const updateStateSchema = z.object({
  balance: z.number(),
  clickValue: z.number().optional(),
  energy: z.number().optional(),
  energyMax: z.number().optional(),
  totalClicks: z.number().optional(),
  previousLevelClicks: z.number().optional(),
  nextLevelClicks: z.number().optional(),
});

export const useGameEvents = () => {
  const { room, setStateData } = useGameStore(); // <-- берем setServerError
  const { t } = useTranslation();

  const sendClick = (position?: { left: number; top: number }) => {
    if (!room) return;
    room.send(
      "click",
      position ? { left: position.left, top: position.top } : {}
    );
    console.log("[Event] Sent: click", position);
  };

  const activateTurbo = () => {
    if (!room) return;
    room.send("activateTurbo");
    console.log("[Event] Sent: activateTurbo");
  };

  const restoreEnergy = () => {
    if (!room) return;
    room.send("restoreEnergy");
  };

  const buyMultiTap = () => {
    if (!room) return;
    room.send("buyMultiTap");
  };

  const buyEnergyUpgrade = () => {
    if (!room) return;
    room.send("buyEnergyUpgrade");
    console.log("[Event] Sent: buyEnergyUpgrade");
  };

  const changeLanguage = (language: string) => {
    if (!room) return;
    room.send("changeLanguage", { language });
    console.log("[Event] Sent: changeLanguage", language);
  };

  useEffect(() => {
    if (!room) return;

    const onUpdateState = (data: any) => {
      console.log("[Server] Received updateState:", data);

      const parseResult = updateStateSchema.safeParse(data);

      if (!parseResult.success) {
        console.error(
          "[Validation Error] Invalid updateState:",
          parseResult.error.format()
        );
        toast.error(t("toast.update_state_error")); // <-- Всплывающее уведомление
        return;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setStateData(parseResult.data);
    };

    const onError = (data: any) => {
      console.error("[Server] Received error:", data);
      toast.error(data.message || t("toast.server_error")); // <-- Всплывающее уведомление
    };

    room.onMessage("updateState", onUpdateState);
    room.onMessage("error", onError);

    return () => {
      room?.removeAllListeners();
    };
  }, [room, setStateData]);

  return {
    sendClick,
    activateTurbo,
    changeLanguage,
    restoreEnergy,
    buyMultiTap,
    buyEnergyUpgrade,
  };
};
