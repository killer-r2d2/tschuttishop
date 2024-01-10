"use client";
import useGetProductById from "@/hooks/useGetProductById";
import ProductPage from "@/app/components/ProductPage";
import { Container } from "@/app/components/Base/Container";
import { SpinnerNext } from "@/app/components/Base/Spinner";

export default function Page({ params }: { params: { id: number } }) {
  const productId: number = params.id;

  const { product, isLoading, isError } = useGetProductById(productId.toString());

  if (isLoading)
    return (
      <Container>
        <SpinnerNext />
      </Container>
    );
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <ProductPage
      id={0}
      name={""}
      description={""}
      price={0}
      size={""}
      category={""}
      inStock={false}
      isVintage={false}
      club={""}
      profileId={""}
      createdAt={new Date()}
      updatedAt={new Date()}
      isPaid={false}
      isShipped={false}
      {...product}
    ></ProductPage>
  );
}
