import { Hero } from "./components/Hero";
import { ProductList } from "./components/ProductsList";
import { getServerSideProps } from "@/app/components/AuthTest";

export default async function Index() {
  return (
    <div>
      <getServerSideProps />
      <Hero />
      <ProductList />
    </div>
  );
}
