import { Container } from "../components/Base/Container";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardUser } from "@/app/DashboardProduct/DashboardUser";
import { DashboardStatus } from "@/app/DashboardProduct/DashboardStatus";

export default async function Dashboard() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/Login");
  }
  return (
    <Container>
      <h1 className="text-5xl font-bold mb-5">Dashboard</h1>
      <div className="grid grid-cols-2 gap-y-10">
        <div className="col-span-full lg:col-span-1">
          <p className="text-xl">Willkommen {user.email}!</p>
          <DashboardUser profileId={user.id} />
        </div>
        <div className="col-span-full lg:col-span-1">
          <hr className="lg:hidden mb-10" />
          <h2 className="text-2xl font-bold mb-5">Deine Produkte</h2>
          <DashboardStatus profileId={user.id} />
        </div>
      </div>
    </Container>
  );
}
