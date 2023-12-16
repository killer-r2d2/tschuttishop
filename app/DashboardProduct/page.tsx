import { Form } from "../components/Form";
import { Products } from "../components/Product";
import { Section } from "../components/Base/Section";
import { Container } from "../components/Base/Container";
import { createClient } from '@/utils/supabase/server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/Login");
  }
  return (
    <Section>
      <Container>
        <Form userProfileId={user.id} />
        <Products />
      </Container>
    </Section>
  );
}