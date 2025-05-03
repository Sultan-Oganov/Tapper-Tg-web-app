"use client";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function DownTabs() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className={"w-full bottom-[20px] down_tabs-wrapper px-[20px] fixed"}>
      <div className={"down_taps"}>
        <Link
          to={"/"}
          className={
            location.pathname == "/"
              ? "active down_taps_card py-[8px]"
              : "down_taps_card py-[8px]"
          }
        >
          {t("tabs.home")}
        </Link>
        <Link
          to={"/boost"}
          className={
            location.pathname == "/boost"
              ? "active down_taps_card py-[8px]"
              : "down_taps_card py-[8px]"
          }
        >
          {t("tabs.boost")}
        </Link>
        <Link
          to={"/friends"}
          className={
            location.pathname == "/friends"
              ? "active down_taps_card py-[8px]"
              : "down_taps_card py-[8px]"
          }
        >
          {t("tabs.friends")}
        </Link>
        <Link
          to={"/finance"}
          className={
            location.pathname == "/finance"
              ? "active down_taps_card py-[8px]"
              : "down_taps_card py-[8px]"
          }
        >
          {t("tabs.finance")}
        </Link>
      </div>
    </div>
  );
}
