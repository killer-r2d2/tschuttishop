import { Hero } from "./components/Hero";
import { ProductList } from "./components/ProductsList";

export default async function Index() {

  return (
    <div>
      <Hero />
      <ProductList />
    </div>
  );
}
