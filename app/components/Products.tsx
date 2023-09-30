"use client";
import useProducts from "@/hooks/useProducts";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { Product } from "../types/Product";
import Image from "next/image";
import Link from "next/link";

export function Products() {
  const { products, isLoading, isError } = useProducts();
  const { deleteProduct } = useDeleteProduct();

  const handleDelete = async (event: React.MouseEvent, product: Product) => {
    event.stopPropagation();
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(product);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* <p>{JSON.stringify(products)}</p> */}
      {products!.map((product) => (
        <div
          key={product.id}
          className="card border shadow-xl rounded-xl hover:scale-101 hover:shadow-2xl transition"
        >
          <button onClick={(event) => handleDelete(event, product)} className="m-4">
            delete
          </button>
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
              <p className="mb-5">{product.description}</p>
              <hr />
              <p className="font-bold mt-5">{product.price}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
