import { mutate } from "swr";
import { Product } from "../app/types/Product";

export const useDeleteProduct = () => {
  const deleteProduct = async (product: Product) => {
    const url = `/api/products?id=${product.id}`;
    const response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log('Response Status:', response.status);  // Log status code
    console.log('Response Text:', await response.text());  // Log response text


    if (!response.ok) {
      throw new Error("An error occurred while deleting the product.");
    }

    mutate("/api/products");
  };

  return {
    deleteProduct,
  };
};
