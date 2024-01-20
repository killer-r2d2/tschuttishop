import { Container } from "@/app/components/Base/Container";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Products } from "@/app/DashboardProduct/products/products";
import { Section } from "@/app/components/Base/Section";

export default async function ProductsPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/Login");
  }

  return (
    <Section>
      <Container>
        <h1 className="text-5xl font-bold mb-5">Aktuelle Produkte</h1>
        <p className="mb-10">
          Verwalten Sie hier Ihre aktuellen Angebote. Sie wollen ein Produkt
          doch nicht mehr verkaufen? Dann können Sie es hier einfach löschen.
        </p>
        <Products userProfileId={user?.id} />
      </Container>
    </Section>
  );
}
