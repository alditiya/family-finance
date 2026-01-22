import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/getSession";
import Link from "next/link";
import MonthlyChart from "@/components/MonthlyChart";

export default async function Dashboard() {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
    include: {
      members: { include: { household: true } },
    },
  });

  const householdId = user!.members[0].householdId;

  const transactions = await prisma.transaction.findMany({
    where: { householdId },
    orderBy: { date: "desc" },
  });

  const income = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded">
          <p>Pemasukan</p>
          <p className="text-xl font-bold">Rp {income}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <p>Total Pengeluaran</p>
          <p className="text-xl font-bold">Rp {expense}</p>
        </div>
      </div>

      {/* CHART */}
      <MonthlyChart />

      {/* ACTIONS */}
      <Link
        href="/dashboard/add"
        className="inline-block bg-black text-white px-4 py-2 rounded"
      >
        + Tambah Transaksi
      </Link>

      <ul className="space-y-2">
        {transactions.map((t) => (
          <li key={t.id} className="border p-2 rounded">
            {t.type} - Rp {t.amount} ({t.category})
          </li>
        ))}
      </ul>
    </div>
  );
}
