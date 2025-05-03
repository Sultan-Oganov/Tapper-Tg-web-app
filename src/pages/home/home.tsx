"use client";

import Loader from "@/components/misc/loader";
import ExtendedTapper from "@/components/tapper/extendedTapper";
import { useGameStore } from "@/store/gameStore";

export default function Home() {
  const { isConnecting, isReconnecting, stateData } = useGameStore();

  if (isConnecting || isReconnecting || !stateData) {
    return <Loader />;
  }

  return (
    <div className={"px-[20px] flex flex-col justify-between"}>
      <ExtendedTapper />
    </div>
  );
}
