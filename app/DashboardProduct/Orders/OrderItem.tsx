import { Product } from "@/app/types/Product";
import Image from "next/image";
import { Chip } from "@nextui-org/chip";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function OrderItem({ id, name, price, isPaid }: Product) {
  return (
    <Link
      href={`/DashboardProduct/Orders/${id}`}
      className="grid grid-cols-12 gap-12 border-t pt-4 pb-4 pr-8 pl-8 flex items-center xl:hover:bg-slate-100 transition-colors"
    >
      <div className="p-2 col-span-full xl:col-span-2 relative min-h-[130px]">
        <Image
          src="/shirt-player.png"
          fill
          objectFit="cover"
          alt={name}
          className="rounded-xl h-[200px]"
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
      <div className="col-span-full xl:col-span-3">
        <p>
          Gekauft von:
          <br />
          <span className="font-bold">USERNAME</span>
        </p>
        <p className="mt-2">
          am:
          <br />
          <span className="font-bold">DATUM</span>
        </p>
      </div>
      <div className="col-span-full xl:col-span-3">
        {isPaid ? (
          <Chip color="success">Rechnung bezahlt</Chip>
        ) : (
          <Chip color="warning">Rechnung offen</Chip>
        )}
      </div>
      <div className="col-span-full xl:col-span-1 d-none xl:block">
        <ChevronRightIcon className="w-6" />
      </div>
    </Link>
  );
}
