import { Hero } from "./components/Hero";
import { NewArrivalProductsList } from "./components/NewArrivalProductsList";
export default async function Index() {
  return (
    <div>
      <Hero />
      <NewArrivalProductsList />
    </div>
  );
}
