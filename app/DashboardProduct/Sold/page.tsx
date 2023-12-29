import { Container } from "@/app/components/Base/Container";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Sold from "@/app/DashboardProduct/Sold/Sold";

export default async function SoldPage() {
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
      <Sold userProfileId={user?.id} />
    </Container>
  );
}
