import { prisma } from "@/lib/server/prisma";

export async function createActivityLog(
  userId: string,
  action: string
) {
  return prisma.activityLog.create({
    data: {
      userId,
      action,
    },
  });
}
