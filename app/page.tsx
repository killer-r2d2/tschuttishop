import { Form } from "./components/Form";
import { Hero } from "./components/Hero";
import { FireIcon } from "@heroicons/react/24/solid";
import { ProductList } from "./components/ProductsList";

export default async function Home() {
  return (
    <div>
      <Hero/>
        <div className="container mt-20">
            <div className="flex items-center mb-5">
                <FireIcon className="h-14"/>
                <h2 className="text-5xl font-bold">Neu eingetroffen</h2>
            </div>
            <ProductList />
            <Form />
        </div>
    </div>
  );
}
