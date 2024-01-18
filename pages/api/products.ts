import { NextApiRequest, NextApiResponse } from "next";
import { Product, ApiResponse } from "@/app/types/Product";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
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

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>,
) {
  if (req.method === "GET") {
    try {
      const id = req.query.id as string | undefined;

      if (id) {
        // Fetch product by ID if ID is provided
        const product = await getProductById(parseInt(id));
        if (product) {
          return handleSuccess(product, res);
        } else {
          return res.status(404).json({ error: "Product not found." });
        }
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
      const {
        name,
        description,
        price,
        category,
        size,
        club,
        inStock,
        isVintage,
        profileId,
        image,
      } = req.body;
      const product = await createProduct({
        name,
        description,
        category,
        size,
        club,
        price: parseFloat(price),
        inStock: Boolean(inStock),
        isVintage: Boolean(isVintage),
        profileId,
        buyerId: undefined,
        isPaid: false,
        isShipped: false,
        image,
      });

      return res.status(200).json(product);
    } catch (error: any) {
      console.error(error); // Loggen Sie den Fehler auf der Serverseite
      return res
        .status(500)
        .json({ error: error.message || "Internal Server Error" });
    }
  }
  if (req.method === "PUT") {
    try {
      const { id, ...updateData } = req.body;

      if (!id) {
        return res.status(400).json({ error: "ID is required" });
      }

      const product = await updateProduct(parseInt(id), updateData);

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
