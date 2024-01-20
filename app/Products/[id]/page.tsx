"use client";
// Page component: Responsible for rendering the product details page based on a given product ID.
import useGetProductById from "@/hooks/useGetProductById";
import { Container } from "@/app/components/Base/Container";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import ProductPageContent from "@/app/Products/[id]/ProductPageContent";

export default function Page({ params }: { params: { id: number } }) {
  const productId: number = params.id;

  const { product, isLoading, isError } = useGetProductById(productId);

  if (isLoading)
    return (
      <Container>
        <SpinnerNext />
      </Container>
    );
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <ProductPageContent
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
    ></ProductPageContent>
  );
}
