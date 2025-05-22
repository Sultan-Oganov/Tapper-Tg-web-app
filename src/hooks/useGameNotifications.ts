import { useGameStore } from "@/store/gameStore";
import { useEffect } from "react";
import { toast } from "sonner";

export const useGameNotifications = () => {
  const { room } = useGameStore();

  useEffect(() => {
    if (!room) return;

    room.onMessage("cardsInfo", (data) => {
      console.log("[Server] cardsInfo", data);
      // openModalCards(data)
    });

    room.onMessage("profitCardsBuyStatus", (data) => {
      toast.success(data.message);
    });

    room.onMessage("buyEnergyResult", (data) => {
      if (!data.success) toast.error(data.message);
    });

    room.onMessage("buyMultiTapResult", (data) => {
      if (!data.success) toast.error(data.message);
    });

    room.onMessage("restoreInstantEnergy", (data) => {
      if (!data.success) toast.error(data.message);
    });

    room.onMessage("turboBoost", (data) => {
      if (!data.success) {
        toast.error(data.message);
      } else {
        console.log("[Server] turboBoost", data);
      }
    });
  }, [room]);
};
