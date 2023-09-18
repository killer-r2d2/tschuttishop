import { Product, ApiResponse } from '../app/types/Product';

async function getPorducts(): Promise<ApiResponse> {
  const url = `${process.env.BASE_URL}/api/getProducts`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("An error occurred while fetching the products.");
  }
  return res.json();
}

export default async function Products() {
  const data: Product[] = await getPorducts();
  return (
    <div>
      <div className="border">
        <h1>Products</h1>
        <div>
          {data.map((product) => (
            <ul key={product.id}>
              <li>{product.id}</li>
              <li>{product.name}</li>
              <li>{product.description}</li>
              <li>{product.price}</li>
              <li>{product.inStock}</li>
              <li>{product.createdAt}</li>
              <li>{product.updatedAt}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

