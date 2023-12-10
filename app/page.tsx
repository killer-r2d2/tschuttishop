import AuthButton from "./components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Hero } from "./components/Hero";
import { ProductList } from "./components/ProductsList";

export default async function Index() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div>
      {isSupabaseConnected && <AuthButton />}
      <Hero />
      <ProductList />
    </div>
  );
}
