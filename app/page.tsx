import { Hero } from "./components/Hero";
import { NewArrivalProductsList } from "./components/NewArrivalProductsList";
import { Headline } from "./components/Headline";
export default async function Index() {
  return (
    <div>
      <Hero />
      <Headline />
      <NewArrivalProductsList />
    </div>
  );
}
