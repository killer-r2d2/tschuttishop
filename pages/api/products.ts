import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

// function for errror handling
function handleError(error: any, res: NextApiResponse) {
  console.error("Backend Error:", error);
  return res.status(500).json({ error: error.message });
}
// function to handle success response
function handleSuccess(data: Product | Product[], res: NextApiResponse) {
  return res.status(200).json(data);
}

type Product = {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type ApiResponse =  Product[] | Product | { error: string };

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === "GET") {
    try {
      const id = req.query.id as string | undefined;
      if (id) {
        // Fetch product by ID if ID is provided
        const product = await prisma.product.findUnique({
          where: {
            id: parseInt(id),
          },
        });
        if (product){
          return handleSuccess(product, res);
        }
        else {
          return res.status(404).json({ error: "Product not found." });
        }
      } else {
        // Fetch all products if no ID is provided
        const data: Product[] = await prisma.product.findMany();
        return handleSuccess(data, res);
      }
    } catch (error: any) {
      return handleError(error, res);
      
    }
  }
  if (req.method === "POST") {
    try {
      const { name, description, price, inStock } = req.body;
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          inStock: Boolean(inStock),
        },
      });    

      return res.status(200).json(product);
    } catch (error: any) {
      return handleError(error, res);
    }
  }
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

      return handleSuccess(product, res);
    } catch (error: any) {
      return handleError(error, res);
    }
  }
  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ error: "ID is required" });
      }
      const product = await prisma.product.delete({
        where: {
          id: parseInt(id as string, 10),
        },
      });

      return handleSuccess(product, res);
    } catch (error: any) {
      return handleError(error, res);
    }
  }
}