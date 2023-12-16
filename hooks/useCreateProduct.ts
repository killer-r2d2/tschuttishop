import { useState } from "react";
import { FormData, UseCreateProductResponse } from "../app/types/Form";
import { mutate } from 'swr'


export const useCreateProduct = (): UseCreateProductResponse => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const createProduct = async (formData: FormData) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("An error occurred while creating the product.");
      }

      mutate('/api/products')


      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (error: any) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createProduct,
    isLoading,
    isError,
    isSuccess,
  };
}