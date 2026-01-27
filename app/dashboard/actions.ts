"use server";

import { prisma } from "@/lib/prisma";

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
