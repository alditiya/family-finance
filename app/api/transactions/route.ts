import { prisma } from "@/lib/server/prisma";
import { getSession } from "@/lib/getSession";
import { requireHousehold } from "@/lib/server/household";
import { requireSession } from "@/lib/server/requireSession";


export async function POST(req: Request) {
  const session = await requireSession();
  const body = await req.json();
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
    include: { members: true },
  });
  const { householdId, amount, type, date, note } = body;
  
  await requireHousehold(householdId);

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



  const now = new Date();
  const locked = await prisma.monthlyLock.findFirst({
    where: {
      householdId: user!.members[0].householdId,
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    },
  });

  if (locked) return new Response("Month locked", { status: 403 });

  return Response.json({ ok: true });
}
