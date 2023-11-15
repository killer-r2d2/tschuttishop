"use client";
import React, { useRef, useState } from "react";
import useProducts from "@/hooks/useProducts";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";
import { Product } from "../../types/Product";
import Image from "next/image";
import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export function Products() {
  const { products, isLoading, isError } = useProducts();
  const { deleteProduct } = useDeleteProduct();
  const { updateProduct } = useUpdateProduct();
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = (product: Product) => {
    setActiveProduct(product);
    dialogRef.current?.showModal();
  };
  const closeDialog = () => {
    dialogRef.current?.close();
  };
  const handleUpdateDialog = async () => {
    if (activeProduct) {
      await updateProduct(activeProduct);
    }
    closeDialog();
  };

  const handleDelete = async (event: React.MouseEvent, product: Product) => {
    event.preventDefault();
    await deleteProduct(product);
  };
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <dialog ref={dialogRef} className="rounded-xl shadow-xl border p-5">
        <div className="flex justify-between">
          <h2 className="font-bold">Update Product</h2>
          <button onClick={closeDialog}>X</button>
        </div>
        <div className="flex flex-col mt-5">
          <label className="font-bold">Name</label>
          <input
            type="text"
            value={activeProduct ? activeProduct.name : ""}
            onChange={(event) =>
              setActiveProduct({
                ...activeProduct!,
                name: event.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col mt-5">
          <label className="font-bold">Description</label>
          <input
            type="text"
            value={activeProduct ? activeProduct.description : ""}
            onChange={(event) =>
              setActiveProduct({
                ...activeProduct!,
                description: event.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col mt-5">
          <label className="font-bold">Price</label>
          <input
            type="number"
            value={activeProduct ? activeProduct.price : 0}
            onChange={(event) =>
              setActiveProduct({
                ...activeProduct!,
                price: Number(event.target.value),
              })
            }
          />
        </div>
        {/* inStock */}
        <div className="flex flex-col mt-5">
          <label className="font-bold">In Stock</label>
          <input
            type="checkbox"
            checked={activeProduct ? activeProduct.inStock : false}
            onChange={(event) =>
              setActiveProduct({
                ...activeProduct!,
                inStock: event.target.checked,
              })
            }
          />
        </div>
        <div className="flex justify-end mt-5">
          <button onClick={handleUpdateDialog}>Update</button>
        </div>
      </dialog>
      {/* <p>{JSON.stringify(products)}</p> */}
      {products!.map((product) => (
        <div key={product.id} className="card border shadow-xl rounded-xl">
          <div className="flex justify-between p-2">
            <button
              onClick={() => openDialog(product)}
              className="bg-slate-900 text-slate-100 p-2 rounded-md flex gap-1 items-center hover:bg-slate-800"
            >
              <PencilIcon className="h-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={(event) => handleDelete(event, product)}
              className="flex gap-1 items-center text-red-700"
            >
              <TrashIcon className="h-4" />
              <span>Delete</span>
            </button>
          </div>
          <Link href={`/products/${product.id}`}>
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
              <h2 className="font-bold">{product.name}</h2>
              <p className="mb-5 truncate ...">{product.description}</p>
              <div className="border-t">
                <p className="font-bold mt-5">{product.price}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
