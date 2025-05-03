import { create } from "zustand";
import { Reward } from "@/types/gameEvents";

// const mockRewards: Reward[] = [
//   { day: 1, reward: 100, isCollected: true, isAvailable: false },
//   { day: 2, reward: 100, isCollected: false, isAvailable: true },
//   { day: 3, reward: 100, isCollected: false, isAvailable: false },
//   { day: 4, reward: 100, isCollected: false, isAvailable: false },
//   { day: 5, reward: 100, isCollected: false, isAvailable: false },
//   { day: 6, reward: 100, isCollected: false, isAvailable: false },
//   { day: 7, reward: 100, isCollected: false, isAvailable: false },
//   { day: 8, reward: 100, isCollected: false, isAvailable: false },
//   { day: 9, reward: 100, isCollected: false, isAvailable: false },
//   { day: 10, reward: 100, isCollected: false, isAvailable: false },
// ];

interface DailyRewardState {
  rewards: Reward[];
  setRewards: (rewards: Reward[]) => void;
}

export const useDailyRewardStore = create<DailyRewardState>((set) => ({
  rewards: [],
  setRewards: (rewards) => set({ rewards }),
}));
