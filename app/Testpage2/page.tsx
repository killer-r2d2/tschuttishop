// pages/Testpage2.js
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"

export default async function Testpage2() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
   
  // Überprüfen Sie den Anmeldestatus
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    // Benutzer ist nicht angemeldet, leiten Sie ihn zur Anmeldeseite weiter
    redirect("/Login");
  }

  return (
    <div>
      <h1>Test Page 2</h1>
      {user ? (
        <p>Benutzer eingeloggt: {JSON.stringify(user)}</p>
      ) : (
        <p>Kein Benutzer eingeloggt</p>
      )}
    </div>
  );
}
