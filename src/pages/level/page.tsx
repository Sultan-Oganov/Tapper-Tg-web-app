"use client";

import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Slider from "react-slick";
import DownTabs from "@/components/global/downTabs";
import { useLevels } from "@/hooks/useLevels";
import { useLevelsStore } from "@/store/levelsStore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "@/components/misc/loader";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useGameStore } from "@/store/gameStore";
import { sendSafe } from "@/utils/sendSafe";

const levelBackgrounds = [
  "radial-gradient(50% 50% at 50% 50%, #AFC09E 0%, #81976A 100%)", // зелёный
  "radial-gradient(50% 50% at 50% 50%, #FAD199 0%, #BBA585 100%)", // жёлтый
  "radial-gradient(50% 50% at 50% 50%, #FFE18A 0%, #E4B838 100%)", // золотой
];

// const mockPlayers = Array.from({ length: 10 }, (_, i) => ({
//   name: "Fredy Bob",
//   score: "23K",
//   avatar: "/media/images/man_yellow.png",
//   place: i + 1,
// }));

export default function Level() {
  useLevels();
  const { room } = useGameStore();
  const { levels, current, topPlayers, setLevels } = useLevelsStore();
  const { t } = useTranslation();

  const sliderRef = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wasManuallyScrolled, setWasManuallyScrolled] = useState(false);

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_: number, next: number) => {
      setCurrentSlide(next);

      if (!wasManuallyScrolled) {
        setWasManuallyScrolled(true);
        return;
      }

      const levelToSend = levels[next]?.level;

      // ⛔ блокируем бесконечную пересылку
      if (room && levelToSend && levelToSend !== current) {
        sendSafe(room, "helpLevels", { level: levelToSend });
      }
    },
  };

  useEffect(() => {
    if (!sliderRef.current || !levels?.length || !current) return;

    const index = levels.findIndex((l) => l.level === current);
    if (index >= 0) {
      sliderRef.current.slickGoTo(index, true);
    }
  }, [levels, current]);

  return (
    <div className={"h-[calc(100vh-75px)] flex flex-col justify-between"}>
      <div className={"flex flex-col justify-between px-5"}>
        {levels.length > 0 ? (
          <div className="flex items-center justify-center gap-4 relative">
            <button
              onClick={previous}
              className="group cursor-pointer absolute left-3.5 z-10"
            >
              <img
                className="w-6 h-6 rotate-180"
                src="/media/icons/arrow.svg"
                alt="prev"
              />
              <div className="text-[#FFFFFF3D] text-base font-semibold transition absolute left-0">
                {levels[currentSlide - 1]?.name || ""}
              </div>
            </button>

            <div
              className="w-full rounded-xl"
              style={{
                background:
                  levelBackgrounds[currentSlide % levelBackgrounds.length],
              }}
            >
              <Slider ref={sliderRef} {...settings}>
                {levels.map((item) => {
                  // const isCurrent = item.level === current;

                  return (
                    <div
                      key={item.level}
                      className={clsx(
                        "!flex h-full flex-col items-center justify-center p-3.5 pt-3"
                      )}
                    >
                      <div className="text-center mb-3">
                        <div className="text-sm text-white/60">
                          {t("level.level")}
                        </div>
                        <div className="text-xl font-bold text-white">
                          {item?.name}
                        </div>

                        {/* <div className="text-md  font-bold text-center mb-1 min-h-6">
                          {isCurrent && t("level.your_level")}
                        </div> */}
                      </div>
                      <img
                        src="/media/images/green-cashier.png"
                        className="w-full h-full object-contain max-w-52 max-h-52"
                      />
                      <div className="flex items-center justify-center gap-1 mt-2 text-white font-bold">
                        <img
                          src="/media/icons/bitcoin.svg"
                          className="w-5 h-5"
                        />
                        {item.tap.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>

            <button
              onClick={next}
              className="group cursor-pointer absolute right-3.5 z-10"
            >
              <img
                className="w-6 h-6"
                src="/media/icons/arrow.svg"
                alt="next"
              />
              <div className="text-[#FFFFFF3D] text-base font-semibold transition absolute right-0">
                {levels[currentSlide + 1]?.name || ""}
              </div>
            </button>
          </div>
        ) : (
          <Loader />
        )}

        <div className="flex flex-col gap-2 mt-4 h-[calc(55vh-75px)] overflow-y-auto">
          {topPlayers.length > 0 ? (
            topPlayers.map((player, i) => (
              <div
                key={`${player?.username}-${i}`}
                className="friends_invited_frame py-[8px] px-[12px] flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={"/media/images/man_yellow.png"}
                    alt={player?.username}
                  />
                  <div>
                    <div className="font-bold text-white">
                      {player?.username}
                    </div>
                    <div className="flex items-center gap-1 text-white/70 text-sm">
                      <img
                        src="/media/icons/bitcoin.svg"
                        className="!w-5 !h-5"
                      />
                      {player?.balance?.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-white font-bold text-sm">
                  <span>{player?.total}</span>
                  <img src={`/media/icons/medal.png`} className="w-5 h-5" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-white/60 text-center mt-6">
              {t("level.no_players")}
            </div>
          )}
        </div>
      </div>
      <DownTabs />
    </div>
  );
}
