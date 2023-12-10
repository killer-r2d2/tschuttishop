import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Section } from "@/app/components/Base/Section";
import { Container } from "@/app/components/Base/Container";
import { redirect } from "next/navigation";

export default function UpdatePassword({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const updatePassword = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.updateUser({ password: password });

    if (error) {
      return redirect("/login?message=Could not update password");
    }

    return redirect("/login?message=Password updated");
  };

  return (
    <Container>
      <Section>
        <h1>Update Password</h1>
        <form action={updatePassword}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
          <button type="submit">Update Password</button>
        </form>
      </Section>
    </Container>
  );
}