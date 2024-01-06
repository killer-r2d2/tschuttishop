import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { cartStore } from "@/store/cartState";
import { Badge } from "@nextui-org/react";
export function CartNav() {
  const count = cartStore((state) => state.count);
  return (
    <div className="flex gap-4">
      <Badge content={count} color="danger" isInvisible={count < 1}>
        <Link href="/Cart">
          <ShoppingCartIcon className="w-6 text-slate-100 hover:text-slate-500 transition-colors" />
        </Link>
      </Badge>
    </div>
  );
}
