import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/getSession";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { email } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
    include: { members: true },
  });

  await prisma.invite.create({
    data: {
      email,
      householdId: user!.members[0].householdId,
    },
  });

  return Response.json({ ok: true });
}
