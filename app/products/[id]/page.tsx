"use client"
import prisma from "@/prisma/client";
import useGetProductById from "@/hooks/useGetProductById";
import ProductPage from "@/app/components/ProductPage";

export default function Page({params}: { params: { id: number } }) {
    const productId: number = params.id;
    console.log(productId);
    const { product, isLoading, isError } = useGetProductById(productId);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {isError.message}</p>;

    return (
       <ProductPage id={product.id} name={product.name} description={product.description} price={product.price} inStock="" createdAt="" updatedAt=""></ProductPage>
    );
}