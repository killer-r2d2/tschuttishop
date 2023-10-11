"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container } from "@/app/components/Base/Container";

//import type { Database } from '@/lib/database.types'

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient<any>();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Container>
      <div className="flex gap-2">
        <input
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="border-2"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="border-2"
          placeholder="password"
        />
        <button onClick={handleSignUp} className="bg-slate-900 text-slate-100">
          Sign up
        </button>
        <button onClick={handleSignIn} className="bg-slate-900 text-slate-100">
          Sign in
        </button>
        <button onClick={handleSignOut} className="bg-slate-900 text-slate-100">
          Sign out
        </button>
      </div>
    </Container>
  );
}
