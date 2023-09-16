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

type ApiResponse =  Product[] | { error: string };


export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === "GET") {
    try {
      const data: Product[] = await prisma.product.findMany();

      return res.status(200).json(data);

    } catch (error: any) {
      return res
        .status(500)
        .json({ error: "An error occurred while retrieving the products." });
    }
  }
}
