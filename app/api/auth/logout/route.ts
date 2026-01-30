import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/auth";
import { logActivity } from "@/lib/server/logActivity";
import { ActivityAction } from "@prisma/client";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return Response.json({ ok: true });

  await logActivity({
    userId: session.user.id,
    action: ActivityAction.LOGOUT,
    req,
  });

  return Response.json({ ok: true });
}
