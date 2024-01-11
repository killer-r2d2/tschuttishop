import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/solid";
import { favoritesStore } from "@/store/favoritesStore";
export function FavoritesNav() {
  const hasFavorites: boolean = favoritesStore(
    (state) => state.items.length > 0,
  );

  return (
    <div className="flex gap-4">
      <Link href="/Favorites" aria-label="favorites icon">
        <HeartIcon className="w-6 text-slate-100 hover:text-slate-500 transition-colors" />
      </Link>
    </div>
  );
}
