export type Product = {
    id: number;
    name: string;
    description: string | null;
    price: number;
    inStock: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type ApiResponse = Product[];