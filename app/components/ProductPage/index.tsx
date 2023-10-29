import { Product } from "@/app/types/Product";
import { Button } from "@/app/components/Base/Button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const Index = ({
  id,
  name,
  description,
  price,
  inStock,
  createdAt,
  updatedAt,
}: Product) => (
  <div className="container">
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-full">
        <Link href="/" className="flex max-w-max items-center">
          <ArrowLeftIcon className="w-10 text-slate-900 transition-colors" />
          zurück
        </Link>
      </div>
      <div className="col-span-full xl:col-span-3 bg-slate-200 h-fit p-5 rounded-xl">
        <p className="font-bold">Mehr entdecken</p>
        <ul>
          <li>New Arrivals</li>
          <li>Klubs</li>
          <li>Vintage</li>
        </ul>
      </div>
      <div className="col-span-full xl:col-span-4 bg-slate-200 h-[500px] p-5 rounded-xl relative">
        <Image
          src="/shirt-player.png"
          fill
          objectFit="cover"
          alt={name}
          className="rounded-xl"
        />
      </div>
      <div className="col-span-full xl:col-span-5 h-full flex flex-col justify-between">
        <h1 className="text-4xl font-bold">{name}</h1>
        <div>
          <p className="text-xl font-bold">{price} CHF</p>
          <hr className="mt-4 mb-4" />
          <Button text="In den Warenkorb" type="submit" />
        </div>
      </div>
      <div className="col-span-full xl:col-start-4 col-end-8">
        <p className="font-bold">Beschreibung</p>
        {description}
      </div>
    </div>
  </div>
);

export default Index;
