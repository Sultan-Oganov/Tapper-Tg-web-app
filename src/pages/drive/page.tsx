/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useRef, useState } from "react";
// @ts-ignore
import anime from "animejs";
import { useTranslation } from "react-i18next";

const Game = () => {
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState("easy");
  const [, setMessage] = useState("");
  const [, setCharacterVisible] = useState(true);
  const [, setLeftObjectVisible] = useState(true);
  const [, setRightObjectVisible] = useState(true);
  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [inputBet, setInputBet] = useState(500);

  const [isPlaying, setIsPlaying] = useState(false);

  const animatedDivRef = useRef(null);

  const animatedCharRef = useRef(null);

  const animatedCarDivRef = useRef<HTMLImageElement>(null);

  const animatedCashR = useRef(null);

  const animatedCashL = useRef(null);

  const innerCashR = useRef(null);
  const innerCashL = useRef(null);
  const scoreRound = useRef(null);

  const { t } = useTranslation();

  const handleChange = (event: any) => {
    const newValue = Math.max(0, Number(event.target.value));
    setInputBet(newValue);
  };

  const handleGuess = (direction: any) => {
    if (gameOver || gameStart) {
      return;
    }
    const correctDirection = Math.random() < 0.5 ? "left" : "right";
    setGameStart(true);
    if (direction === correctDirection) {
      anime({
        targets: scoreRound.current,
        keyframes: [
          { scale: 1.5, duration: 400 },
          { scale: 1.0, duration: 400 },
        ],
        begin: function () {
          setScore(score + inputBet * 1.5);
        },
        loop: 1,
        duration: 500,
        easing: "easeInOutSine",
      });
      setMessage(t("game.correct"));
      if (direction === "left") {
        setRightObjectVisible(false);
        anime({
          targets: animatedCashL.current,
          keyframes: [
            { translateY: -270, opacity: 0, duration: 800 },
            { translateY: 0, opacity: 1, duration: 0 },
          ],
          loop: 1,
          duration: 500,
          easing: "easeInOutSine",
        });
        anime({
          targets: innerCashL.current,
          keyframes: [
            { translateY: -270, opacity: 1, duration: 800 },
            { opacity: 1, duration: 100 },
            { opacity: 0, duration: 300 },
            { translateY: 0 },
          ],
          duration: 1300,
          easing: "easeInOutQuad",
        });
        anime({
          targets: animatedDivRef.current,
          translateY: [0, 175],
          width: [37, 200],
          height: [37, 200],
          bottom: ["32vh", 0],
          left: ["-10%", "-55%"],
          duration: 1000,
          easing: "easeInOutQuad",
          complete: () => {
            anime({
              targets: animatedDivRef.current,
              translateY: [0],
              width: [37],
              height: [37],
              bottom: ["32vh"],
              left: ["-10%"],
              duration: 0,
              easing: "easeInOutQuad",
              opacity: 100,
            });
            anime({
              targets: animatedCharRef.current,
              left: ["0"],
              duration: 0,
              easing: "easeInOutQuad",
              opacity: 100,
            });
            setGameStart(false);
          },
        });
        anime({
          targets: animatedCharRef.current,
          translateY: [0],
          left: ["50%"],
          duration: 200,
          easing: "easeInOutQuad",
          opacity: 100,
        });
        if (!isPlaying) {
          setIsPlaying(true);
          //@ts-ignore
          const img = animatedCarDivRef.current as HTMLImageElement;
          if (img) {
            // @ts-ignore
            img.src = "/explosion.gif"; // Путь к вашему GIF-файлу
            (img as HTMLImageElement).style.width = "100px"; // Увеличиваем ширину
            img.style.height = "100px"; // Увеличиваем высоту
            (img as HTMLImageElement).onload = () => {
              setTimeout(() => {
                img.src = "/gamecar.png"; // Путь к статическому изображению
                img.style.width = "37px"; // Возвращаем ширину к исходному размеру
                img.style.height = "37px"; // Возвращаем высоту к исходному размеру
                setIsPlaying(false);
              }, 1400); // Установите длительность GIF в миллисекундах
            };
          }
        }
      } else {
        setLeftObjectVisible(false);
        anime({
          targets: animatedCashR.current,
          keyframes: [
            { translateY: -270, opacity: 0, duration: 800 },
            { translateY: 0, opacity: 1, duration: 0 },
          ],
          loop: 1,
          duration: 500,
          easing: "easeInOutSine",
        });
        anime({
          targets: innerCashR.current,
          keyframes: [
            { translateY: -270, opacity: 1, duration: 800 },
            { opacity: 1, duration: 100 },
            { opacity: 0, duration: 300 },
            { translateY: 0 },
          ],
          duration: 1300,
          easing: "easeInOutQuad",
        });
        anime({
          targets: animatedCarDivRef.current,
          translateY: [0, 175],
          width: [37, 200],
          height: [37, 200],
          bottom: ["32vh", 0],
          right: ["-10%", "-55%"],
          duration: 1000,
          easing: "easeInOutQuad",
          complete: () => {
            anime({
              targets: animatedCarDivRef.current,
              translateY: [0],
              width: [37],
              height: [37],
              bottom: ["32vh"],
              right: ["-10%"],
              duration: 0,
              easing: "easeInOutQuad",
              opacity: 100,
            });
            anime({
              targets: animatedCharRef.current,
              right: ["0"],
              duration: 0,
              easing: "easeInOutQuad",
              opacity: 100,
            });
            setGameStart(false);
          },
        });
        anime({
          targets: animatedCharRef.current,
          translateY: [0],
          right: ["50%"],
          duration: 200,
          easing: "easeInOutQuad",
          opacity: 100,
        });
        if (!isPlaying) {
          setIsPlaying(true);
          const img = animatedDivRef.current;
          if (img) {
            // @ts-ignore
            img.src = "/explosion.gif";
            (img as HTMLImageElement).style.width = "100px";
            (img as HTMLImageElement).style.height = "100px";
            //@ts-ignore
            img.onload = () => {
              setTimeout(() => {
                (img as HTMLImageElement).src = "/gamecar.png";
                (img as HTMLImageElement).style.width = "37px";
                (img as HTMLImageElement).style.height = "37px";
                setIsPlaying(false);
              }, 1400);
            };
          }
        }
      }
      setTimeout(() => {
        setMessage("");
        setLeftObjectVisible(true);
        setRightObjectVisible(true);
      }, 1000);
    } else {
      setMessage(t("game.wrong"));
      anime({
        targets: [animatedCashR.current, animatedCashL.current],
        keyframes: [
          { opacity: 0, duration: 0 },
          { opacity: 0, duration: 1000 },
          { opacity: 1, duration: 0 },
        ],
        loop: 1,
        duration: 500,
        easing: "easeInOutSine",
      });
      if (correctDirection == "left") {
        anime({
          targets: animatedDivRef.current,
          translateY: [0, 175],
          width: [37, 200],
          height: [37, 200],
          bottom: ["32vh", 0],
          left: ["-10%", "-55%"],
          duration: 1000,
          easing: "easeInOutQuad",
          complete: () => {
            anime({
              targets: animatedDivRef.current,
              translateY: [0],
              width: [37],
              height: [37],
              bottom: ["32vh"],
              left: ["-10%"],
              duration: 0,
              easing: "easeInOutQuad",
              opacity: 100,
            });
            anime({
              targets: animatedCharRef.current,
              left: ["0"],
              duration: 0,
              easing: "easeInOutQuad",
              opacity: 100,
            });
            setGameStart(false);
          },
        });
        anime({
          targets: animatedCharRef.current,
          translateY: [0],
          right: ["50%"],
          duration: 300,
          easing: "easeInOutQuad",
          opacity: 100,
          complete: () => {
            anime({
              targets: animatedCharRef.current,
              bottom: ["200px"],
              duration: 200,
              easing: "easeInOutQuad",
              opacity: 300,
              complete: () => {
                anime({
                  targets: animatedCharRef.current,
                  bottom: ["-200px"],
                  duration: 300,
                  easing: "easeInOutQuad",
                  opacity: 100,
                  complete: () => {
                    anime({
                      targets: animatedCharRef.current,
                      bottom: ["90px"],
                      right: ["0%"],
                      duration: 300,
                      easing: "easeInOutQuad",
                      opacity: 100,
                    });
                  },
                });
              },
            });
          },
        });
      } else {
        anime({
          targets: animatedCarDivRef.current,
          translateY: [0, 175],
          width: [37, 200],
          height: [37, 200],
          bottom: ["32vh", 0],
          right: ["-10%", "-55%"],
          duration: 1000,
          easing: "easeInOutQuad",
          complete: () => {
            anime({
              targets: animatedCarDivRef.current,
              translateY: [0],
              width: [37],
              height: [37],
              bottom: ["32vh"],
              right: ["-10%"],
              duration: 0,
              easing: "easeInOutQuad",
              opacity: 100,
            });
            anime({
              targets: animatedCharRef.current,
              right: ["0"],
              duration: 0,
              easing: "easeInOutQuad",
              opacity: 100,
            });
            setGameStart(false);
          },
        });
        anime({
          targets: animatedCharRef.current,
          translateY: [0],
          left: ["50%"],
          duration: 300,
          easing: "easeInOutQuad",
          opacity: 100,
          complete: () => {
            anime({
              targets: animatedCharRef.current,
              bottom: ["200px"],
              duration: 200,
              easing: "easeInOutQuad",
              opacity: 300,
              complete: () => {
                anime({
                  targets: animatedCharRef.current,
                  bottom: ["-200px"],
                  duration: 300,
                  easing: "easeInOutQuad",
                  opacity: 100,
                  complete: () => {
                    anime({
                      targets: animatedCharRef.current,
                      bottom: ["90px"],
                      left: ["0%"],
                      duration: 300,
                      easing: "easeInOutQuad",
                      opacity: 100,
                    });
                  },
                });
              },
            });
          },
        });
      }
      setCharacterVisible(false);
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setMessage("");
    setCharacterVisible(true);
    setLeftObjectVisible(true);
    setRightObjectVisible(true);
    setGameOver(false);
    setScore(0);
  };
  // TODO: REFACTORING
  // TODO: CREATE COMPONENTS

  return (
    <div className="game-container px-[20px] pb-[10px] gap-[6px] flex flex-col">
      <div className="h-[57vh]">
        <div className={"relative overflow-hidden rounded-[12px]"}>
          <div
            className={
              "bg-[#181F4B7D] rounded-[32px] absolute top-[12px] left-0 right-0 mx-auto w-[calc(100%-40px)] flex justify-center items-center"
            }
          >
            <div className={"flex flex-col items-center justify-center"}>
              <div>
                <div className={"down_taps"}>
                  <div
                    onClick={() => setTheme("easy")}
                    className={`down_taps_card py-[8px] h-[32px] px-[4px] ${
                      theme === "easy" ? "active" : ""
                    }`}
                    style={{ borderRadius: 32, background: "#ffffff0d" }}
                  >
                    {t("game.themes.easy")}
                  </div>
                  <div
                    onClick={() => setTheme("medium")}
                    className={`down_taps_card py-[8px] h-[32px] px-[4px] ${
                      theme === "medium" ? "active" : ""
                    }`}
                    style={{ borderRadius: 32, background: "#ffffff0d" }}
                  >
                    {t("game.themes.medium")}
                  </div>
                  <div
                    onClick={() => setTheme("hard")}
                    className={`down_taps_card py-[8px] h-[32px] px-[4px] ${
                      theme === "hard" ? "active" : ""
                    }`}
                    style={{ borderRadius: 32, background: "#ffffff0d" }}
                  >
                    {t("game.themes.hard")}
                  </div>
                  <div
                    onClick={() => setTheme("legend")}
                    className={`down_taps_card py-[8px] h-[32px] px-[4px] ${
                      theme === "legend" ? "active" : ""
                    }`}
                    style={{ borderRadius: 32, background: "#ffffff0d" }}
                  >
                    {t("game.themes.legend")}
                  </div>
                </div>
              </div>
              <div className={"flex items-center justify-center w-full"}>
                <div
                  className={
                    "font-semibold text-center flex justify-center items-center flex-col w-[49.5%] min-w-[100px]"
                  }
                >
                  <div className={"text-[#FFFFFF7A] game__text-break"}>
                    {t("game.max_bet")}
                  </div>
                  <div>{score}</div>
                </div>
                <div className={"h-[32px] w-[1px] bg-[#FFFFFF3D]"}></div>
                <div
                  className={
                    "font-semibold text-center flex justify-center items-center flex-col w-[49.5%] min-w-[100px]"
                  }
                >
                  <div className={"text-[#FFFFFF7A] game__text-break"}>
                    {t("game.max_multiplier")}
                  </div>
                  <div>1.50x</div>
                </div>
              </div>
            </div>
          </div>
          {theme == "easy" ? (
            <img
              className={"h-[57vh] object-cover w-full"}
              src={"/gamebg.png"}
              alt="game bg"
            />
          ) : null}
          {theme == "medium" ? (
            <img
              className={"h-[57vh] object-cover w-full"}
              src={"/goverment.png"}
              alt="game bg"
            />
          ) : null}
          {theme == "hard" ? (
            <img
              className={"h-[57vh] object-cover w-full"}
              src={"/jail.png"}
              alt="game bg"
            />
          ) : null}
          {theme == "legend" ? (
            <img
              className={"h-[57vh] object-cover w-full"}
              src={"/stairs.png"}
              alt="game bg"
            />
          ) : null}
          {theme == "easy" ? (
            <img
              ref={animatedCharRef}
              className={
                "max-h-[534px] absolute bottom-[90px] right-0 left-0 mx-auto text-center max-w-[180px] z-10"
              }
              src={"/gamechar.png"}
              alt="game bg"
            />
          ) : null}
          {theme == "medium" ? (
            <img
              ref={animatedCharRef}
              className={
                "max-h-[534px] absolute bottom-[90px] right-0 left-0 mx-auto text-center max-w-[180px] z-10"
              }
              src={"/chargov.png"}
              alt="game bg"
            />
          ) : null}
          {theme == "hard" ? (
            <img
              ref={animatedCharRef}
              className={
                "max-h-[534px] absolute bottom-[90px] right-0 left-0 mx-auto text-center max-w-[180px] z-10"
              }
              src={"/charprison.png"}
              alt="game bg"
            />
          ) : null}
          {theme == "legend" ? (
            <img
              ref={animatedCharRef}
              className={
                "max-h-[534px] absolute bottom-[90px] right-0 left-0 mx-auto text-center max-w-[180px] z-10"
              }
              src={"/charprison.png"}
              alt="game bg"
            />
          ) : null}
          <img
            ref={animatedDivRef}
            className={
              "max-h-[200px] z-[2] w-[37px] h-[37px] absolute right-0 bottom-[32vh] mx-auto text-center"
            }
            src={"/gamecar.png"}
            alt="game bg"
            style={{ left: "-10%" }}
          />
          <div
            className={"absolute right-[120px] bottom-[26px]"}
            style={{ left: "-10%" }}
          >
            <div
              className={
                "mx-auto text-center w-[50px] text-white font-semibold text-lg"
              }
              ref={innerCashR}
              style={{ opacity: 0 }}
            >
              +750
            </div>
            <img
              ref={animatedCashR}
              className={
                "max-h-[200px] w-[180px] h-[180px] mx-auto text-center"
              }
              src={"/coinupd.gif"}
              alt="game bg"
              onClick={() => handleGuess("right")}
            />
          </div>
          <div
            className={"absolute left-[120px] bottom-[26px]"}
            style={{ right: "-10%" }}
          >
            <div
              className={
                "mx-auto text-center w-[50px] text-white font-semibold text-lg"
              }
              ref={innerCashL}
              style={{ opacity: 0 }}
            >
              +750
            </div>
            <img
              className={
                "max-h-[200px] w-[180px] h-[180px] mx-auto text-center"
              }
              onClick={() => handleGuess("left")}
              ref={animatedCashL}
              src={"/coinupd.gif"}
              alt="game bg"
              style={{ right: "-10%" }}
            />
          </div>
          <img
            ref={animatedCarDivRef}
            className={
              "max-h-[200px] z-[2] w-[37px] h-[37px] absolute bottom-[32vh] left-0 mx-auto text-center"
            }
            src={"/gamecar.png"}
            alt="game bg"
            style={{ right: "-10%" }}
          />
        </div>
      </div>
      {!gameOver ? (
        <div></div>
      ) : (
        <button onClick={restartGame}>{t("game.restart")}</button>
      )}
      <div
        className={
          "flex flex-col gap-[6px] p-[12px] bg-[#FFFFFF05] rounded-[12px]"
        }
      >
        <div className={"input__wrapper relative"}>
          <label className={"pl-[8px]"} style={{ color: "#FFFFFF7A" }}>
            {t("game.bet_label")}
          </label>
          <input
            value={inputBet}
            onChange={handleChange}
            min={0}
            type={"number"}
            className={"input-style"}
            placeholder={"Введите сумму"}
          />
          <div className={"flex gap-[4px] absolute bottom-[7px] right-[10px]"}>
            <div
              className={
                "btn-def w-[32px] h-[36px] flex items-center justify-center"
              }
            >
              <div className={"text-[13px]"}>1/2</div>
            </div>
            <div
              className={
                "btn-def w-[32px] h-[36px] flex items-center justify-center"
              }
            >
              <div className={"text-[13px]"}>{t("game.multiplier_double")}</div>
            </div>
            <div
              className={
                "rounded-[12px] bg-[#FFFFFF05] w-[32px] h-[36px] flex items-center justify-center"
              }
            >
              <div className={"text-[13px]"}>{t("game.multiplier_max")}</div>
            </div>
          </div>
        </div>
        <div
          className={
            "btn-def flex gap-[8px] justify-center items-center p-[15px]"
          }
        >
          <img
            className={"-rotate-45"}
            src={"/media/icons/rocket.svg"}
            alt={"def"}
          />
          <div>{t("game.bet_label")}</div>
        </div>
      </div>
    </div>
  );
};

export default Game;
