import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

type Product = {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type ApiResponse = Product | { error: string };

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === "POST") {
    try {
      const { name, description, price, inStock } = req.body;

      if (!name || typeof price !== 'number' || typeof inStock !== 'boolean') {
        return res.status(400).json({ error: "Invalid input" });
      }

      const product = await prisma.product.create({
        data: { name, description, price, inStock },
      });

      return res.status(201).json(product);
    } catch (error: any) {
      return res.status(500).json({ error: "An error occurred while creating the product." });
    }
  }
}
