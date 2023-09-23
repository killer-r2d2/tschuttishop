import { Products } from "../components/Products";
import { Form } from "../components/Form";
export default async function Home() {
  return (
    <div>
      <Products />
      <Form />
    </div>
  );
}
