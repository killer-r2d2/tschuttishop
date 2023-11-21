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
    <Container>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-full xl:col-span-3 bg-slate-200 h-fit p-5 rounded-xl">
          <p className="font-bold">Mehr entdecken</p>
          <ul>
            <li>New Arrivals</li>
            <li>Klubs</li>
            <li>Vintage</li>
          </ul>
        </div>
        <div className="col-span-full xl:col-span-9">
          <h2
            className="text-5xl font-bold mb-5"
            style={{ textTransform: "capitalize" }}
          >
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {products!.map((product) => (
              <ProductCard {...product} key={product.id} hasEdit={false} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
