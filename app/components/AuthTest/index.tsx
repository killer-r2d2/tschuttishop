import { createClient } from "@/utils/supabase/client";

export async function getServerSideProps(context: any) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(await supabase.auth.getUser());

  if (!user) {
    return {
      redirect: {
        destination: "/Login",
        permanent: false,
      },
    };
  }

  return <p>Hey, {user.email}!</p>;
}
