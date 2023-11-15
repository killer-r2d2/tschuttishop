import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/app/types/Product";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

interface ExtendProduct extends Product {
  hasEdit: boolean;
  openDialog?: (product: Product) => void;
  handleDelete?: (event: React.MouseEvent, product: Product) => void;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  hasEdit,
  inStock,
  openDialog,
  handleDelete,
}: ExtendProduct) {
  return (
    <div className="card border shadow-xl rounded-xl hover:scale-101 hover:shadow-2xl transition">
      {hasEdit ? (
        <div className="flex justify-between p-2">
          <button
            onClick={() =>
              openDialog
                ? openDialog({
                    id,
                    name,
                    description,
                    price,
                    inStock,
                    createdAt: 0,
                    updatedAt: 0,
                  })
                : null
            }
            className="bg-slate-900 text-slate-100 p-2 rounded-md flex gap-1 items-center hover:bg-slate-800"
          >
            <PencilIcon className="h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={(event) =>
              handleDelete
                ? handleDelete(event, {
                    id,
                    name,
                    description,
                    price,
                    inStock,
                    createdAt: 0,
                    updatedAt: 0,
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
