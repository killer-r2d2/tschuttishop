import { mutate } from "swr";
import { Product } from "../app/types/Product";

export const useDeleteProduct = () => {
  const deleteProduct = async (product: Product) => {
    const response = await fetch("/api/deleteProduct", {
      method: "DELETE",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("An error occurred while deleting the product.");
    }

    mutate("/api/getProducts");
  };

  return {
    deleteProduct,
  };
};
