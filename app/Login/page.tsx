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
        "/Login?message=signIn: Die Anmeldung ist fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldeinformationen und versuchen Sie es erneut.",
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
        "/Login?message=signUp: Registrierung fehlgeschlagen. Bitte überprüfen Sie Ihre Informationen und versuchen Sie es erneut.",
      );
    }
    return redirect(
      "/Login?message=signUp: Sie haben eine E-Mail mit dem Bestätigungslink erhalten.",
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
        "/Login?message=resetPassword: Die Anmeldung ist fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldeinformationen und versuchen Sie es erneut.",
      );
    }
    return redirect(
      "/Login?message=resetPassword: Sie haben eine E-Mail erhalten. Benutzen Sie den Link um ein neues Passwort zu setzen",
    );
  };

  return (
    <Section>
      <Container>
        <div className="flex justify-center h-full">
          <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <h1 className="text-4xl font-bold mb-6">Willkommen</h1>
            {searchParams?.message && (
              <p className="bg-slate-200 text-slate-900 p-4 rounded-xl">
                {searchParams.message}
              </p>
            )}
            <form
              className="animate-in flex-1 flex flex-col w-full justify-center mb-8 gap-2 text-foreground border-1 border-slate-400 rounded-xl p-4"
              action={signIn}
            >
              <label className="text-md" htmlFor="email">
                E-Mail
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-4"
                name="email"
                placeholder="you@example.com"
                required
              />
              <label className="text-md" htmlFor="password">
                Passwort
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
              <p className="text-small text-gray-500 mb-4">
                Das Passwort muss mindestens 6 Zeichen lang sein.
              </p>
              <button className="bg-slate-900 text-white rounded-md px-4 py-2 mb-2">
                Sign In
              </button>
              <button
                formAction={signUp}
                className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
              >
                Register
              </button>
            </form>
            <div className="border-1 border-slate-400 rounded-xl p-4">
              <h2 className="text-foreground">Passwort vergessen?</h2>
              <form action={resetPassword} className="mt-4">
                <input
                  className="rounded-md w-full px-4 py-2 bg-inherit border mb-6"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
                <button className="bg-slate-900 text-white w-full rounded-md px-4 py-2 mb-2">
                  Passwort zurücksetzen
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
