"use client";
import useProducts from "@/hooks/useProducts";
import Image from "next/image";
import Link from "next/link";
import { FireIcon } from "@heroicons/react/24/solid";
import { Section } from "../Base/Section";
import { Container } from "../Base/Container";

export function ProductList() {
  const { products, isLoading, isError } = useProducts();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <>
      <Section>
        <Container>
          <div className="flex items-center mb-5">
            <FireIcon className="h-14" />
            <h2 className="text-5xl font-bold">Neu eingetroffen</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {products!.map((product) => (
              <div
                key={product.id}
                className="card border shadow-xl rounded-xl hover:scale-101 hover:shadow-2xl transition"
              >
                <Link href={`/products/${product.id}`}>
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
                    <p className="mb-5 truncate ...">{product.description}</p>
                    <div className="border-t">
                      <p className="font-bold mt-5">{product.price}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
