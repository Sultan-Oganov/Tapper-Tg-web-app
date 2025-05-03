import { create } from "zustand";
import { PlayerRating, TapLevel } from "@/types/gameEvents";

interface LevelsState {
  current: number;
  levels: TapLevel[];
  topPlayers: PlayerRating[];
  setLevels: (current: number, levels: TapLevel[]) => void;
  setTopPlayers: (players: PlayerRating[]) => void;
}

export const useLevelsStore = create<LevelsState>((set) => ({
  current: 0,
  levels: [],
  topPlayers: [],
  setLevels: (current, levels) => set({ current, levels }),
  setTopPlayers: (players) => set({ topPlayers: players }),
}));
