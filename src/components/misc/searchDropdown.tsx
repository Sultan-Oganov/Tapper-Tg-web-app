"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function SearchDropdown({ info }: any) {
  return (
    <Menu>
      <MenuButton className="w-full">
        <div
          className={
            "bg-[#212852] rounded-[8px] data-[active]:rounded-t-[8px] data-[active]:rounded-b-[0px] px-[16px] py-[11px] w-full flex justify-between items-center deselect-style"
          }
        >
          <div>{info}</div>
          <div className="">
            <svg
              width="14"
              height="8"
              viewBox="0 0 14.0169 8.41699"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.6 0.42C13.34 0.16 12.98 0.01 12.61 0.01C12.24 0.01 11.89 0.16 11.62 0.42L7.01 5.03L2.4 0.42C2.27 0.29 2.12 0.18 1.95 0.11C1.78 0.04 1.59 0 1.41 0C1.22 -0.01 1.04 0.03 0.86 0.1C0.69 0.17 0.54 0.27 0.41 0.41C0.27 0.54 0.17 0.69 0.1 0.86C0.03 1.04 -0.01 1.22 6.1e-5 1.41C0 1.59 0.04 1.78 0.11 1.95C0.18 2.12 0.29 2.27 0.42 2.4L6.02 8C6.28 8.26 6.64 8.41 7.01 8.41C7.38 8.41 7.74 8.26 8 8L13.6 2.4C13.86 2.14 14.01 1.78 14.01 1.41C14.01 1.04 13.86 0.68 13.6 0.42Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
        </div>
      </MenuButton>
      <MenuItems
        className={
          "bg-[#212852] w-shine px-[16px] py-[9px] gap-[8px] flex flex-col"
        }
        anchor="bottom"
      >
        <MenuItem>
          <div className={"flex justify-between deselect-style"}>
            <div className={"text-[#898DA3]"}>Купить бонус</div>
            <div className={"text-[#898DA3]"}>(12)</div>
          </div>
        </MenuItem>
        <MenuItem>
          <div className={"text-[#898DA3] deselect-style"}>Лайв-казино</div>
        </MenuItem>
        <MenuItem>
          <div className={"text-[#898DA3] deselect-style"}>Джэкпот</div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
