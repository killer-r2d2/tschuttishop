import { Product } from "@/app/types/Product";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { favoritesStore } from "@/store/favoritesStore";
import { useStore } from "zustand";

export default function FavoritesItem({ id, name, price, size, category }: Product) {
  const removeFav = useStore(favoritesStore, (state) => state.removeFav);
  return (
    <div className="grid grid-cols-12 gap-y-12 xl:gap-x-12 border-t py-8">
      <div className="col-span-full xl:col-span-6 relative">
        <Link href={`/Products/${id}`}>
          <Image
            src="/shirt-player.jpg"
            height={500}
            width={500}
            objectFit="cover"
            alt={name}
            className="rounded-xl"
          />
        </Link>
      </div>
      <div className="col-span-full xl:col-span-6 flex flex-col gap-8">
        <Link href={`/Products/${id}`}>
          <h2 className="text-xl font-bold">{name}</h2>
        </Link>
        <div>
          <p>
            Preis: <span className="font-bold">{price} CHF</span>
          </p>
          <p className="mt-2">Grösse: {size}</p>
          <p className="mt-2">Kategorie: {category}</p>
        </div>
      </div>
      <div>
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
