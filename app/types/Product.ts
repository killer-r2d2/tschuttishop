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
  profileId: string | null;
  buyerId?: string | null;
  isPaid: boolean;
  isShipped: boolean;
  image?: string | null;
};

export type ApiResponse = Product[] | Product | { error: string };
