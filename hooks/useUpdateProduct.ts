import { mutate } from "swr";
import { Product } from "../app/types/Product";

export const useUpdateProduct = () => {
  const updateProduct = async (updateFields: Partial<Product>) => {
    const response = await fetch("/api/products", {
      method: "PUT",
      body: JSON.stringify(updateFields),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("An error occurred while updating the product.");
    }

    mutate("/api/products");
  };

  return {
    updateProduct,
  };
};