"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function UserDropdown({ user }: { user: string | undefined }) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <UserCircleIcon className="w-8 text-slate-100 hover:text-slate-500 transition-colors hover:cursor-pointer" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" disabledKeys={["user"]}>
        <DropdownSection showDivider>
          <DropdownItem key="dashboard" href="/DashboardProduct">
            Dashboard
          </DropdownItem>
          <DropdownItem key="sell" href="/DashboardProduct/Sold">
            Verkaufen
          </DropdownItem>
          <DropdownItem key="buy" href="/DashboardProduct/Orders">
            Kaufen
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem key="user">{user}</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
