import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import CartList from "@/app/Cart/CartList";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/Login");
  }

  return (
    <>
      <CartList userProfileId={user?.id} />
    </>
  );
}
