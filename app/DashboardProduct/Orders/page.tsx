"use server";
import { Container } from "@/app/components/Base/Container";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Orders from "@/app/DashboardProduct/Orders/Orders";

export default async function OrdersPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Container>
      <Orders userProfileId={user?.id} />
    </Container>
  );
}
