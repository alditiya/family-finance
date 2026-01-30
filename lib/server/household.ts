import "server-only";
import { prisma } from "./prisma";
import { getSession } from "@/lib/getSession";


export async function requireHousehold(householdId: string) {
  const session = await getSession();
  if (!session?.user?.email) throw new Error("UNAUTHORIZED");

  const member = await prisma.householdMember.findFirst({
    where: {
      householdId,
      user: { email: session.user.email },
    },
    include: { household: true },
  });
  if (!member) throw new Error("FORBIDDEN");

  return member.household;
}