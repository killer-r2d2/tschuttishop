import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Section } from "@/app/components/Base/Section";
import { Container } from "@/app/components/Base/Container";
import { redirect } from "next/navigation";

export default async function UpdatePassword() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/Login");
  }
  const updateUser = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const newPassword = formData.get("newPassword") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.updateUser({
      email,
      password: newPassword,
    });

    if (error) {
      console.log("error: ", error);

      return redirect(
        "/UpdatePassword?message=Das Passwort konnte nicht geändert werden. Bitte überprüfen Sie Ihre Informationen und versuchen Sie es erneut.",
      );
    }

    return redirect("/Login?message=Das Passwort wurde erfolgreich geändert");
  };

  return (
    <Section>
      <Container>
        <div className="flex justify-center h-full">
          <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <h1 className="text-4xl font-bold mb-6">Ein neues Passwort</h1>
            <form
              className="animate-in flex-1 flex flex-col w-full justify-center mb-16 gap-2 text-foreground border-1 border-slate-400 rounded-xl p-4"
              action={updateUser}
            >
              <label className="text-md" htmlFor="email">
                E-Mail
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-4"
                name="email"
                placeholder="
              "
                required
              />
              <label className="text-md" htmlFor="newPassword">
                Neues Passwort
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="password"
                name="newPassword"
                placeholder="••••••••"
                required
              />
              <button className="bg-slate-900 text-white w-full rounded-md px-4 py-2 mb-2">
                Update Password
              </button>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
}
