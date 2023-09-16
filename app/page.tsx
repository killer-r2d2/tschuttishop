type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  createdAt: number;
  updatedAt: number;
};

type ApiResponse = ProductType[];

async function getPorducts(): Promise<ApiResponse> {
  const res = await fetch(`${process.env.BASE_URL}/api/getProducts`);
  if (!res.ok) {
    throw new Error("An error occurred while fetching the products.");
  }
  return res.json();
}

export default async function Home() {
  const data: ProductType[] = await getPorducts();
  return (
    <div>
      {data.map((product) => (
        <div key={product.id}>
          <ul>
            <li>{product.id}</li>
            <li>{product.name}</li>
            <li>{product.description}</li>
            <li>{product.price}</li>
            <li>{product.inStock}</li>
            <li>{product.createdAt}</li>
            <li>{product.updatedAt}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}
