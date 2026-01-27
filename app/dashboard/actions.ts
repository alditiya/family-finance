"use server";
import { prisma } from "@/lib/server/prisma";
import { createTransaction } from "@/lib/server/transaction.service";

export async function addTransaction(data: {
  householdId: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  note?: string;
  date: Date;
}) {
  await prisma.transaction.create({
    data,
  });
}

export async function addTransactionAction(
  payload: Parameters<typeof createTransaction>[0],
) {
  await createTransaction(payload);
}

export async function lockCurrentMonth(
  householdId: string,
  month: number,
  year: number,
) {
  await prisma.monthLock.upsert({
    where: {
      householdId_month_year: {
        householdId,
        month,
        year,
      },
    },
    create: {
      householdId,
      month,
      year,
      locked: true,
    },
    update: {
      locked: true,
    },
  });
}
