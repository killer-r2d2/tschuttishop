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

  if (isLoading) return <p className="text-purple-600">Loading...</p>;
  if (isSuccess) return <p>Success: hat funktioniert</p>;
  if (isError) return <p>Error: hat nicht funktioniert {isError}</p>;

  return (
    <form onSubmit={handleSubmit} className="container mx-auto my-4 p-4">
      <div className="my-2">
        <label htmlFor="name" className="font-bold">Name</label>
        <input type="text" name="name" onChange={handleInputChange} className="border rounded p-2 w-full" />
      </div>
      <div className="my-2">
        <label htmlFor="description" className="font-bold">Description</label>
        <input type="text" name="description" onChange={handleInputChange} className="border rounded p-2 w-full" />
      </div>
      <div className="my-2">
        <label htmlFor="price" className="font-bold">Price</label>
        <input type="number" name="price" step="0.01" onChange={handleInputChange} className="border rounded p-2 w-full" />
      </div>
      <div className="my-2">
        <label htmlFor="inStock" className="font-bold">In Stock</label>
        <input type="checkbox" name="inStock" onChange={handleInputChange} className="ml-2" />
      </div>
      <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">Submit</button>
    </form>
  );
  
}