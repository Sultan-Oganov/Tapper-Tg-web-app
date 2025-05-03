import { Switch } from "@headlessui/react";
import { useState } from "react";

function SwitchCoin() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className="group relative flex h-[27px] w-[48px] cursor-pointer rounded-full bg-gradient-to-r from-[#FBDB7E] to-[#FFD048] data-[checked]:from-[#93B1FF] data-[checked]:to-[#769CFF] p-1 transition-colors data-[checked]:bg-[#0CD99D1F] duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white"
    >
      <span className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5">
        <img
          src={enabled ? "/media/icons/cash.svg" : "/media/icons/bitcoin.svg"}
        />
      </span>
    </Switch>
  );
}

export default SwitchCoin;
