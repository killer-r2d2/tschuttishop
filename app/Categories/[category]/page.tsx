"use client";
import { Container } from "@/app/components/Base/Container";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import useGetProductsByCategory from "@/hooks/useGetProductsByCategory";
import { ProductCard } from "@/app/components/Product/ProductCard";
import React from "react";

export default function Page({ params }: { params: { category: string } }) {
  const category: string = params.category;

  const { product, isLoading, isError } = useGetProductsByCategory(category);
  if (isLoading)
    return (
      <Container>
        <SpinnerNext />
      </Container>
    );
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <Container>
      {/* <p>{JSON.stringify(products)}</p> */}
      {product!.map((product) => (
        <ProductCard {...product} key={product.id} hasEdit={false} />
      ))}
    </Container>
  );
}
