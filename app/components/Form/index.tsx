"use client";
// Desc: Form component
// to create products
import { useState, useEffect } from "react";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";

export function Form() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0.0,
    inStock: false,
  });
  const { isLoading, isError, createProduct, isSuccess } = useCreateProduct();

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
        price: 0.0,
        inStock: false,
      });
    }
  }, [isSuccess]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    createProduct(formData);
  };

  if (isLoading) return <p className="text-purple-600">Loading...</p>;
  if (isSuccess) return <p>Success: hat funktioniert</p>;
  if (isError) return <p>Error: hat nicht funktioniert {isError}</p>;

  return (
    <form onSubmit={handleSubmit} className="container mx-auto my-4 p-4">
      <h2>Produkt erfassen</h2>
      <div className="my-2">
        <Input
          type="text"
          variant={"bordered"}
          label="Name"
          name="name"
          onChange={handleInputChange}
        />
      </div>
      <div className="my-2">
        <Textarea
          variant="bordered"
          labelPlacement="outside"
          label="Beschreibung"
          placeholder="Beschreiben Sie das Produkt"
          name="description"
          onChange={handleInputChange}
        />
      </div>
      <div className="my-2">
        <Input
          type="number"
          variant={"bordered"}
          label="Preis"
          name="price"
          step="0.01"
          onChange={handleInputChange}
        />
      </div>
      <div className="my-4">
        <Checkbox name="inStock" onChange={handleInputChange}>
          In Stock
        </Checkbox>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-4 py-2"
      >
        Submit
      </button>
    </form>
  );
}
