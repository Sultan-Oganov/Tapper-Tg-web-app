"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import SwitchCoin from "@/components/misc/header/switchCoin";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../misc/languageSwitcher";
import { useTranslation } from "react-i18next";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div onClick={() => setIsOpen(true)} className={"header_menu"}>
        <img src={"/media/icons/menu.svg"} alt="menu" />
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="z-50">
        <div className="fixed inset-0 flex h-screen w-screen bg-[var(--background)] items-center justify-center z-50">
          <DialogPanel className="space-y-4 border w-full h-full">
            <div className={"header py-[10px] px-[20px] bg-white/[0.02]"}>
              <div className={"header_logo flex items-center gap-[8px]"}>
                <div onClick={() => setIsOpen(false)} className={"header_menu"}>
                  <img src={"/media/icons/menu.svg"} alt="menu" />
                </div>
                <div>{t("menu.title")}</div>
              </div>
              <div className={"header_wallet"}></div>
            </div>
            <div
              className={
                "px-[20px] flex flex-col justify-between h-[calc(100%-100px)]"
              }
            >
              <div>
                <Link
                  to={"/history"}
                  onClick={() => setIsOpen(false)}
                  className={"friends_invited_frame py-[8px] px-[12px]"}
                >
                  <div className={"friends_invited_frame_img"}>
                    <img
                      className={"rounded-full"}
                      src={"/media/images/man_yellow.png"}
                    />
                  </div>
                  <div className={"friends_invited_info"}>
                    <div className={"friends_invited_info_title"}>
                      {t("menu.profile")}
                    </div>
                    <div className={"friends_invited_info_amount"}>
                      <div className={"friends_invited_info_amount-text"}>
                        {t("menu.name_placeholder")}
                      </div>
                    </div>
                  </div>
                </Link>
                <div className={"flex flex-col gap-[8px] text-white/[0.4]"}>
                  <Link
                    to={"/finance"}
                    className={
                      "btn p-[12px] flex items-center gap-[8px] justify-center text-white"
                    }
                  >
                    <img
                      src={"/media/images/moneyBag.png"}
                      className={"w-[19.26px] h-[19.99px]"}
                    />
                    <div>{t("menu.deposit")}</div>
                  </Link>
                  <div
                    className={
                      "bg-white/[0.02] py-[13px] px-[12px] flex items-center gap-[8px] h-[54px]"
                    }
                  >
                    <img src={"/media/icons/ref.svg"} />
                    <div>{t("menu.referral")}</div>
                  </div>
                  <Link
                    to={"/tasks"}
                    onClick={() => setIsOpen(false)}
                    className={
                      "bg-white/[0.02] py-[13px] px-[12px] flex items-center gap-[8px] h-[54px]"
                    }
                  >
                    <img src={"/media/icons/ref.svg"} />
                    <div>{t("menu.bonus")}</div>
                  </Link>
                  <Link
                    to={"/check"}
                    onClick={() => setIsOpen(false)}
                    className={
                      "bg-white/[0.02] py-[13px] px-[12px] flex items-center gap-[8px] h-[54px]"
                    }
                  >
                    <img src={"/media/icons/ref.svg"} />
                    <div>{t("menu.fairness")}</div>
                  </Link>
                  <Link
                    to={"/faq"}
                    onClick={() => setIsOpen(false)}
                    className={
                      "bg-white/[0.02] py-[13px] px-[12px] flex items-center gap-[8px] h-[54px]"
                    }
                  >
                    <img src={"/media/icons/ref.svg"} />
                    <div>{t("menu.faq")}</div>
                  </Link>
                  <Link
                    to={"/partnership"}
                    onClick={() => setIsOpen(false)}
                    className={
                      "bg-white/[0.02] py-[13px] px-[12px] flex items-center gap-[8px] h-[54px]"
                    }
                  >
                    <img src={"/media/icons/ref.svg"} />
                    <div>{t("menu.cooperation")}</div>
                  </Link>
                  <div
                    className={
                      "bg-white/[0.02] py-[13px] px-[12px] flex items-center gap-[8px] h-[54px]"
                    }
                  >
                    <img src={"/media/icons/ref.svg"} />
                    <div>{t("menu.agreement")}</div>
                  </div>

                  <LanguageSwitcher />

                  {/* {isConnected && (
                    <button
                      onClick={handleLeaveRoom}
                      className={
                        "bg-red-500 hover:bg-red-600 text-white py-[13px] px-[12px] flex items-center gap-[8px] justify-center rounded h-[54px]"
                      }
                    >
                      <img
                        src={"/media/icons/exit.svg"}
                        className={"w-5 h-5"}
                      />
                      <div>Выйти из комнаты</div>
                    </button>
                  )} */}
                </div>
              </div>
              <Link
                to={"/finance"}
                onClick={() => setIsOpen(false)}
                className={
                  "btn__cash p-[12px] flex items-center gap-[8px] justify-center"
                }
              >
                <img
                  src={"/media/images/cashBag.png"}
                  className={"w-[19.26px] h-[19.99px]"}
                />
                <div>{t("menu.wallet")}</div>
              </Link>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default function Header() {
  return (
    <div className={"header py-[10px] px-[20px]"}>
      <Link to={"/"} className={"header_logo"}>
        <img src={"/media/images/logo.png"} alt="logo" />
      </Link>
      <div className={"header_wallet"}>
        <div className={"header_bitcoin py-[7px] pr-[8px] pl-[12px]"}>
          <div className={"w-full"}>
            <div className={"header_bitcoin_amount"}>0</div>
          </div>
          <div className={""}>
            <SwitchCoin />
          </div>
        </div>
        <div className={"flex gap-[6px]"}>
          <Link to={"/finance"} className={"header_purse"}>
            <img src={"/media/icons/wallet.svg"} alt="menu" />
          </Link>
          <Menu />
        </div>
      </div>
    </div>
  );
}
