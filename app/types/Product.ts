export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  createdAt: number;
  updatedAt: number;
};

export type ApiResponse = Product[];