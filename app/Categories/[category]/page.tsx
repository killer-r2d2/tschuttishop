"use client";
import { Container } from "@/app/components/Base/Container";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import useGetProductsByCategory from "@/hooks/useGetProductsByCategory";
import { ProductCard } from "@/app/components/Product/ProductCard";
import React from "react";

export default function Page({ params }: { params: { category: string } }) {
  const category: string = params.category;

  const { products, isLoading, isError } = useGetProductsByCategory(category);
  if (isLoading)
    return (
      <Container>
        <SpinnerNext />
      </Container>
    );
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {products!.map((product) => (
        <ProductCard {...product} key={product.id} hasEdit={false} />
      ))}
    </div>
  );
}
