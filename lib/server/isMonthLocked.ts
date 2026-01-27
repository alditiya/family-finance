import "server-only";
import { prisma } from "./prisma";

export async function isMonthLocked(
  householdId: string,
  month: number,
  year: number,
): promise<boolean> {
  const lock = await prisma.monthLock.findUnique({
    where: {
      householdId_month_year: {
        householdId,
        month,
        year,
      },
    },
  });

  return Boolean(lock?.locked);
}
