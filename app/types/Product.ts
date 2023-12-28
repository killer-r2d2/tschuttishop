export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  size?: string | null;
  club?: string | null;
  category?: string | null;
  inStock: boolean;
  isVintage: boolean;
  createdAt: Date;
  updatedAt: Date;
  profileId?: string | null | undefined;};

export type ApiResponse = Product[] | Product | { error: string };
