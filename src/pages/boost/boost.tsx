import MainControllerTab from "@/components/misc/tabs/mainControllerTab";
import DefaultTapper from "@/components/tapper/defaultTapper";
import BoosterBuy from "@/components/tapper/boosterBuy";

export default function Boost() {
  return (
    <div className={"px-[20px]"}>
      <div className={"sections_taper"}>
        <BoosterBuy />
        <MainControllerTab />
      </div>
      {/* <DefaultTapper /> */}
    </div>
  );
}
