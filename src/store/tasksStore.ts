import { create } from "zustand";
import { Task } from "@/types/gameEvents";

// const mockTasks: Task[] = [
//   {
//     id: 1,
//     task: "subscribe_channel",
//     url: "https://t.me/examplechannel",
//     reward: 5000,
//     finished: false,
//     completedAt: null,
//     status: "active",
//   },
//   {
//     id: 2,
//     task: "follow_x",
//     url: "https://x.com/exampleprofile",
//     reward: 5000,
//     finished: false,
//     completedAt: null,
//     status: "claim",
//   },
//   {
//     id: 3,
//     task: "invite_friends_3",
//     url: null,
//     reward: 5000,
//     finished: true,
//     completedAt: Date.now(),
//     status: "completed",
//   },
// ];
interface TasksState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  updateTask: (taskId: number) => void;
}

export const useTasksStore = create<TasksState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  updateTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
}));
