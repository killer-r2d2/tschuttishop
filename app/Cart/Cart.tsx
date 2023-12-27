"use client";
import { Container } from "@/app/components/Base/Container";
import BackButton from "@/app/components/Base/BackButton";
import { SideNavigation } from "@/app/components/SideNavigation";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import useGetProductsById from "@/hooks/useGetProductsById";
import CartItem from "@/app/Cart/CartItem";

import { cartStore } from "@/store/cartState";

export default function Cart({
  userProfileId,
}: {
  userProfileId: string | undefined;
}) {
  const items: number[] = cartStore((state) => state.items);

  const { products, isLoading, isError } = useGetProductsById(items);
  if (isLoading)
    return (
      <Container>
        <SpinnerNext />
      </Container>
    );
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <Container>
      <h1>{userProfileId}</h1>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-full">
          <BackButton />
        </div>
        <div className="col-span-full xl:col-span-3">
          <SideNavigation />
        </div>
        <div className="col-span-full xl:col-span-9">
          <h2 className="text-5xl font-bold mb-5">Warenkorb</h2>
          <div>
            {products!.map((product) => (
              <CartItem key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
