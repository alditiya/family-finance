import { prisma } from "@/lib/server/prisma";

export async function getDefaultHousehold(email: string) {
  const member = await prisma.householdMember.findFirst({
    where: {
      user: { email },
    },
    
    select: { householdId: true },
  });

  return member?.householdId ?? null;
}
