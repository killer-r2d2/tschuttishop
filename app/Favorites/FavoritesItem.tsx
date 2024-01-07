import { Product } from "@/app/types/Product";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { favoritesStore } from "@/store/favoritesStore";
import { useStore } from "zustand";

export default function FavoritesItem({ id, name, price }: Product) {
  const removeFav = useStore(favoritesStore, (state) => state.removeFav);
  return (
    <div className="grid grid-cols-6 gap-6 xl:gap-12 border-t pt-4 pb-4 pr-8 pl-8 items-center xl:hover:bg-slate-100 transition-colors">
      <div className="p-2 col-span-full xl:col-span-1 relative min-h-[200px] xl:min-h-[130px]">
        <Link href={`/Products/${id}`}>
          <Image
            src="/shirt-player.png"
            fill
            objectFit="cover"
            alt={name}
            className="rounded-xl h-[200px] max-w-full"
          />
        </Link>
      </div>
      <div className="col-span-full xl:col-span-3">
        <Link href={`/Products/${id}`}>
          <h2 className="text-xl">{name}</h2>
        </Link>
        <div>
          <p>
            Preis: <span className="font-bold">{price} CHF</span>
          </p>
        </div>
      </div>
      <div className="col-span-full xl:col-span-2  flex w-full xl:justify-end">
        <Button
          size="sm"
          variant="ghost"
          color="danger"
          onClick={() => removeFav(id)}
        >
          Entfernen
        </Button>
      </div>
    </div>
  );
}
