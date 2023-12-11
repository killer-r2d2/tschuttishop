"use client";
import { Container } from "@/app/components/Base/Container";
import useGetProductsById from "@/hooks/useGetProductsById";
import { cartStore } from "@/store/cartState";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import OrderItem from "@/app/DashboardProduct/Orders/OrderItem";

export default function Orders() {
  const { products, isLoading, isError } = useGetProductsById([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);
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
