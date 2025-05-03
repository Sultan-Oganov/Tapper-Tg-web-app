'use client'

import { Switch } from '@headlessui/react'
import { useState } from 'react'

export default function SwitchBet() {
    const [enabled, setEnabled] = useState(false)

    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className="group relative flex h-[20px] w-[40px] cursor-pointer rounded-full bg-white/10 p-1 transition-colors data-[checked]:bg-[#0CD99D1F] duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white"
        >
      <span
          aria-hidden="true"
          className="pointer-events-none inline-block size-3 translate-x-0 rounded-full  bg-white group-data-[checked]:bg-[#0CD99D] ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
      />
        </Switch>
    )
}