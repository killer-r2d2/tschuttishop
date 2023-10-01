import { Form } from "./components/Form";
import { Hero } from "./components/Hero";
import { ProductList } from "./components/ProductsList";

export default async function Home() {
  return (
    <div>
    <Hero/>
    <ProductList/>
    </div>
  );
}
