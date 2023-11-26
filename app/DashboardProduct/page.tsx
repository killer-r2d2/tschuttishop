"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/supabase/client";
import { Form } from "../components/Form";
import { Products } from "../components/Product";
import { Section } from "../components/Base/Section";
import { Container } from "../components/Base/Container";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // Benutzer ist nicht eingeloggt, Umleitung zur Login-Seite
        router.push("/Login");
      }
    };

    checkUser();
  }, [router]);

  return (
    <Section>
      <Container>
        <Form />
        <Products />
      </Container>
    </Section>
  );
}
