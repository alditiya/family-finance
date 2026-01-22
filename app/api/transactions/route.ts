import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/getSession";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
    include: { members: true },
  });

  const now = new Date();
  const locked = await prisma.monthlyLock.findFirst({
    where: {
      householdId: user!.members[0].householdId,
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    },
  });

  if (locked) return new Response("Month locked", { status: 403 });

  await prisma.transaction.create({
    data: {
      type: body.type,
      amount: body.amount,
      category: body.category,
      date: new Date(),
      userId: user!.id,
      householdId: user!.members[0].householdId,
    },
  });

  return Response.json({ ok: true });
}
