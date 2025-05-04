import type { Room } from "colyseus.js";

export function sendSafe<T = any>(
  room: Room | null,
  type: string,
  data?: T,
  onFail?: () => void
) {
  const isOpen = room?.connection?.isOpen;
  if (!room || !isOpen) {
    console.warn(`[sendSafe] Can't send '${type}' — socket not open.`);
    return;
  }

  try {
    room.send(type, data);
    console.log(`[sendSafe] Sent '${type}'`, data);
  } catch (err) {
    console.error(`[sendSafe] Failed to send '${type}':`, err);
    if (onFail) onFail();
  }
}
