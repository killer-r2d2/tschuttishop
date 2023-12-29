import { Product } from "@/app/types/Product";
import Image from "next/image";
import { Chip } from "@nextui-org/chip";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function SoldItem({ id, name, price, isPaid }: Product) {
  return (
    <Link
      href={`/DashboardProduct/Sold/${id}`}
      className="grid grid-cols-6 gap-12 border-t pt-4 pb-4 pr-8 pl-8 items-center xl:hover:bg-slate-100 transition-colors"
    >
      <div className="p-2 col-span-full xl:col-span-1 relative min-h-[200px] xl:min-h-[130px]">
        <Image
          src="/shirt-player.png"
          fill
          objectFit="cover"
          alt={name}
          className="rounded-xl h-[200px] max-w-full"
        />
      </div>
      <div className="col-span-full xl:col-span-3">
        <h2 className="text-xl">{name}</h2>
        <div>
          <p>
            Preis: <span className="font-bold">{price} CHF</span>
          </p>
        </div>
      </div>
      <div className="col-span-full xl:col-span-1">
        {isPaid ? (
          <Chip color="success">Rechnung bezahlt</Chip>
        ) : (
          <Chip color="warning">Rechnung offen</Chip>
        )}
      </div>
      <div className="col-span-full xl:col-span-1 hidden xl:flex w-full justify-end">
        <ChevronRightIcon className="w-6" />
      </div>
    </Link>
  );
}
