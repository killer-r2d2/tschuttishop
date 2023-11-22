import Link from "next/link";
import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export function CartUser() {
  return (
    <div className="flex gap-4">
      <Link href="/DashboardProduct">
        <UserCircleIcon className="w-8 text-slate-100 hover:text-slate-500 transition-colors" />
      </Link>
      <Link href="/Cart">
        <ShoppingCartIcon className="w-8 text-slate-100 hover:text-slate-500 transition-colors" />
      </Link>
    </div>
  );
}
