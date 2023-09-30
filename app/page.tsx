import { Products } from "../components/Products";
import { Form } from "../components/Form";
import Hero from "@/app/components/hero";
import { FireIcon } from "@heroicons/react/24/solid";

export default async function Home() {
  return (
    <div>
      <Hero/>
        <div className="container mt-20">
            <div className="flex items-center mb-5">
                <FireIcon className="h-14"/>
                <h2 className="text-5xl font-bold">Neu eingetroffen</h2>
            </div>
            <Products />
            <Form />
        </div>
    </div>
  );
}
