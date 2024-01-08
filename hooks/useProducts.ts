import useSWR from "swr";
import { ApiResponse } from '../app/types/Product';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data as ApiResponse;
}

export default function useProducts() {
  const url = `/api/products`;
  const { data, error } = useSWR<ApiResponse>(url, fetcher);

  const products = Array.isArray(data) ? data : [];

  return {
    products,
    isLoading: !error && !data,
    isError: error
  };
}
