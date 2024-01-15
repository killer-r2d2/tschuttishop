import { Container } from "@/app/components/Base/Container";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { DashboardProductForm } from "@/app/DashboardProduct/New/DashboardProductForm";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Section } from "@/app/components/Base/Section";

export default async function Page() {
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
        <h1 className="text-5xl font-bold mb-5">Neues Produkt erfassen</h1>
        <div className="grid grid-cols-12 gap-y-10">
          <div className="col-span-full lg:col-span-6">
            <DashboardProductForm profileId={user.id} />
          </div>
          <div className="col-span-full lg:col-span-3 lg:col-start-10">
            <hr className="d-block lg:hidden mb-10" />
            <div className="bg-slate-200 p-5 rounded-xl">
              <p className="font-bold">
                Erfasse hier dein neues Produkt und verkaufe es im Tschuttishop.
              </p>
              <p>
                Hat es spezielle Mekmale? Vielleicht eine Unterschirft eines
                Spielers? Dann schreibe es in die Beschreibung. Viel Erfolg!
              </p>
              <p className="mt-8">
                <Link href="/agb" className="font-bold">
                  AGB
                </Link>
              </p>
            </div>
            <div className="mt-10">
              <p className="text-xl mb-3">
                Suchen Sie ihre aktuellen Produkte?
              </p>
              <Button
                href="/DashboardProduct/products"
                as={Link}
                color="primary"
                className="w-full"
              >
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
