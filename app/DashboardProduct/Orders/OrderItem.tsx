import { Product } from "@/app/types/Product";
import Image from "next/image";
import { Chip } from "@nextui-org/chip";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function OrderItem({ id, name, price, isPaid }: Product) {
  return (
    <Link
      href={`/DashboardProduct/Orders/${id}`}
      className="grid grid-cols-6 gap-12 border-t py-4 px-8 items-center xl:hover:bg-slate-100 transition-colors"
    >
      <div className="col-span-full xl:col-span-1 relative aspect-[4/3] max-w-lg">
        <Image
          src="/shirt-player.png"
          alt={name}
          width={800}
          height={800}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          className="rounded-xl"
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
