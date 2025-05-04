import { useEffect, useCallback } from "react";
import { useGameStore } from "@/store/gameStore";
import { useTasksStore } from "@/store/tasksStore";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { sendSafe } from "@/utils/sendSafe";
import { useGameClient } from "./useGameClient";

export const useTasks = () => {
  const { room } = useGameStore();
  const { setTasks, updateTask } = useTasksStore();
  const { reconnect } = useGameClient();
  const { t } = useTranslation();

  const requestTasks = useCallback(() => {
    if (!room) return;
    sendSafe(room, "getTasks", {}, () => reconnect("getTasks"));
    console.log("[Client] Sent: getTasks");
  }, [room]);

  const claimTask = useCallback(
    (taskId: number) => {
      if (!room) return;
      sendSafe(room, "getTaskReward", { taskId });
      console.log("[Client] Sent: getTaskReward", taskId);
    },
    [room]
  );

  useEffect(() => {
    if (!room) return;

    const unsubscribeList = room.onMessage("taskList", (data) => {
      console.log("[Server] taskList", data);
      if (data.status) setTasks(data.tasks);
    });

    const unsubscribeStatus = room.onMessage("taskStatus", (data) => {
      console.log("[Server] taskStatus", data);
      if (data.status) {
        toast.success(
          t("toasts.task_reward_success", { amount: data.reward.claim })
        );
        updateTask(data.reward.taskId);
      } else {
        toast.error(data.message || t("toasts.task_reward_error"));
      }
    });

    return () => {
      unsubscribeList();
      unsubscribeStatus();
    };
  }, [room]);

  return { requestTasks, claimTask };
};
