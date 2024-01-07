import { useEffect, useState } from "react";

/**
 * Use this function when you want to fix the "hydration" error in NextJS
 * @param store
 * @param callback
 */
export const useAsyncStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};
