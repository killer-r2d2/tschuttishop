"use client";
import { Container } from "@/app/components/Base/Container";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import OrderItem from "@/app/DashboardProduct/Orders/OrderItem";
import useProducts from "@/hooks/useProducts";
import BackButton from "@/app/components/Base/BackButton";
import SoldItem from "@/app/DashboardProduct/Sold/SoldItem";
import { Product } from "@/app/types/Product";
export default function Orders({
  userProfileId,
}: {
  userProfileId: string | undefined;
}) {
  const { products, isLoading, isError } = useProducts();

  const boughtProducts = (products as Product[])?.filter(
    (product) => product.buyerId === userProfileId,
  );

  if (isLoading)
    return (
      <Container>
        <SpinnerNext />
      </Container>
    );
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <Container>
      <BackButton />
      <div>
        <h1 className="text-5xl font-bold mb-5">Gekaufte Artikel</h1>
        {boughtProducts!.length > 0 ? (
          boughtProducts!.map((product) => (
            <OrderItem key={product.id} {...product} />
          ))
        ) : (
          <p>Sie haben noch keine Produkte gekauft.</p>
        )}
      </div>
    </Container>
  );
}
