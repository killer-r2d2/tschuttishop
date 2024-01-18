import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/app/types/Product";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { Badge } from "@nextui-org/react";
import { Chip } from "@nextui-org/chip";

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
  image,
}: ExtendProduct) {
  const isInStock = inStock ? "opacity-100" : "opacity-50";
  return (
    <div
      className={`card border shadow-xl rounded-xl hover:scale-101 hover:shadow-2xl transition ${isInStock}`}
    >
      {hasEdit ? (
        <div className="flex justify-between p-2">
          <Button
            onPressStart={() =>
              getActiveProduct
                ? getActiveProduct({
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
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isPaid: false,
                    isShipped: false,
                    image,
                  })
                : null
            }
            onPress={openModal}
            color="primary"
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
                    club,
                    category,
                    inStock,
                    isVintage,
                    profileId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isPaid: false,
                    isShipped: false,
                    image,
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

      <Link href={`/Products/${id}`} data-testid="product-link">
        <div className="relative">
          <Image
            height="400"
            width="400"
            src={image ? image : "/placeholder.jpg"}
            alt={name}
            className="h-[400px] md:h-[200px] xl:h-[250px] w-full object-cover rounded-t-xl"
          />

          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {isVintage && (
              <Chip color="primary" variant="shadow">
                Vintage
              </Chip>
            )}
            {!inStock && (
              <Chip color="primary" variant="shadow">
                Verkauft
              </Chip>
            )}
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
