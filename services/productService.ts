import prisma from "@/prisma/client";
// import Product from types/Product.ts
import { Product } from "@/app/types/Product";

export type CreateProductType = Omit<Product, "id" | "createdAt" | "updatedAt">;

export type UpdateProductType = Omit<Product, "createdAt" | "updatedAt">;

export const getProducts = async () => {
  return await prisma.product.findMany();
};

export const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
};

export const getProductsByCategory = async (category: string) => {
  return await prisma.product.findMany({
    where: {
      name: {
        category: category,
      },
    },
  });
};

export const createProduct = async (product: CreateProductType) => {
  return await prisma.product.create({
    data: product,
  });
};

export const updateProduct = async (id: number, product: UpdateProductType) => {
  return await prisma.product.update({
    where: {
      id: id,
    },
    data: product,
  });
};

export const deleteProduct = async (id: number) => {
  return await prisma.product.delete({
    where: {
      id: id,
    },
  });
};
