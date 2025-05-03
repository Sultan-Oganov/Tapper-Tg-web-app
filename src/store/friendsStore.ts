import { create } from "zustand";
import { InvitedFriend } from "@/types/gameEvents";

interface FriendsState {
  friends: InvitedFriend[];
  total: number;
  page: number;
  isLoading: boolean;
  setFriends: (friends: InvitedFriend[], total: number) => void;
  appendFriends: (newFriends: InvitedFriend[], total: number) => void;
  startLoading: () => void;
  stopLoading: () => void;
  reset: () => void;
}

export const useFriendsStore = create<FriendsState>((set) => ({
  friends: [],
  total: 0,
  page: 1,
  isLoading: false,
  setFriends: (friends, total) =>
    set({ friends, total, page: 1, isLoading: false }),
  appendFriends: (newFriends, total) =>
    set((state) => ({
      friends: [...state.friends, ...newFriends],
      total,
      isLoading: false,
    })),
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
  reset: () => set({ friends: [], total: 0, page: 1 }),
}));
