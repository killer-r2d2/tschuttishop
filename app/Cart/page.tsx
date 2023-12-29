import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Cart from "@/app/Cart/Cart";

export default async function CartPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  

  return (
    <>
      <Cart userProfileId={user?.id} />
    </>
  );
}
