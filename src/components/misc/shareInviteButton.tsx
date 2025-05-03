"use client";

import { useTranslation } from "react-i18next";

interface Props {
  userId: number;
  text?: string;
}

export default function ShareInviteButton({ userId, text }: Props) {
  const inviteUrl = `https://t.me/OpenClickerCashBot?start=startapp_${userId}`;
  const { t } = useTranslation();

  const handleClick = () => {
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      inviteUrl
    )}&text=${encodeURIComponent(text || t("friends.share_message"))}`;

    if (window?.Telegram?.WebApp?.openTelegramLink) {
      window?.Telegram?.WebApp.openTelegramLink(shareUrl);
    } else {
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <button onClick={handleClick} className="your-button-class">
      {t("friends.send_invite")}
    </button>
  );
}
