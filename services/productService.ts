import prisma from "@/prisma/client";
// import Product from types/Product.ts
import { Product } from "@/app/types/Product";

export const getProducts = async () => {
  return await prisma.product.findMany();
}

export const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: {
      id: id
    }
  });
}

export const createProduct = async (product: any) => {
  return await prisma.product.create({
    data: product
  });
}

export const updateProduct = async (id: number, product: any) => {
  return await prisma.product.update({
    where: {
      id: id
    },
    data: product
  });
}

export const deleteProduct = async (id: number) => {
  return await prisma.product.delete({
    where: {
      id: id
    }
  });
}