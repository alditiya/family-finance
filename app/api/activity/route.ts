import { prisma } from "@/lib/server/prisma";
import { requireSession } from "@/lib/server/requireSession";

export async function GET() {
  try {
    const session = await requireSession();

    const logs = await prisma.activityLog.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return Response.json(logs);
  } catch (err) {
    if (err instanceof Response) {
      return Response.json(
        { error: "Unauthorized" },
        { status: err.status }
      );
    }

    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
