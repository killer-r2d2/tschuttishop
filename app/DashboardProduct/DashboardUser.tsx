import { UserIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";

export function DashboardUser() {
  return (
    <>
      <div className="w-1/4 h-auto bg-slate-200 rounded-xl mt-5">
        <UserIcon className="w-full" />
      </div>
      <div className="mt-5">
        <p>
          <span className="font-bold">Vorname Nachname</span>
          <br />
          Strasse 12
          <br />
          1234 Stadt
        </p>
        <Button color="primary" size="sm" variant="bordered" className="mt-5">
          Bearbeiten
        </Button>
      </div>
    </>
  );
}
