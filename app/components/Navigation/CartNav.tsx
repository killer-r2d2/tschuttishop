import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { cartStore } from "@/store/cartStore";
import { Badge } from "@nextui-org/react";
import { useAsyncStore } from "@/hooks/useAsyncStore";
export function CartNav() {
  const count = useAsyncStore(cartStore, (state) => state.count);
  return (
    <div className="flex gap-4">
      <Badge
        content={count}
        color="danger"
        isInvisible={count === undefined || count < 1}
      >
        <Link href="/Cart" aria-label="cart icon">
          <ShoppingCartIcon className="w-6 text-slate-100 hover:text-slate-500 transition-colors" />
        </Link>
      </Badge>
    </div>
  );
}
