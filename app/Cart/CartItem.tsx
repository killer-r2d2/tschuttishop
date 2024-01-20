import { Product } from "@/app/types/Product";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";

import { cartStore } from "@/store/cartStore";
import { useStore } from "zustand";

export default function CartItem({
  id,
  name,
  price,
  size,
  isVintage,
  image,
}: Product) {
  const removeItem = useStore(cartStore, (state) => state.deleteItem);
  return (
    <div className="grid grid-cols-6 gap-12 border-t py-4 px-8 items-center">
      <div className="col-span-full xl:col-span-1 relative aspect-[4/3] max-w-lg">
        <Link href={`/Products/${id}`}>
          <Image
            src={image ? image : "/placeholder.jpg"}
            alt={name}
            width={200}
            height={200}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            className="rounded-xl"
          />
        </Link>
      </div>
      <div className="col-span-full xl:col-span-4 flex flex-col gap-8">
        <Link href={`/Products/${id}`}>
          <h2 className="text-2xl font-bold">{name}</h2>
        </Link>
        <div>
          <p>
            Preis: <span className="font-bold">{price} CHF</span>
          </p>
          <p className="mt-2">Grösse: {size}</p>
          {isVintage && <p>Vintage</p>}
        </div>
      </div>
      <div className="col-span-full xl:col-span-1  flex w-full xl:justify-end">
        <Button
          size="sm"
          variant="ghost"
          color="danger"
          onClick={() => removeItem(id)}
        >
          Entfernen
        </Button>
      </div>
    </div>
  );
}
