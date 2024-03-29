"use client";
import { Product } from "@/app/types/Product";
import { Button, Badge } from "@nextui-org/react";
import Image from "next/image";
import { Container } from "@/app/components/Base/Container";
import BackButton from "@/app/components/Base/BackButton";
import { cartStore } from "@/store/cartStore";
import { favoritesStore } from "@/store/favoritesStore";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useStore } from "zustand";
import { Section } from "@/app/components/Base/Section";

const ProductPageContent = ({
  id,
  name,
  club,
  size,
  description,
  price,
  inStock,
  isVintage,
  image,
}: Product) => {
  const favItems: number[] = useStore(favoritesStore, (state) => state.items);
  const addFav = useStore(favoritesStore, (state) => state.addFav);
  const removeFav = useStore(favoritesStore, (state) => state.removeFav);
  const addItem = cartStore((state) => state.addItem);
  const cartItems: number[] = cartStore((state) => state.items);

  return (
    <Section>
      <Container>
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-8">
          <div className="col-span-full">
            <BackButton />
          </div>
          <div className="col-span-full xl:col-span-4 bg-slate-200 rounded-xl relative aspect-[4/3] max-w-lg">
            <Image
              src={image ? image : "/placeholder.jpg"}
              alt={name}
              width={500}
              height={500}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              className="rounded-xl"
              priority
            />
          </div>
          <div className="col-span-full xl:col-span-8 h-full flex flex-col justify-between gap-y-5 lg:gap-y-5">
            <div className="flex justify-between flex-col gap-y-4 md:flex-row">
              <h1 className="text-4xl font-bold">{name}</h1>
              {favItems.includes(id) ? (
                <Button
                  isIconOnly
                  color="danger"
                  aria-label="Remove from favorites"
                  size="sm"
                  onClick={() => removeFav(id)}
                >
                  <HeartIcon className="w-1/2" />
                </Button>
              ) : (
                <Button
                  isIconOnly
                  color="danger"
                  aria-label="Add to favorites"
                  size="sm"
                  variant="bordered"
                  onClick={() => addFav(id)}
                >
                  <HeartIcon className="w-1/2" />
                </Button>
              )}
            </div>
            <div>
              <p className="lg:text-xl">Klub: {club}</p>
              <p className="lg:text-xl">Grösse: {size}</p>
              {isVintage && <p className="lg:text-xl">Vintage</p>}
            </div>
            <div>
              <p className="lg:text-xl font-bold">{price} CHF</p>
              <hr className="mt-4 mb-4" />

              {!cartItems.includes(id) ? (
                <Button
                  onClick={() => addItem(id)}
                  isDisabled={!inStock}
                  color="primary"
                >
                  {inStock ? "In den Warenkorb" : "Verkauft"}
                </Button>
              ) : (
                <Button variant="faded" isDisabled>
                  Im Warenkorb
                </Button>
              )}
            </div>
          </div>
          <div className="col-span-full xl:col-start-5">
            <p className="font-bold">Beschreibung</p>
            {description}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ProductPageContent;
