"use client";
import { useState, useEffect } from "react";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";

export function Form({ userProfileId }: { userProfileId: string }) {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    size: "M",
    club: "FC Basel",
    price: 0.0,
    inStock: false,
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
        inStock: false,
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

  if (isLoading) return <p className="text-purple-600">Loading...</p>;
  if (isSuccess) return <p>Success: hat funktioniert</p>;
  if (isError) return <p>Error: hat nicht funktioniert {isError}</p>;

  const sizes = [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
  ];

  const clubs = [
    { value: "FC Basel", label: "FC Basel" },
    { value: "FC Zürich", label: "FC Zürich" },
    { value: "FC Aarau", label: "FC Aarau" },
    { value: "FC Sion", label: "FC Sion" },
    { value: "FC Luzern", label: "FC Luzern" },
    { value: "FC St.Gallen", label: "FC St. Gallen" },
    { value: "FC Lausanne-Sport", label: "FC Lausanne-Sport" },
    { value: "Servette FC", label: "Servette FC" },
    { value: "FC Lugano", label: "FC Lugano" },
    { value: "FC Vaduz", label: "FC Vaduz" },
  ];

  return (
    <form onSubmit={handleSubmit} className="container mx-auto my-4 p-4">
      <h2>Produkt erfassen</h2>
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
      <div className="flex my-2 w-full flex-wrap md:flex-nowrap gap-4">
        <Select
          label="Grösse"
          name="size"
          className="max-w-xs bg-white"
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
      <div className="flex my-2 w-full flex-wrap md:flex-nowrap gap-4">
        <Select
          label="Club"
          name="club"
          className="max-w-xs bg-white"
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
          step="0.01"
          onChange={handleInputChange}
        />
      </div>
      <div className="my-4">
        <Checkbox name="inStock" onChange={handleInputChange}>
          In Stock
        </Checkbox>
      </div>
      <div className="my-4">
        <Checkbox name="isVintage" onChange={handleInputChange}>
          Vintage
        </Checkbox>
      </div>
      <button
        type="submit"
        className="bg-green-700 text-white rounded px-4 py-2"
      >
        Submit
      </button>
    </form>
  );
}
