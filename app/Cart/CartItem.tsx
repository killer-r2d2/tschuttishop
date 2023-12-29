import { Product } from "@/app/types/Product";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";

import { cartStore } from "@/store/cartState";

export default function CartItem({
  id,
  name,
  description,
  price,
  size,
  category,
  inStock,
}: Product) {
  const removeItem = cartStore((state) => state.deleteItem);
  return (
    <div className="grid grid-cols-12 gap-y-12 xl:gap-x-12 border-t pt-8">
      <div className="col-span-full xl:col-span-6 relative">
        <Image
          src="/shirt-player.png"
          height={500}
          width={500}
          objectFit="cover"
          alt={name}
          className="rounded-xl"
        />
      </div>
      <div className="col-span-full xl:col-span-6 flex flex-col gap-8">
        <Link href={`/Products/${id}`}>
          <h2 className="text-2xl font-bold">{name}</h2>
        </Link>
        <div>
          <p>
            Preis: <span className="font-bold">{price} CHF</span>
          </p>
          <p className="mt-2">Grösse: {size}</p>
          <p className="mt-2">Kategorie: {category}</p>
        </div>
        <div>
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
    </div>
  );
}
