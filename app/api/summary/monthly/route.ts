import { prisma } from "@/lib/server/prisma";
import { getSession } from "@/lib/getSession";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
    include: { members: true },
  });

  const householdId = user!.members[0].householdId;

  const data = await prisma.transaction.groupBy({
    by: ["type"],
    where: { householdId, date: { gte: start, lt: end } },
    _sum: { amount: true },
  });

  return Response.json(data);
}
