import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Container } from "@/app/components/Base/Container";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import UserDropdown from "@/app/components/AuthButton/userDropdown";

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
    return redirect("/");
  };

  return user ? (
    <div className="pt-2 bg-slate-900 text-slate-100">
      <Container>
        <div className="flex justify-end items-center gap-6">
          <form action={signOut}>
            <button className="hover:text-slate-500 transition-colors">
              Logout
            </button>
          </form>
          <UserDropdown user={user.email} />
        </div>
      </Container>
    </div>
  ) : (
    <div className="pt-2 bg-slate-900 text-slate-100">
      <Container>
        <div className="flex justify-end items-center gap-4">
          <Link
            href="/Login"
            className="hover:text-slate-500 transition-colors"
          >
            Login
          </Link>
          <UserCircleIcon className="w-8 text-slate-500 " />
        </div>
      </Container>
    </div>
  );
}
