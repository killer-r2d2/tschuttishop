"use client";
// AllProductsPage component: Displays a list of products with filtering options.
import React, { useState, useEffect } from "react";
import { Container } from "@/app/components/Base/Container";
import { RadioGroup, Radio, Select, SelectItem } from "@nextui-org/react";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import { ProductCard } from "@/app/components/Product/ProductCard";
import BackButton from "@/app/components/Base/BackButton";
import useProducts from "@/hooks/useProducts";
import { Product } from "@/app/types/Product";
import { Section } from "@/app/components/Base/Section";

export default function AllProductsPage() {
  const { products, isLoading, isError } = useProducts();
  // State for the list of filtered products based on selected filters.
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // State for the current filter option (e.g., 'all', 'vintage', 'inStock').
  const [filterOption, setFilterOption] = useState("all");
  // State for the selected club in the dropdown filter.
  const [selectedClub, setSelectedClub] = useState("");
  // State to track if there are any products after filtering.
  const [hasProducts, setHasProducts] = useState(true);

  // Extracts unique club names from the products list for the club filter dropdown.
  const uniqueClubs = [
    "Alle",
    ...new Set(
      (products || [])
        .map((product) => product.club)
        .filter((club): club is string => club !== null && club !== undefined)
    ),
  ];

  // Updates filteredProducts based on selected filterOption and selectedClub.
  useEffect(() => {
    if (products) {
      let sortedProducts = [...products].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      let filtered = sortedProducts;
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

      if (selectedClub && selectedClub !== "Alle") {
        filtered = filtered.filter((product) => product.club === selectedClub);
      }

      setFilteredProducts(filtered as Product[]);
      setHasProducts(filtered.length > 0);
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
    <Section>
      <Container>
        <div className="grid grid-cols-12">
          <div className="col-span-full">
            <BackButton />
          </div>
          <div className="col-span-full xl:col-span-3 mb-5 xl:mr-5">
            <div className="bg-slate-200 h-fit p-5 rounded-xl">
              <p className="font-bold mb-4">Filter</p>
              <p className="mb-4">Resultate: {filteredProducts.length}</p>
              <RadioGroup
                value={filterOption}
                onChange={(event) => setFilterOption(event.target.value)}
                defaultValue="all"
                className="mb-4"
              >
                <Radio value="all">Alle Produkte</Radio>
                <Radio value="vintage">Vintage</Radio>
                <Radio value="inStock">Erhältlich</Radio>
                <Radio value="outOfStock">Verkauft</Radio>
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
            <h1 className="text-5xl font-bold mb-5">Alle Produkte</h1>
            {hasProducts ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Map each filtered product to a ProductCard component. */}
                {filteredProducts.map((product) => (
                  <ProductCard {...product} key={product.id} hasEdit={false} />
                ))}
              </div>
            ) : (
              <p>Keine Produkte gefunden.</p>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
