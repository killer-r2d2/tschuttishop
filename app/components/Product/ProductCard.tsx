import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/app/types/Product";

export function ProductCard({
  id,
  name,
  description,
  price,
  inStock,
  createdAt,
  updatedAt,
}: Product) {
  return (
    <div className="card border shadow-xl rounded-xl hover:scale-101 hover:shadow-2xl transition">
      <Link href={`/products/${id}`}>
        <div>
          <Image
            height="1000"
            width="1000"
            src="/shirt-player.png"
            alt="Shirt"
            className="rounded-t-xl"
          />
        </div>
        <div className="p-5">
          <h2 className="font-bold">{name}</h2>
          <p className="mb-5 truncate ...">{description}</p>
          <div className="border-t">
            <p className="font-bold mt-5">{price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
