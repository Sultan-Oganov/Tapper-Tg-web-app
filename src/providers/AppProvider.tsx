import Loader from "@/components/misc/loader";
import { useGameClient } from "@/hooks/useGameClient";
import { useGameNotifications } from "@/hooks/useGameNotifications";
import { useGameStore } from "@/store/gameStore";
import { useTranslation } from "react-i18next";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected, isConnecting, isReconnecting, error } = useGameStore();
  useGameClient();
  useGameNotifications();
  const { t } = useTranslation();

  if (isConnecting) {
    return (
      <div className="text-white text-center p-10">
        {t("connection.connecting")}
        <Loader />
      </div>
    );
  }

  if (isReconnecting) {
    return (
      <div className="text-white text-center p-10">
        {t("connection.reconnecting")}...
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-10">
        {t("connection.error")} {error}
        <Loader />
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="text-white text-center p-10">
        {t("connection.disconnected")}
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}
