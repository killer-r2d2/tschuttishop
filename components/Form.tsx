"use client";
// Desc: Form component
// to create products
import { useState, useEffect } from "react";
import { useCreateProduct } from "@/hooks/useCreateProduct";

export function Form() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0.0,
    inStock: false,
  });
  const { isLoading, isError, createProduct, isSuccess  } = useCreateProduct();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const actualValue = type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: actualValue });
  }
  
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
  }

  if (isLoading) return <p>Loading...</p>;
  if (isSuccess) return <p>Success: hat funktioniert</p>;
  if (isError) return <p>Error: hat nicht funktioniert {isError}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input type="text" name="description" onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input type="number" name="price" step="0.01"  onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="inStock">In Stock</label>
        <input type="checkbox" name="inStock" onChange={handleInputChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}