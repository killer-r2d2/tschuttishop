"use client";
import React, { useState, useEffect } from "react";
import { Container } from "@/app/components/Base/Container";
import { RadioGroup, Radio, Select, SelectItem } from "@nextui-org/react";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import { ProductCard } from "@/app/components/Product/ProductCard";
import BackButton from "@/app/components/Base/BackButton";
import useProducts from "@/hooks/useProducts";
import { Product } from "@/app/types/Product";

export default function Page({ params }: { params: { category: string } }) {
  const category: string = params.category;

  const { products, isLoading, isError } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filterOption, setFilterOption] = useState("all");
  const [selectedClub, setSelectedClub] = useState("");

  const uniqueClubs = ["Alle", ...new Set(
    (products || [])
      .map((product) => product.club)
      .filter((club): club is string => club !== null && club !== undefined)
  )];
  useEffect(() => {
    if (products) {
      let filtered = products;

      // Filterlogik
      switch (filterOption) {
        case "vintage":
          filtered = (filtered as Product[]).filter(
            (product) => product.isVintage
          );
          break;
        case "inStock":
          filtered = (filtered as Product[]).filter(
            (product) => product.inStock
          );
          break;
        case "outOfStock":
          filtered = (filtered as Product[]).filter(
            (product: Product) => !product.inStock
          );
          break;
      }

      // Club-Filter
      if (selectedClub && selectedClub !== "Alle") {
        filtered = filtered.filter((product) => product.club === selectedClub);
      }

      setFilteredProducts(filtered as Product[]);
    }
  }, [products, filterOption, selectedClub]);

  if (isLoading)
    return (
      <Container>
        <SpinnerNext />
      </Container>
    );
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <Container>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-full">
          <BackButton />
        </div>
        <div className="col-span-full xl:col-span-3">
          <div className="bg-slate-200 h-fit p-5 rounded-xl">
            <p className="font-bold mb-4">Filter</p>
            <RadioGroup
              value={filterOption}
              onChange={(event) => setFilterOption(event.target.value)}
              defaultValue="all"
              className="mb-4"
            >
              <Radio value="all">Alle Produkte</Radio>
              <Radio value="vintage">Vintage</Radio>
              <Radio value="inStock">Erhältlich</Radio>
              <Radio value="outOfStock">Ausverkauft</Radio>
            </RadioGroup>
            <Select
              label="Wählen Sie einen Club"
              placeholder="Club auswählen"
              className="max-w-xs"
              onChange={(e) => setSelectedClub(e.target.value)}
            >
              {uniqueClubs.map((club) => (
                <SelectItem key={club || ""} value={club || ""}>
                  {club}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="col-span-full xl:col-span-9">
          <h2
            className="text-5xl font-bold mb-5"
            style={{ textTransform: "capitalize" }}
          >
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard {...product} key={product.id} hasEdit={false} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
