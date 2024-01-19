import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Orders from "@/app/DashboardProduct/Orders/Orders";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/Login");
  }

  return <Orders userProfileId={user?.id} />;
}
