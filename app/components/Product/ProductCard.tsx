import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/app/types/Product";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { Badge } from "@nextui-org/react";

interface ExtendProduct extends Product {
  hasEdit: boolean;
  getActiveProduct?: (product: Product) => void;
  handleDelete?: (event: React.MouseEvent, product: Product) => void;
  openModal?: () => void;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  size,
  club,
  category,
  inStock,
  isVintage,
  profileId,
  hasEdit,
  getActiveProduct,
  handleDelete,
  openModal,
}: ExtendProduct) {
  return (
    <div className="card border shadow-xl rounded-xl hover:scale-101 hover:shadow-2xl transition">
      {hasEdit ? (
        <div className="flex justify-between p-2">
          <Button
            onClick={() =>
              getActiveProduct
                ? getActiveProduct({
                    id,
                    name,
                    description,
                    price,
                    size,
                    category,
                    inStock,
                    isVintage,
                    profileId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isPaid: false,
                    isShipped: false,
                  })
                : null
            }
            onPress={openModal}
          >
            <PencilIcon className="h-4" />
          </Button>
          <button
            onClick={(event) =>
              handleDelete
                ? handleDelete(event, {
                    id,
                    name,
                    description,
                    price,
                    size,
                    category,
                    inStock,
                    isVintage,
                    profileId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isPaid: false,
                    isShipped: false,
                  })
                : null
            }
            className="flex gap-1 items-center text-red-700"
          >
            <TrashIcon className="h-4" />
            <span>Delete</span>
          </button>
        </div>
      ) : null}
      <Link href={`/Products/${id}`}>
        <div>
          <div className="relative">
            {isVintage ? (
              <div className="absolute top-4 right-9">
                <Badge  content="Vintage" color="primary">
                  Vintage
                </Badge>
              </div>
            ) : null}
            <Image
              height="1000"
              width="1000"
              src="/shirt-player.png"
              alt="Shirt"
              className="rounded-t-xl relative"
            />
          </div>
        </div>
        <div className="p-5">
          <h2 className="font-bold">{name}</h2>
          <p className="mb-5 truncate ...">{description}</p>
          <div className="flex justify-between mb-4">
            <p className="font-bold">club: {club}</p>
            <p className="font-bold">size: {size}</p>
          </div>
          <div className="border-t">
            <p className="font-bold mt-5">{price} CHF</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
