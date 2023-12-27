import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Container } from "../Base/Container";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/Login");
  };

  return user ? (
    <div className="container mx-auto ps-5 pe-5 mb-5">
      <div className="flex items-center gap-4">
        Hey, {user.email}!
        <form action={signOut}>
          <button className="py-2 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
            Logout
          </button>
        </form>
        <Link
          href="/DashboardProduct"
          className="py-2 rounded-md max-w-max no-underline bg-btn-background hover:bg-btn-background-hover"
        >
          Dashboard
        </Link>
      </div>
    </div>
  ) : (
    <div className="container mx-auto ps-5 pe-5 mb-5">
      <Link
        href="/Login"
        className="py-2 flex rounded-md max-w-max no-underline bg-btn-background hover:bg-btn-background-hover"
      >
        Login
      </Link>
    </div>
  );
}
