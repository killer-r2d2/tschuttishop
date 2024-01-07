"use client";
import { Container } from "@/app/components/Base/Container";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import { ProductCard } from "@/app/components/Product/ProductCard";
import React from "react";
import { SideNavigation } from "@/app/components/SideNavigation";
import BackButton from "@/app/components/Base/BackButton";
import useProducts from "@/hooks/useProducts";
import { Product } from "@/app/types/Product";


export default function Page({ params }: { params: { category: string } }) {
  const category: string = params.category;
  console.log(category);

  const { products, isLoading, isError } = useProducts();

  let filteredProducts: Product[] = [];

  if (products) {
    switch (category) {
      case 'vintage':
        filteredProducts = (products as Product[]).filter((product: Product) => product.isVintage);
        break;
      case 'club':
        filteredProducts = products as Product[];
        break;
      default:
        filteredProducts = products as Product[];
    }
  }

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
          <h2
            className="text-5xl font-bold mb-5"
            style={{ textTransform: "capitalize" }}
          >
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product: Product) => (
              <ProductCard {...product} key={product.id} hasEdit={false} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
