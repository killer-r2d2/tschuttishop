"use client";
import React, { useRef, useState } from "react";
import useProducts from "@/hooks/useProducts";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";
import { Product } from "../../types/Product";
import { ProductCard } from "@/app/components/Product/ProductCard";

export function Products({ userProfileId }: { userProfileId: string }) {
  const { products, isLoading, isError } = useProducts();
  const { deleteProduct } = useDeleteProduct();
  const { updateProduct } = useUpdateProduct();
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const userProducts = (products as Product[])?.filter(
    (product) => product.profileId === userProfileId,
  );

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
    <div>
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
            value={activeProduct ? activeProduct.description || "" : ""}
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
      <div className="mb-5 mt-5">
        <h1 className="text-2xl font-bold">Deine erfassten Produkte:</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {userProducts && userProducts.length > 0 ? (
          userProducts.map((product) => (
            <ProductCard
              {...product}
              key={product.id}
              hasEdit
              openDialog={openDialog}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <div>
            <p>Noch keine Produkte erfasst.</p>
          </div>
        )}
      </div>
    </div>
  );
}
