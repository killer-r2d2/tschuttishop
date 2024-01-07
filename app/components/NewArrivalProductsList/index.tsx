"use client";
import useProducts from "@/hooks/useProducts";
import { FireIcon } from "@heroicons/react/24/solid";
import { Section } from "../Base/Section";
import { Container } from "../Base/Container";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import { ProductCard } from "@/app/components/Product/ProductCard";
import { Product } from "@/app/types/Product";


export function NewArrivalProductsList() {
  const { products, isLoading, isError } = useProducts();

  if (isLoading) return <SpinnerNext />;
  if (isError) return <p>Error: {isError.message}</p>;

  const isRecentProduct = (product: Product) => {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    return new Date(product.createdAt) >= date;
  };
  const recentProducts = (products as Product[]).filter(isRecentProduct) || [];
  const displayedProducts = recentProducts.slice(0, 12);
  
  return (
    <>
      <Section>
        <Container>
          <div className="flex items-center mb-5">
            <FireIcon className="h-14" />
            <h2 className="text-5xl font-bold">Neu eingetroffen</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {(displayedProducts as Product[]).map((product) => (
              <ProductCard {...product} key={product.id} hasEdit={false} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
