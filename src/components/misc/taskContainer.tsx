"use client";

import { useEffect, useState } from "react";
import { useTasksStore } from "@/store/tasksStore";
import { useTasks } from "@/hooks/useTasks";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const taskIcons: Record<string, string> = {
  subscribe_channel: "/media/images/tg.png",
  follow_x: "/media/images/x.png",
  invite_friends_3: "/media/images/friends.png",
  invite_friends_10: "/media/images/friends.png",
  deposit_10: "/media/icons/bitcoin.svg",
  play_crash_10: "/media/icons/bitcoin.svg",
};

export default function TaskContainer() {
  const { tasks } = useTasksStore();
  const { requestTasks, claimTask } = useTasks();
  const { t } = useTranslation();
  const [subscribedTasks, setSubscribedTasks] = useState<number[]>([]);

  const taskTitles: Record<string, string> = {
    subscribe_channel: t("taskTitles.subscribe_channel"),
    follow_x: t("taskTitles.follow_x"),
    invite_friends_3: t("taskTitles.invite_friends_3"),
    invite_friends_10: t("taskTitles.invite_friends_10"),
    deposit_10: t("taskTitles.deposit_10"),
    play_crash_10: t("taskTitles.play_crash_10"),
  };

  const handleSubscribe = (taskId: number) => {
    setSubscribedTasks((prev) => [...prev, taskId]);
  };

  useEffect(() => {
    requestTasks();
  }, []);

  if (tasks.length === 0) {
    return <p className="text-white/50 text-center py-4">{t("tasks.empty")}</p>;
  }

  return (
    <div className="tasks_container">
      {tasks.map((task) => {
        const isCanClick =
          (task.status === "claim" || task.status === "active") &&
          !task.finished;
        const isSubscribed = subscribedTasks.includes(task.id);

        return (
          <div
            key={task.id}
            className={clsx(
              "tasks_frame py-[11px] px-[14px] flex items-center gap-[12px]",
              task.finished && "opacity-50 pointer-events-none"
            )}
          >
            <img
              src={taskIcons[task.task] || "/media/images/tasks.png"}
              alt="task icon"
              className="min-w-9 min-h-9 max-w-9 max-h-9 rounded-xl"
            />

            <div className="flex flex-col gap-[6px] flex-1">
              <div className="tasks_frame_info_title text-white text-[14px] font-bold">
                {taskTitles[task.task] || t("taskTitles.default")}
              </div>
              <div className="flex items-center gap-1 text-[#FFD55A] text-[14px] font-medium">
                <img
                  src="/media/icons/bitcoin.svg"
                  className="min-w-4 min-h-4 max-w-4 max-h-4"
                />
                +{task.reward}
              </div>
            </div>

            <div className="flex gap-2">
              {task.url && task.status === "active" && !isSubscribed && (
                <a
                  href={task.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#2B3569] text-white px-2 py-2 rounded-lg text-sm flex items-center justify-center hover:bg-[#3B4579] transition-colors max-w-fit"
                  onClick={() => handleSubscribe(task.id)}
                >
                  {t("tasks.subscribe")}
                </a>
              )}
              {!task.finished && (
                <button
                  onClick={() => claimTask(task.id)}
                  className="bg-[#2B3569] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#3B4579] transition-colors"
                >
                  {t("tasks.claim")}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
