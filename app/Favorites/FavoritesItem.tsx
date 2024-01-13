import { Product } from "@/app/types/Product";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { favoritesStore } from "@/store/favoritesStore";
import { useStore } from "zustand";

export default function FavoritesItem({
  id,
  name,
  price,
  size,
  category,
}: Product) {
  const removeFav = useStore(favoritesStore, (state) => state.removeFav);
  return (
    <div className="grid grid-cols-6 gap-12 border-t py-4 px-8 items-center">
      <div className="col-span-full xl:col-span-1 relative aspect-[4/3] max-w-lg">
        <Link href={`/Products/${id}`}>
          <Image
            src="/shirt-player.png"
            alt={name}
            width={800}
            height={800}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            className="rounded-xl"
          />
        </Link>
      </div>
      <div className="col-span-full xl:col-span-4">
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
      <div className="col-span-full xl:col-span-1  flex w-full xl:justify-end">
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
