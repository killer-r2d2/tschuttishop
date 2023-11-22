"use client";
import { Container } from "@/app/components/Base/Container";
import BackButton from "@/app/components/Base/BackButton";
import { SideNavigation } from "@/app/components/SideNavigation";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import useGetProductsById from "@/hooks/useGetProductsById";
import { ProductCard } from "@/app/components/Product/ProductCard";
import React from "react";

export default function Cart() {
  const ids: number[] = [172, 175, 176];

  const { products, isLoading, isError } = useGetProductsById(ids);
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
        <div className="col-span-full">
          <BackButton />
        </div>
        <div className="col-span-full xl:col-span-3">
          <SideNavigation />
        </div>
        <div className="col-span-full xl:col-span-9">
          <h2 className="text-5xl font-bold mb-5">Warenkorb</h2>
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
