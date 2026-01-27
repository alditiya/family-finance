import { prisma } from "@/lib/server/prisma";
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
    by: ["category"],
    where: { householdId, type: "EXPENSE" },
    _sum: { amount: true },
  });

  return Response.json(
    data.map((d) => ({
      name: d.category,
      value: d._sum.amount,
    })),
  );
}
