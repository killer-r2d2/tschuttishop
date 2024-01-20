// Login component: Handles user authentication actions like sign in, sign up, and password reset.

import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Section } from "@/app/components/Base/Section";
import { Container } from "@/app/components/Base/Container";

import { redirect } from "next/navigation";
import { Input } from "@nextui-org/react";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  // signIn: Authenticates the user with email and password for sign-in.
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
      return redirect(
        "/Login?message=signIn: User konnte nicht authentifiziert werden",
      );
    }
    return redirect("/");
  };
  // signUp: Registers a new user with email and password for sign-up.
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
      return redirect(
        "/Login?message=signUp:User konnte nicht authentifiziert werden",
      );
    }
    return redirect(
      "/Login?message=signUp: Du hast eine E-Mail erhalten, bitte bestätige diese",
    );
  };
  // resetPassword: Sends a password reset email to the user's email address.
  const resetPassword = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      return redirect(
        "/Login?message=resetPassword: User konnte nicht authentifiziert werden",
      );
    }
    return redirect(
      "/Login?message=resetPassword: Du hast eine E-Mail erhalten. Nutze den Link um dir ein neues Passwort zu setzen",
    );
  };

  return (
    <Section>
      <Container>
        <div className="flex justify-center h-full">
          <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <h1 className="text-4xl font-bold mb-6">Willkommen</h1>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {searchParams.message}
              </p>
            )}
            <form
              className="animate-in flex-1 flex flex-col w-full justify-center mb-8 gap-2 text-foreground"
              action={signIn}
            >
              <label className="text-md" htmlFor="email">
                Email
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-4"
                name="email"
                placeholder="you@example.com"
                required
              />
              <Input></Input>
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
              <button className="bg-green-700 text-white rounded-md px-4 py-2 mb-2">
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
              <button className="bg-green-700 text-white w-full rounded-md px-4 py-2 mb-2">
                Passwort zurücksetzen
              </button>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
}
