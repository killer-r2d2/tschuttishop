"use client";
// Favorites page: displaying the user's favorite products.
import { Container } from "@/app/components/Base/Container";
import BackButton from "@/app/components/Base/BackButton";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import { Product } from "../types/Product";
import useProducts from "@/hooks/useProducts";
import { favoritesStore } from "@/store/favoritesStore";
import FavoritesItem from "@/app/Favorites/FavoritesItem";
import { useStore } from "zustand";
import { Section } from "@/app/components/Base/Section";

export default function Page() {
  const items: number[] = useStore(favoritesStore, (state) => state.items);
  const { products, isLoading, isError } = useProducts();
  // Filters the full product list to only show those that are in the favorites list.
  const favoritesProducts = (products as Product[])?.filter((product) =>
    items.includes(product.id)
  );

  if (isLoading)
    return (
      <Container>
        <SpinnerNext />
      </Container>
    );
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <Section>
      <Container>
        <div className="grid grid-cols-12">
          <div className="col-span-full">
            <BackButton />
          </div>
          <div className="col-span-full">
            <h2 className="text-5xl font-bold mb-5">Favoriten</h2>
            <div>
              {items.length > 0 ? (
                favoritesProducts?.map((product) => (
                  <FavoritesItem {...product} key={product.id} />
                ))
              ) : (
                <p className="text-xl font-bold">Keine Produkte in der Liste</p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
