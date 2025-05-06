"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import ProgressBar from "@/components/misc/progressBar";
import BoosterBuy from "@/components/tapper/boosterBuy";
import MainControllerTab from "@/components/misc/tabs/mainControllerTab";
import { useGameStore } from "@/store/gameStore";
import { useGameEvents } from "@/hooks/useGameEvents";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const MAX_TOUCHES = 3;

export default function ExtendedTapper() {
  const { sendClick } = useGameEvents(); // подключаем отправку событий

  const { stateData } = useGameStore();
  const divRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<
    { id: number; text: string; offset: number }[]
  >([]);
  const [DefaultBoost] = useState(false);
  const [charge] = useState(500);
  const { t } = useTranslation();

  const getRandomOffset = () => Math.floor(Math.random() * 100) + 50;

  const wasTouched = useRef(false); // флаг для touch

  const handleClick = () => {
    const text =
      charge <= 4 ? t("home.no_charge") : String(stateData?.clickValue ?? 0);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        offset: getRandomOffset(),
      },
    ]);
  };

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

  useEffect(() => {
    messages.forEach((message) => {
      const timer = setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== message.id));
      }, 3000);
      return () => clearTimeout(timer);
    });
  }, [messages]);

  const TapperBase = useMemo(
    () =>
      !stateData ? null : (
        <>
          <div
            className="boost_frame_machine !relative"
            ref={divRef}
            onClick={handleDivClick}
            onTouchStart={handleTouch}
          >
            <img
              src="/media/images/cashier.png"
              draggable={false}
              alt="cashier"
            />
            {messages?.map((msg) => (
              <div
                key={msg.id}
                className="floating-text"
                style={{ left: `${msg.offset}px`, top: 0 }}
              >
                {msg.text}
              </div>
            ))}
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
      ),
    [messages, stateData, t]
  );

  const progress =
    stateData && stateData?.nextLevelClicks > 0
      ? ((stateData?.totalClicks - stateData?.previousLevelClicks) /
          (stateData?.nextLevelClicks - stateData?.previousLevelClicks)) *
        100
      : 100;

  return (
    <div className="boost">
      <div className="boost_frame px-[12px]">
        <div className="taper_info">
          {[
            {
              label: t("home.tapper_click"),
              value: `+${stateData?.multiTapLevel}`,
            },
            {
              label: t("home.tapper_to_upgrade"),
              value: stateData?.clicksRemainingForNextLevel,
            },
            {
              label: t("home.tapper_per_hour"),
              value: stateData?.profitPerHour,
            },
          ].map(({ label, value }, i) => (
            <div className="taper_info_section" key={i}>
              <div className="taper_info_section_clarification">{label}</div>
              <div className="taper_info_section_counting">
                <img src="/media/icons/bitcoin.svg" />
                <div className="taper_info_section_counting-quantity">
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="taper_wallet">
          <img src="/media/icons/bitcoin.svg" />
          <div className="taper_wallet_amount font-[family-name:var(--font-calculatrix)]">
            {stateData?.balance?.toLocaleString()}
          </div>
        </div>

        {!DefaultBoost ? (
          <>
            <BoosterBuy />
            <MainControllerTab />
          </>
        ) : (
          TapperBase
        )}

        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between w-full progress-text gap-[8px]">
            <Link to="/level">
              {t("home.lvl_prefix")} {stateData?.energyMaxLevel}
            </Link>
            <div>{Math.round(progress)}%</div>
          </div>
          <ProgressBar energy={progress} />
        </div>

        {!DefaultBoost && TapperBase}
      </div>
    </div>
  );
}
