"use client";
import  useProducts  from '@/hooks/useProducts';
import Image from "next/image";

export function Products() {
  const {products, isLoading, isError} = useProducts();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError.message}</p>;
  
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* <p>{JSON.stringify(products)}</p> */}
          {products!.map((product) => (
            <div key={product.id} className="card border shadow-xl rounded-xl hover:scale-101 hover:shadow-2xl transition">
              <div>
                <Image
                    height="1000"
                    width="1000"
                    src="/shirt-player.png"
                    alt="Shirt"
                    className="rounded-t-xl"
                />
              </div>
              <div className="p-5">
                <h2 className="font-bold">{product.name}</h2>
                <p className="mb-5">{product.description}</p>
                <hr/>
                <p className="font-bold mt-5">{product.price}</p>
              </div>
            </div>
          ))}
      </div>
  );
}

