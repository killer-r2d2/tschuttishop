"use client";
import useSWR from "swr";
import { ApiResponse } from "../app/types/Product";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function useGetProductsById(ids: number[]) {
  const url = `/api/products?ids=${ids}`;
  const { data, error, isLoading } = useSWR<ApiResponse>(url, fetcher);

  return {
    products: data,
    isLoading,
    isError: error,
  };
}
