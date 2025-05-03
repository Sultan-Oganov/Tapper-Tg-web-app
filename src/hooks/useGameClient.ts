import { useEffect, useRef } from "react";
import * as Colyseus from "colyseus.js";
import { useGameStore } from "@/store/gameStore";
// import { getTestToken } from "@/utils/getToken";
import Cookies from "js-cookie";

const SERVER_URL = "wss://server.cryptosteron.com";
const ROOM_NAME = "clicker";
const MAX_RECONNECT_ATTEMPTS = 1000;
const RECONNECT_INTERVAL = 5000; // 5 секунд

export const useGameClient = () => {
  const {
    room,
    setRoom,
    setStateData,
    setIsConnected,
    setIsConnecting,
    setIsReconnecting,
    setError,
    setPlayerId,
  } = useGameStore();

  const clientRef = useRef<Colyseus.Client>(null);
  const reconnectAttempts = useRef(0);
  const reconnectTimeout = useRef<any | null>(null);
  const isManualDisconnect = useRef(false); // Чтобы отличать выход по кнопке от обрыва

  const connect = async (isRetry = false) => {
    try {
      if (isRetry) {
        setIsReconnecting(true);
      } else {
        setIsConnecting(true);
      }

      console.log(
        `[Colyseus] ${isRetry ? "Reconnecting" : "Connecting"} to server...`
      );

      //DEV DESKTOP
      // const token = await getTestToken();
      //PROD TELEGRAM
      const token = Cookies.get("token");

      const client = new Colyseus.Client(SERVER_URL);
      clientRef.current = client;

      const room = await client.joinOrCreate(ROOM_NAME, { token });

      console.log("[Colyseus] Connected to room:", room.id);

      setRoom(room);
      setIsConnected(true);
      setError(null);
      reconnectAttempts.current = 0;

      // События комнаты
      room.onStateChange((state) => {
        setStateData(state as any);
        console.log("[Colyseus] Room state updated:", state);
      });

      room.onMessage("serverTime", (data) => {
        console.log("[Server] serverTime", data);
        setPlayerId(data?.playerId);
      });

      room.onMessage("ping", () => {
        room.send("pong");
        console.log("[Colyseus] Received ping, sent pong");
      });

      room.onLeave((code) => {
        console.warn("[Colyseus] Left room, code:", code);
        if (!isManualDisconnect.current) {
          reconnect("Disconnected from room");
        }
      });

      room.onError((code, message) => {
        console.error("[Colyseus] Room error:", code, message);
        if (!isManualDisconnect.current) {
          reconnect(`Room error: ${message}`);
        }
      });
    } catch (err: any) {
      console.error("[Colyseus] Connection error:", err.message || err);
      if (!isManualDisconnect.current) {
        reconnect(err.message || "Unknown connection error");
      }
    } finally {
      setIsConnecting(false);
      setIsReconnecting(false);
    }
  };

  const reconnect = (reason: string) => {
    console.warn("[Colyseus] Reconnect triggered. Reason:", reason);
    setIsConnected(false);
    setError(reason);

    if (reconnectAttempts.current >= MAX_RECONNECT_ATTEMPTS) {
      console.error(
        "[Colyseus] Max reconnect attempts reached. Stopping reconnect."
      );
      return;
    }

    reconnectAttempts.current++;
    console.log(
      `[Colyseus] Attempting reconnect #${reconnectAttempts.current} in ${
        RECONNECT_INTERVAL / 1000
      }s...`
    );

    reconnectTimeout.current = setTimeout(() => {
      connect(true); // <-- Передаем флаг, что это переподключение
    }, RECONNECT_INTERVAL);
  };

  const leaveRoom = async () => {
    console.log("[Colyseus] Manual leaveRoom called");
    isManualDisconnect.current = true;
    const { room } = useGameStore.getState();
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
    connect(); // Первичное подключение

    return () => {
      console.log("[Colyseus] Cleaning up connection...");
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      isManualDisconnect.current = true;
      room?.leave(); // 👈 вместо clientRef.current?.close();
    };
  }, []);

  return {
    leaveRoom,
  };
};
