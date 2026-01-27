import "server-only";
import { prisma } from "./prisma";

export async function createTransaction(data: {
  householdId: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  note?: string;
  date: Date;
}) {
  return prisma.transaction.create({ data });
}

export async function deleteTransaction(id: string) {
  return prisma.transaction.delete({ where: { id } });
}
