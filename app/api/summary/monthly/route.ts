import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/getSession";

export async function GET() {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
    include: { members: true },
  });

  const householdId = user!.members[0].householdId;

  const data = await prisma.transaction.groupBy({
    by: ["type"],
    where: { householdId },
    _sum: { amount: true },
  });

  return Response.json(data);
}
