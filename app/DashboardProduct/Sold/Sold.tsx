"use client";
import { Container } from "@/app/components/Base/Container";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import useProducts from "@/hooks/useProducts";
import SoldItem from "@/app/DashboardProduct/Sold/SoldItem";
import BackButton from "@/app/components/Base/BackButton";
import { Product } from "@/app/types/Product";
export default function Sold({
  userProfileId,
}: {
  userProfileId: string | undefined;
}) {
  const { products, isLoading, isError } = useProducts();

  const soldProducts = (products as Product[])?.filter(
    (product) =>
      product.profileId === userProfileId && product.buyerId !== null,
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
        <h1 className="text-5xl font-bold mb-5">Verkaufte Produkte</h1>
        {soldProducts!.length > 0 ? (
          soldProducts!.map((product) => (
            <SoldItem key={product.id} {...product} />
          ))
        ) : (
          <p>Sie haben noch keine Produkte verkauft.</p>
        )}
      </div>
    </Container>
  );
}
