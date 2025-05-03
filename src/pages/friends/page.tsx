import Invite from "@/components/friends/invite";
import InviteBonus from "@/components/friends/inviteBonus";
import InvitedFriends from "@/components/friends/invitedFriends";
import { useFriends } from "@/hooks/useFriends";

export default function Friends() {
  useFriends(); // запускаем запрос на сервер

  return (
    <div className={"px-[20px]"}>
      <div className={"sections_taper friends_container"}>
        <Invite />

        <InviteBonus />

        <InvitedFriends />
      </div>
    </div>
  );
}
