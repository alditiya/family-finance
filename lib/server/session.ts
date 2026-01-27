import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/auth";

export async function getCurrentUserId() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("User belum login");
  }

  return session.user.id;
}
