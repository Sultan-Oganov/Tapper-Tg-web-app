import { create } from "zustand";
import type { Card, CardMenu } from "@/types/gameEvents";

interface CardsState {
  cards: Card[];
  menu: CardMenu[];
  isLoading: boolean;
  setCards: (cards: Card[]) => void;
  setMenu: (menu: CardMenu[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useCardsStore = create<CardsState>((set) => ({
  cards: [],
  menu: [],
  isLoading: false,
  setCards: (cards) => set({ cards }),
  setMenu: (menu) => set({ menu }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
