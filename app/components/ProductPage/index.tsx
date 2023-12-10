"use client";
import { Product } from "@/app/types/Product";
import { Button } from "@nextui-org/button";
import Image from "next/image";

import { SideNavigation } from "@/app/components/SideNavigation";
import BackButton from "@/app/components/Base/BackButton";
import { cartStore } from "@/store/cartState";

const Index = ({
  id,
  name,
  description,
  price,
  inStock,
  createdAt,
  updatedAt,
}: Product) => {
  const addItem = cartStore((state) => state.addItem);
  return (
    <div className="container">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-full">
          <BackButton />
        </div>
        <div className="col-span-full xl:col-span-3">
          <SideNavigation />
        </div>
        <div className="col-span-full xl:col-span-4 bg-slate-200 h-[500px] p-5 rounded-xl relative">
          <Image
            src="/shirt-player.png"
            fill
            objectFit="cover"
            alt={name}
            className="rounded-xl"
          />
        </div>
        <div className="col-span-full xl:col-span-5 h-full flex flex-col justify-between">
          <h1 className="text-4xl font-bold">{name}</h1>
          <div>
            <p className="text-xl font-bold">{price} CHF</p>
            <hr className="mt-4 mb-4" />
            <Button
              onClick={() => addItem(id)}
              isDisabled={!inStock}
              color="primary"
            >
              {inStock ? "In den Warenkorb" : "Ausverkauft"}
            </Button>
          </div>
        </div>
        <div className="col-span-full xl:col-start-4 col-end-8">
          <p className="font-bold">Beschreibung</p>
          {description}
        </div>
      </div>
    </div>
  );
};

export default Index;
