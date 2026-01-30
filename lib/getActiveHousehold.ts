import { prisma } from "@/lib/server/prisma"
import { getSession } from "@/lib/getSession"

export async function getActiveHousehold(householdId: string) {
    const session = await getSession();
    if (!session?.user?.email) return null;

    const member = await prisma.householdMember.findFirst({
        where: {
            householdId,
            user: { email: session.user.email },
        },
        include: {
            household: true,
        },
    });

    return member?.household ?? null;
}