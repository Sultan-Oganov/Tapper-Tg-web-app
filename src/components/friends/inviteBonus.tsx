import InviteCard from "@/components/misc/bonus/inviteCard";
import { useTranslation } from "react-i18next";

export default function InviteBonus() {
  const { t } = useTranslation();

  return (
    <div className={"friends_bonus"}>
      <div className={"friends_bonus_title"}>
        {t("friends.invite_bonus_title")}
      </div>
      <div className={"friends_bonus_sections"}>
        <InviteCard />
      </div>
    </div>
  );
}
