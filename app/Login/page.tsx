import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Section } from "@/app/components/Base/Section";
import { Container } from "@/app/components/Base/Container";

import { redirect } from "next/navigation";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/Login?message=User konnte nicht authentifiziert werden");
    }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log("error: ", error);
      
      return redirect("/Login?message=User konnte nicht authentifiziert werden");
    }

    return redirect("/Login?message=Du hast eine E-Mail erhalten, bitte bestätige diese");
  };

  const resetPassword = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      return redirect(
        "/Login?message=User konnte nicht authentifiziert werden"
      );
    }

    return redirect("/Login?message=Du hast eine E-Mail erhalten. Bitte bestätige deine E-Mail-Adresse");
  };

  return (
    <Section>
      <Container>
        <div className="flex justify-center h-full">
          <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <Link
              href="/"
              className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>{" "}
              Back
            </Link>

            <form
              className="animate-in flex-1 flex flex-col w-full justify-center mb-16 gap-2 text-foreground"
              action={signIn}
            >
              <label className="text-md" htmlFor="email">
                Email
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="email"
                placeholder="you@example.com"
                required
              />
              <label className="text-md" htmlFor="password">
                Password
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
              <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
                Sign In
              </button>
              <button
                formAction={signUp}
                className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
              >
                Sign Up
              </button>
            </form>
            <h2 className="text-foreground">Passwort vergessen?</h2>
            <form action={resetPassword}>
              <input
                className="rounded-md w-full px-4 py-2 bg-inherit border mb-6"
                name="email"
                placeholder="you@example.com"
                required
              />
              <button className="bg-green-700 w-full rounded-md px-4 py-2 text-foreground mb-2">
                Passwort zurücksetzen
              </button>
            </form>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
