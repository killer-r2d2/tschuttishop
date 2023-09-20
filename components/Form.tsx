'use client';
import React, { useState } from "react";

type ProductInput = {
  name: string;
  description?: string;
  price: number;
  inStock: boolean;
};

export default function CreateProductForm() {
  const [productInput, setProductInput] = useState<ProductInput>({
    name: "",
    description: "",
    price: 0,
    inStock: true, // automatisch auf true gesetzt
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Grundlegende Validierung
    if (!productInput.name || productInput.price <= 0) {
      alert("Invalid input. Name and price are required.");
      setIsLoading(false);
      return;
    }

    const payload = {
      ...productInput,
      inStock: true, // automatisch auf true gesetzt
    };

    const res = await fetch("/api/createProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setIsLoading(false);
    if (res.ok) {
      alert("Product created successfully.");
    } else {
      alert("An error occurred while creating the product.");
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={productInput.name}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleChange}
            value={productInput.description || ""}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            onChange={handleChange}
            value={productInput.price}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
}
