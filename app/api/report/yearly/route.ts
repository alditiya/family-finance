import { prisma } from "@/lib/server/prisma";
import { requireHousehold } from "@/lib/server/household";

export async function GET(req: Request) {

try {
    const { searchParams } = new URL(req.url);
    const year = Number(searchParams.get("year"));
    const householdId = searchParams.get("householdId");

  if (!year || !householdId)
    return Response.json(
  { error: "Unauthorized" },
  { status: 401 }
);

  await requireHousehold(householdId);

  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);

  const tx = await prisma.transaction.findMany({
    where: { householdId, date: { gte: start, lt: end } },
    select: { date: true, type: true, amount: true },
  });

  const result = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    income: 0,
    expense: 0,
  }));

  for (const t of tx) {
    const m = t.date.getMonth();
    t.type === "INCOME"
      ? (result[m].income += t.amount)
      : (result[m].expense += t.amount);
  }

  return Response.json(result);
   } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}