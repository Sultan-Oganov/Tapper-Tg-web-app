import { useEffect, useRef } from "react";
import * as Colyseus from "colyseus.js";
import { useGameStore } from "@/store/gameStore";
// import { getTestToken } from "@/utils/getToken";
import { sendSafe } from "@/utils/sendSafe";
import Cookies from "js-cookie";

const SERVER_URL = "wss://server.cryptosteron.com";
const ROOM_NAME = "clicker";
const RECONNECT_INTERVAL = 5000;
const MAX_RECONNECT_ATTEMPTS = 1000;

export const useGameClient = () => {
  const {
    setRoom,
    setStateData,
    setIsConnected,
    setIsConnecting,
    setIsReconnecting,
    setError,
    setPlayerId,
  } = useGameStore();

  const clientRef = useRef<Colyseus.Client | null>(null);
  const reconnectAttempts = useRef(0);
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isConnecting = useRef(false);
  const isManualDisconnect = useRef(false);

  const connect = async () => {
    if (
      isConnecting.current ||
      reconnectAttempts.current >= MAX_RECONNECT_ATTEMPTS
    )
      return;
    isConnecting.current = true;
    setIsConnecting(true);

    try {
      //DEV DESKTOP
      // const token = await getTestToken();
      //PROD TELEGRAM
      const token = Cookies.get("token");
      const client = new Colyseus.Client(SERVER_URL);
      clientRef.current = client;

      const room = await client.joinOrCreate(ROOM_NAME, { token });
      reconnectAttempts.current = 0;

      room.onStateChange((state) => {
        setStateData(state as any);
      });

      room.onMessage("serverTime", (data) => {
        setPlayerId(data?.playerId);
      });

      room.onMessage("ping", () => {
        sendSafe(room, "pong");
      });

      room.onMessage("pong", (data) => {
        if (data?.pingTime) {
          const latency = Date.now() - data.pingTime;
          console.log(`[Colyseus] Latency: ${latency}ms`);
          const currentState = useGameStore.getState().stateData;
          if (currentState) {
            setStateData({
              ...currentState,
              latency,
              connectionQuality: Math.max(
                0,
                Math.min(100, 100 - (latency / 1000) * 100)
              ),
            });
          }
        }
      });

      setRoom(room);
      setIsConnected(true);
      setError(null);

      room.onLeave(() => {
        handleDisconnection("Disconnected from room");
      });

      room.onError(() => {
        handleDisconnection("Room error");
      });
    } catch (err: any) {
      console.error("[Colyseus] Connection failed", err);
      handleDisconnection("Connection failed");
    } finally {
      isConnecting.current = false;
      setIsConnecting(false);
      setIsReconnecting(false);
    }
  };

  const handleDisconnection = (reason: string) => {
    console.warn(`[Colyseus] ${reason}`);
    setIsConnected(false);
    setError(reason);
    reconnectAttempts.current++;

    if (reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS) {
      setIsReconnecting(true);
      reconnectTimeout.current = setTimeout(() => {
        connect();
      }, RECONNECT_INTERVAL);
    } else {
      setError("Max reconnect attempts reached.");
    }
  };

  const leaveRoom = async () => {
    console.log("[Colyseus] Manual leaveRoom called");
    isManualDisconnect.current = true;
    const room = useGameStore.getState().room;
    if (room) {
      try {
        await room.leave();
        console.log("[Colyseus] Successfully left the room.");
      } catch (err) {
        console.error("[Colyseus] Error leaving room:", err);
      } finally {
        setRoom(null);
        setIsConnected(false);
      }
    }
  };

  useEffect(() => {
    connect();

    return () => {
      console.log("[Colyseus] Cleaning up connection...");
      isManualDisconnect.current = true;
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      const room = useGameStore.getState().room;
      if (room) {
        room.leave();
      }
      setRoom(null);
      setIsConnected(false);
    };
  }, []);

  return {
    leaveRoom,
    reconnect: connect,
  };
};
