import { NextApiRequest, NextApiResponse } from "next";
import { getProductById, updateProduct } from "@/services/productService";

export default async function purchaseProduct(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { productId, buyerId } = req.body;
    if (!productId || !buyerId) {
      return res
        .status(400)
        .json({ error: "Product ID and Buyer ID are required." });
    }
    try {
      const product = await getProductById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found." });
      }
      if (product.buyerId) {
        return res
          .status(400)
          .json({ error: "Product has already been purchased." });
      }
      const updatedProduct = await updateProduct(productId, {
        buyerId: buyerId,
        isPaid: false,
        inStock: false,
      });
      return res.status(200).json(updatedProduct);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
      } else {
        console.error("An unexpected error occurred");
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
