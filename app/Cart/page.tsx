import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import CartList from "@/app/Cart/CartList";

export default async function CartPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  

  return (
    <>
      <CartList userProfileId={user?.id} />
    </>
  );
}
