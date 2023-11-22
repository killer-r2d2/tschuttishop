import { NextApiRequest, NextApiResponse } from "next";
import {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsById,
} from "@/services/productService";

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
  description: string | null;
  price: number;
  category: string | null;
  size: string | null;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type ApiResponse = Product[] | Product | { error: string };

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>,
) {
  if (req.method === "GET") {
    try {
      const id = req.query.id as string | undefined;
      const category = req.query.category as string;

      const ids = req.query.ids as string;
      const idsArray: number[] = ids.split(",").map((id) => parseInt(id));

      if (id) {
        // Fetch product by ID if ID is provided
        const product = await getProductById(parseInt(id));
        if (product) {
          return handleSuccess(product, res);
        } else {
          return res.status(404).json({ error: "Product not found." });
        }
      } else if (ids) {
        // Fetch products by IDs if IDs is provided
        const data: Product[] = await getProductsById(idsArray);
        return handleSuccess(data, res);
      } else if (category) {
        // Fetch products by category if category is provided
        const data: Product[] = await getProductsByCategory(category);
        return handleSuccess(data, res);
      } else {
        // Fetch all products if no ID is provided
        const data: Product[] = await getProducts();
        return handleSuccess(data, res);
      }
    } catch (error: any) {
      return handleError(error, res);
    }
  }
  if (req.method === "POST") {
    try {
      const { name, description, price, category, size, inStock } = req.body;
      const product = await createProduct({
        name,
        description,
        category,
        size,
        price: parseFloat(price),
        inStock: Boolean(inStock),
      });

      return res.status(200).json(product);
    } catch (error: any) {
      return handleError(error, res);
    }
  }
  if (req.method === "PUT") {
    try {
      const { id, name, description, price, category, size, inStock } =
        req.body;

      if (!id) {
        return res.status(400).json({ error: "ID is required" });
      }

      const product = await updateProduct(parseInt(id), {
        id: parseInt(id),
        name,
        description,
        category,
        size,
        price: parseFloat(price),
        inStock: Boolean(inStock),
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
      const product = await deleteProduct(parseInt(id));

      return handleSuccess(product, res);
    } catch (error: any) {
      return handleError(error, res);
    }
  }
}
