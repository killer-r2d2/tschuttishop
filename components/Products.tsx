"use client";
import { Product, ApiResponse } from '../app/types/Product';
import  useProducts  from '@/hooks/useProducts';

export default  function Products() {
  const {products, isLoading, isError} = useProducts();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError.message}</p>;
  
  return (
    <div>
      <div className="border">
        <h1>Products</h1>
        <p>{JSON.stringify(products)}</p>
        <div>
          {products.map((product) => (
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

