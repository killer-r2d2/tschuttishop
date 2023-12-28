"use client";
import useSWR from "swr";
import { ApiResponse } from "../app/types/Product";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function useGetProductsByBuyerId(buyerId: string | undefined) {
  const url = `/api/products?buyerId=${buyerId}`;
  const { data, error, isLoading } = useSWR<ApiResponse>(url, fetcher);

  return {
    products: data,
    isLoading,
    isError: error,
  };
}
