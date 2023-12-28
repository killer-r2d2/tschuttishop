export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category?: string | null;
  size?: string | null;
  club?: string | null;
  inStock: boolean;
  isVintage: boolean;
  createdAt: Date;
  updatedAt: Date;
  profileId: string;
  buyerId?: string | null;
  isPaid: boolean;
  isShipped: boolean;
};

export type ApiResponse = Product[];
