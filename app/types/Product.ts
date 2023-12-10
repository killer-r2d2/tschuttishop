export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  size?: string | null;
  category?: string | null;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ApiResponse = Product[];
