"use client";
import { useState, useEffect } from "react";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import {
  productAspectsSizes,
  productAspectsClubs,
} from "@/app/DashboardProduct/formProductAspects";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import { CheckIcon } from "@heroicons/react/24/solid";

export function DashboardProductForm({
  userProfileId,
}: {
  userProfileId: string;
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    size: "M",
    club: "FC Basel",
    price: 0.0,
    inStock: true,
    isVintage: false,
    profileId: userProfileId,
  });
  const { isLoading, isError, createProduct, isSuccess } = useCreateProduct();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const actualValue =
      type === "checkbox"
        ? checked
        : type === "number"
        ? parseFloat(value)
        : value;
    setFormData({ ...formData, [name]: actualValue });
  };

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        name: "",
        description: "",
        size: "",
        club: "",
        price: 0.0,
        inStock: true,
        isVintage: false,
        profileId: userProfileId,
      });
    }
  }, [isSuccess, userProfileId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.profileId) {
      console.log("profileId is missing");
    }
    createProduct({ ...formData, size: formData.size });
  };

  const sizes = productAspectsSizes;
  const clubs = productAspectsClubs;

  if (isLoading) return <SpinnerNext />;
  if (isSuccess)
    return (
      <div className="bg-success-100 p-4 flex gap-8 rounded-xl w-fit">
        <p className="text-xl font-bold text-success-800">
          Das Produkt wurde erfolgreich erfasst
        </p>
        <CheckIcon className="w-6" />
      </div>
    );
  if (isError) return <p>Error: hat nicht funktioniert {isError}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-2">
        <Input
          type="text"
          variant={"bordered"}
          label="Name"
          name="name"
          isRequired
          onChange={handleInputChange}
        />
      </div>
      <div className="my-2">
        <Textarea
          variant="bordered"
          label="Beschreibung"
          placeholder="Beschreiben Sie das Produkt"
          name="description"
          isRequired
          onChange={handleInputChange}
        />
      </div>
      <div className="my-2">
        <Select
          label="Grösse"
          name="size"
          className="lg:w-1/2"
          isRequired
          onChange={handleSelectChange}
        >
          {sizes.map((size) => (
            <SelectItem key={size.value} value={size.value}>
              {size.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="my-2">
        <Select
          label="Klub"
          name="club"
          className="lg:w-1/2"
          isRequired
          onChange={handleSelectChange}
        >
          {clubs.map((club) => (
            <SelectItem key={club.value} value={club.value}>
              {club.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="my-2">
        <Input
          type="number"
          variant={"bordered"}
          label="Preis"
          name="price"
          isRequired
          step="0.05"
          onChange={handleInputChange}
        />
      </div>
      <div className="my-4">
        <Checkbox name="isVintage" onChange={handleInputChange}>
          Vintage
        </Checkbox>
      </div>
      <Button color="primary" type="submit">
        Produkt erstellen
      </Button>
    </form>
  );
}
