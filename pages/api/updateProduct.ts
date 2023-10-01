import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const { id, name, description, price, inStock } = req.body;
      const product = await prisma.product.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
          description,
          price: parseFloat(price),
          inStock: Boolean(inStock),
        },
      });

      return res.status(200).json(product);
    } catch (error: any) {
      console.error("Backend Error:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}