"use client";
import useSWR from "swr";
import { Product, ApiResponse } from '../app/types/Product';

// const fetcher = (...args) => fetch(...args).then(res => res.json())

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default function useProducts () {
  const { data, error, isLoading } = useSWR<ApiResponse>(`/api/getProducts`, fetcher)
 
  return {
    products: data,
    isLoading,
    isError: error
  }
}