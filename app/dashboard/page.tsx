import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";
import { getDefaultHousehold } from "@/lib/server/getDefaultHousehold";

export default async function Page() {
  const session = await getSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const householdId = await getDefaultHousehold(session.user.email);

  if (!householdId) {
    redirect("/onboarding"); // atau create household
  }

  redirect(`/dashboard/${householdId}`);
}
