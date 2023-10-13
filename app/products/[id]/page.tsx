"use client";
import useGetProductById from "@/hooks/useGetProductById";
import ProductPage from "@/app/components/ProductPage";
import { Container } from "@/app/components/Base/Container";

export default function Page({ params }: { params: { id: number } }) {
  const productId: number = params.id;

  const { product, isLoading, isError } = useGetProductById(productId);
  if (isLoading)
    return (
      <Container>
        <p>Lade Produkt Daten...</p>
      </Container>
    );
  if (isError) return <p>Error: {isError.message}</p>;

  return <ProductPage id={0} name={""} description={""} price={0} inStock={false} createdAt={0} updatedAt={0} {...product}></ProductPage>;
}
