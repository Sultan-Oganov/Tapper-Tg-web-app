"use client";

import { useGameEvents } from "@/hooks/useGameEvents";
import { useGameStore } from "@/store/gameStore";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Loader from "../misc/loader";
import { useTranslation } from "react-i18next";

const MAX_TOUCHES = 3;

export default function DefaultTapper() {
  const { sendClick } = useGameEvents();
  const { stateData } = useGameStore();
  const divRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [messages, setMessages] = useState<
    { id: number; text: string; offset: number }[]
  >([]);
  const [charge] = useState(500); // TODO: заменить на реальную энергию

  const getRandomOffset = () => Math.floor(Math.random() * 100) + 50;
  const wasTouched = useRef(false); // 👈 добавляем флаг

  // Показываем всплывающий текст
  const handleClick = () => {
    const text =
      charge <= 4
        ? t("home.no_charge")
        : String(
            stateData?.turboBoostStatus
              ? (stateData.clickValue ?? 0) * 2
              : stateData?.clickValue ?? 0
          );

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        offset: getRandomOffset(),
      },
    ]);
  };

  // Обработка клика мышкой
  const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !stateData) return;

    if (wasTouched.current) {
      wasTouched.current = false; // 👈 сбрасываем — клик после тача игнорим
      return;
    }

    const rect = divRef.current.getBoundingClientRect();

    sendClick({
      left: e.clientX - rect.left,
      top: e.clientY - rect.top,
    });

    handleClick();
  };

  // Обработка тачскрина
  const handleTouch = (event: React.TouchEvent) => {
    event.preventDefault();
    if (!divRef.current || !stateData) return;

    wasTouched.current = true; // 👈 ставим флаг

    if (event.touches.length <= MAX_TOUCHES) {
      const touch = event.touches[0];
      const rect = divRef.current.getBoundingClientRect();

      sendClick({
        left: touch.clientX - rect.left,
        top: touch.clientY - rect.top,
      });

      handleClick();
    }
  };

  // Удаляем всплывающие сообщения через 3 секунды
  useEffect(() => {
    messages.forEach((message) => {
      const timer = setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== message.id));
      }, 3000);
      return () => clearTimeout(timer);
    });
  }, [messages]);

  return (
    <div className="boost">
      <div className="boost_frame px-[12px]">
        {!stateData ? (
          <Loader />
        ) : (
          <>
            <div
              className="boost_frame_machine !relative"
              ref={divRef}
              onClick={handleDivClick}
              onTouchStart={handleTouch}
            >
              {messages.map((msg) => (
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
              <Link
                to="/boost"
                state={{ showBoost: true }}
                className="yellow-background"
              >
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
