export type FormData = {
  name: string;
  description: string;
  size: string;
  club: string;
  price: number;
  inStock: boolean;
  profileId: string;
  image: string;
};

export type UseCreateProductResponse = {
  createProduct: (formData: FormData) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};
