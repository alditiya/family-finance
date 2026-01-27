import "server-only";
import { prisma } from "./prisma";

export async function getHouseholdId() {
  const household = await prisma.household.findFirst();

  if (!household) {
    throw new Error("Household belum ada. Jalankan seed.");
  }

  return household.id;
}
