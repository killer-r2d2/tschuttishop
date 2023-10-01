import { mutate } from "swr";
import { Product } from "../app/types/Product";

export const useUpdateProduct = () => {
  const updateProduct = async (product: Product) => {
    const response = await fetch("/api/updateProduct", {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("An error occurred while updating the product.");
    }

    mutate("/api/getProducts");
  };

  return {
    updateProduct,
  };
};