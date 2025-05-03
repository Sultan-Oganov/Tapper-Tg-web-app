import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AuthResponse {
  token: number;
  username: string;
  picture: string | null;
  error?: string;
}

export function useTelegramAuth(apiUrl: string) {
  const [authState, setAuthState] = useState<AuthResponse | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.Telegram?.WebApp) {
      setAuthState({
        error: "Telegram WebApp is not available",
        token: 0,
        username: "",
        picture: null,
      });
      return;
    }

    const initData = window.Telegram.WebApp.initData;
    if (!initData) {
      setAuthState({
        error: "initData is missing",
        token: 0,
        username: "",
        picture: null,
      });
      return;
    }

    fetch(`${apiUrl}/telegram/session/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData }),
    })
      .then((res) => res.json())
      .then((data: AuthResponse) => {
        if (!data.error) {
          Cookies.set("token", data.token.toString(), { expires: 14 });
          Cookies.set("username", data.username, { expires: 14 });
          if (data.picture) {
            Cookies.set("picture", data.picture, { expires: 14 });
          }
        }
        setAuthState(data);
      })
      .catch((error) => {
        console.error("Auth error:", error);
        setAuthState({
          error: error.message,
          token: 0,
          username: "",
          picture: null,
        });
      });
  }, [apiUrl]);

  return authState;
}
