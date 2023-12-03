import AuthButton from "./components/AuthButton";
import { Form } from "./components/Form";
import { Hero } from "./components/Hero";
import { ProductList } from "./components/ProductsList";

export default async function Home() {
  return (
    <div>
      <AuthButton />
      <Hero />
      <ProductList />
    </div>
  );
}
