import React from "react";
import { useTelegramAuth } from "@/hooks/useTelegramAuth";
import { useTranslation } from "react-i18next";

const apiUrl = "https://api.nerublix.com";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const auth = useTelegramAuth(apiUrl);
  const { t } = useTranslation();

  if (!window.Telegram?.WebApp) {
    return <div>{t("auth.please_open_in_telegram")}</div>;
  }

  if (!auth) return <div>{t("common.loading")}</div>;

  if (auth.error) {
    // TODO: Расскоментировать на продакшене
    // TODO: Закоментировать, чтобы не мешало разработке на десктопе
    // return <div>{t("auth.auth_error", { error: auth.error })}</div>;
  }

  return <>{children}</>;
}
