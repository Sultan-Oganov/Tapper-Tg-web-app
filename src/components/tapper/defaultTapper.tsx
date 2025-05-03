"use client";

import { useGameEvents } from "@/hooks/useGameEvents";
import { useGameStore } from "@/store/gameStore";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Loader from "../misc/loader";
import { useTranslation } from "react-i18next";

export default function DefaultTapper() {
  const { sendClick } = useGameEvents(); // подключаем отправку событий

  const { stateData } = useGameStore();
  const divRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<
    { id: number; text: string; offset: number }[]
  >([]);
  const [charge] = useState(500);
  const { t } = useTranslation();
  const getRandomOffset = () => Math.floor(Math.random() * 100) + 50;

  const handleClick = () => {
    if (charge <= 4) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Нет заряда",
          offset: getRandomOffset(),
        },
      ]);
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: String(stateData?.clickValue ?? 0),
        offset: getRandomOffset(),
      },
    ]);
  };

  const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !stateData) return;

    const rect = divRef.current.getBoundingClientRect();

    sendClick({
      left: e.clientX - rect.left,
      top: e.clientY - rect.top,
    });

    handleClick();
  };

  useEffect(() => {
    messages.forEach((message) => {
      const timer = setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== message.id));
      }, 3000);
      return () => clearTimeout(timer);
    });
  }, [messages]);

  return (
    <div className={"boost"}>
      <div className={"boost_frame px-[12px]"}>
        {!stateData ? (
          <Loader />
        ) : (
          <>
            <div
              className="boost_frame_machine !relative"
              ref={divRef}
              onClick={handleDivClick}
            >
              {messages?.map((msg) => (
                <div
                  key={msg.id}
                  className="floating-text"
                  style={{ left: `${msg.offset}px`, top: 0 }}
                >
                  {msg.text}
                </div>
              ))}
              <img
                src="/media/images/cashier.png"
                draggable={false}
                alt="cashier"
              />
            </div>
            <div className="boost_buttons">
              <Link to="/boost" className="yellow-background">
                <div className="boost_icon">
                  <img src="/media/icons/lighting.png" />
                </div>
                <div className="boost_text">
                  {stateData?.energy}/{stateData?.energyMax}
                </div>
              </Link>
              <Link to="/booster" className="blue-background">
                <div className="boost_icon">
                  <img src="/media/icons/shuttle.png" />
                </div>
                <div className="boost_text">{t("buttons.boost")}</div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
