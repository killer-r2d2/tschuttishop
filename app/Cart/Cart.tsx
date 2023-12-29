"use client";
import { Container } from "@/app/components/Base/Container";
import BackButton from "@/app/components/Base/BackButton";
import { SideNavigation } from "@/app/components/SideNavigation";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import useGetProductsById from "@/hooks/useGetProductsById";
import CartItem from "@/app/Cart/CartItem";
import { usePurchaseProduct } from "@/hooks/usePurchaseProduct";
import { useRouter } from "next/navigation";

import { cartStore } from "@/store/cartState";
import { Button } from "@nextui-org/button";

export default function Cart({
  userProfileId,
}: {
  userProfileId: string | undefined;
}) {
  const items: number[] = cartStore((state) => state.items);
  const clearCart = cartStore((state) => state.clearCart);
  const { purchaseProduct } = usePurchaseProduct();
  const { products, isLoading, isError } = useGetProductsById(items)
  const router = useRouter();
  
  (items);
  if (isLoading)
    return (
      <Container>
        <SpinnerNext />
      </Container>
    );
  if (isError) return <p>Error: {isError.message}</p>;

  const buyItems = async (items: number[]) => {
    if (!userProfileId) {
      console.error("userProfileId is undefined");
      return;
    }
    try {
      for (const itemId of items) {
       await purchaseProduct(itemId, userProfileId);
      }
      alert("Kauf erfolgreich");
      router.push("/DashboardProduct/Orders");
      clearCart();

    } catch (error) {
      if (error instanceof Error) {
        console.error("Fehler beim Kauf: ", error.message);
      } else {
        console.error("Ein unerwarteter Fehler ist aufgetreten");
      }
    }
  };

  return (
    <Container>
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
            {items.length === 0 && (
              <p className="text-xl font-bold">Keine Produkte im Warenkorb</p>
            )}
            {items.length > 0 &&
              products!.map((product) => (
                <CartItem key={product.id} {...product} />
              ))}
          </div>
        </div>

        {items.length > 0 && (
          <div className="col-span-full flex flex-col items-end">
            <div className="font-bold">
              Total: {products!.reduce((acc, curr) => acc + curr.price, 0)} CHF
            </div>
            <div className="mt-5">
              <Button color="primary" onClick={() => buyItems(items)}>
                Jetzt Kaufen
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
