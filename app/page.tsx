import Hero from "@/app/components/hero";
import CardsList from "@/app/components/Cards";
import { FireIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
      <>
          <Hero />
          <div className="container mt-20">
              <div className="flex items-center  mb-5">
                  <FireIcon className="h-14"/>
                  <h2 className="text-5xl font-bold">Neu eingetroffen</h2>
              </div>
              <CardsList maxCards={4} />
          </div>
    </>
  )
}
