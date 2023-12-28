"use client";
import { Container } from "@/app/components/Base/Container";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import OrderItem from "@/app/DashboardProduct/Orders/OrderItem";
import useGetProductsByBuyerId from "@/hooks/useGetProductsByBuyerId";
export default function Orders({
  userProfileId,
}: {
  userProfileId: string | undefined;
}) {
  const { products, isLoading, isError } =
    useGetProductsByBuyerId(userProfileId);
  if (isLoading)
    return (
      <Container>
        <SpinnerNext />
      </Container>
    );
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <Container>
      <div>
        <h1>Orders</h1>
        {products!.map((product) => (
          <OrderItem key={product.id} {...product} />
        ))}
      </div>
    </Container>
  );
}
