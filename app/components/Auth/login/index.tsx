"use client";
import { useState } from "react";
import supabase from "@/supabase/client";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import { Section } from "@/app/components/Base/Section";
import { Container } from "@/app/components/Base/Container";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      router.push("/DashboardProduct");
    }
  };
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/PasswordUpdate",
    });
    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for the password reset link");
    }
  };

  return (
    <div>
      <Section>
        <Container>
          <form onSubmit={handleLogin}>
            <Input
              type="email"
              variant="bordered"
              label="E-Mail"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              variant="bordered"
              label="Passwort"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Login
            </button>
          </form>
          <form onSubmit={handlePasswordReset}>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Passwort zurücksetzen
            </button>
          </form>
        </Container>
      </Section>
    </div>
  );
}
