import { NextApiRequest, NextApiResponse } from "next";
import { updateProduct } from "@/services/productService";

export default async function updateShipmentStatus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required." });
    }

    try {
      const updatedProduct = await updateProduct(productId, { isShipped: true });
      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update shipment status." });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
