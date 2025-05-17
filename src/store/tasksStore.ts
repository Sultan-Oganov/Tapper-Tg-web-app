import { create } from "zustand";
import { Task } from "@/types/gameEvents";

interface TasksState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  removeTask: (taskId: number) => void;
}

export const useTasksStore = create<TasksState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  removeTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
}));
