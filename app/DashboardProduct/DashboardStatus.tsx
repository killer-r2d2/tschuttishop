import { Button } from "@nextui-org/button";
import { BanknotesIcon, TruckIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export function DashboardStatus({ profileId }: { profileId: string }) {
  return (
    <>
      <div className="flex p-5 gap-x-16 items-center rounded-xl bg-warning-50 lg:w-fit">
        <div>
          <h2 className="text-xl font-bold">Offene Rechnung</h2>
          <p>Du hast noch offene rechnungen!</p>
          <Button color="primary" as={Link} href="/DashboardProduct/Orders">
            Zu gekauften Artikeln
          </Button>
        </div>
        <div className="mt-5">
          <BanknotesIcon className="w-12" />
        </div>
      </div>
      <div className="mt-10 flex p-5 gap-x-16 items-center rounded-xl bg-warning-50 lg:w-fit">
        <div>
          <h2 className="text-xl font-bold">Offene Sendungen</h2>
          <p>Du hast noch Artikel die du versenden musst!</p>
          <Button href="/DashboardProduct/Sold" as={Link} color="primary">
            Zu verkauften Artikeln
          </Button>
        </div>
        <div className="mt-5">
          <TruckIcon className="w-12" />
        </div>
      </div>
    </>
  );
}
