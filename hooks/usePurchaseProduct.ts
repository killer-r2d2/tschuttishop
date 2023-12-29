import { mutate } from "swr";

export const usePurchaseProduct = () => {
  const purchaseProduct = async (productId: number, buyerId: string) => {
    const response = await fetch("/api/purchase", {
      method: "POST",
      body: JSON.stringify({ productId, buyerId}),
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
    purchaseProduct,
  };
}