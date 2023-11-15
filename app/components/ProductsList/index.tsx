"use client";
import useProducts from "@/hooks/useProducts";
import { FireIcon } from "@heroicons/react/24/solid";
import { Section } from "../Base/Section";
import { Container } from "../Base/Container";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import { ProductCard } from "@/app/components/Product/ProductCard";

export function ProductList() {
  const { products, isLoading, isError } = useProducts();

  if (isLoading) return <SpinnerNext />;
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <>
      <Section>
        <Container>
          <div className="flex items-center mb-5">
            <FireIcon className="h-14" />
            <h2 className="text-5xl font-bold">Neu eingetroffen</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {products!.map((product) => (
              <ProductCard {...product} key={product.id} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
