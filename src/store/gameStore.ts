import { create } from "zustand";
import { Room } from "colyseus.js";
import { RoomState } from "@/types/gameEvents";

export interface GameState {
  room: Room<any> | null;
  isConnected: boolean;
  isConnecting: boolean;
  isReconnecting: boolean;
  error: string | null;
  stateData: RoomState | null; // <-- строго типизированное состояние
  playerId: number | null;

  setRoom: (room: Room<any> | null) => void;
  setIsConnected: (isConnected: boolean) => void;
  setIsConnecting: (isConnecting: boolean) => void;
  setIsReconnecting: (isReconnecting: boolean) => void;
  setError: (error: string | null) => void;
  setStateData: (state: RoomState) => void; // <-- типизируем вход
  setPlayerId: (id: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  room: null,
  isConnected: false,
  isConnecting: false,
  isReconnecting: false,
  error: null,
  stateData: null,
  playerId: null,

  setRoom: (room) => set({ room }),
  setIsConnected: (isConnected) => set({ isConnected }),
  setIsConnecting: (isConnecting) => set({ isConnecting }),
  setIsReconnecting: (isReconnecting) => set({ isReconnecting }), // <-- добавили
  setError: (error) => set({ error }),
  setStateData: (state) => set({ stateData: state }), // <-- типизируем вход
  setPlayerId: (id) => set({ playerId: id }),
}));
