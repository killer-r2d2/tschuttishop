"use client";
import useGetProductById from "@/hooks/useGetProductById";
import { Container } from "@/app/components/Base/Container";
import { SpinnerNext } from "@/app/components/Base/Spinner";

import OrdersPageContent from "@/app/DashboardProduct/Orders/[id]/OrdersPageContent";

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
    <OrdersPageContent
      id={0}
      name={""}
      description={""}
      price={0}
      size={""}
      category={""}
      inStock={false}
      createdAt={new Date()}
      updatedAt={new Date()}
      isVintage={false}
      profileId={""}
      isPaid={false}
      isShipped={false}
      {...product}
    ></OrdersPageContent>
  );
}
