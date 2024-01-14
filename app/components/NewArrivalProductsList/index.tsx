"use client";
import useProducts from "@/hooks/useProducts";
import { FireIcon } from "@heroicons/react/24/solid";
import { Section } from "../Base/Section";
import { Container } from "../Base/Container";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import { ProductCard } from "@/app/components/Product/ProductCard";
import { Product } from "@/app/types/Product";
import React from "react";
import { Link, Button } from "@nextui-org/react";

export function NewArrivalProductsList() {
  const { products, isLoading, isError } = useProducts();
  if (isLoading) return <SpinnerNext />;
  if (isError) return <p>Error: {isError.message}</p>;

  // Sort products by createdAt date in descending order and filter out the products that are out of stock
  const sortedProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .filter((product: Product) => product.inStock);

  // Select the first 12 products from the sorted and filtered list to display
  const displayedProducts = sortedProducts.slice(0, 12);

  return (
    <>
      <Section>
        <Container> 
          <div className="flex items-center mb-5">
            <FireIcon className="h-14" />
            <h2 id="newArrivals" className="text-3xl font-bold scroll-mt-48">Neu eingetroffen</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayedProducts.map((product) => (
              <ProductCard {...product} key={product.id} hasEdit={false} />
            ))}
          </div>
          {/* button link to AllProducts page */}
          <div className="flex justify-center mt-10">
            <Button
              href="/AllProducts"
              as={Link}
              color="primary"
            >
              Alle Produkte
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
