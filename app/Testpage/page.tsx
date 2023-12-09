// create test page with h1 tag
import { createClient } from '@/utils/supabase/server'
// import { createClient } from "@/utils/supabase/client";
import { cookies } from "next/headers";


export default async function Testpage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div>
      <h1>Test Page</h1>
      {/* show data from supabase */}
      {/* <p>{JSON.stringify(supabase)}</p> */}
      {/* show data from cookieStore */}
      {/* <p>{JSON.stringify(cookieStore)}</p> */}
      {/* show data from user */}
      <p>{JSON.stringify(user)}</p>
     
    </div>
  );
}