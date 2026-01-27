import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/getSession";
import { React } from "react";
import Link from "next/link";
import MonthlyChart from "@/components/MonthlyChart";
import TrendChart from "@/components/TrendChart";
import CategoryPie from "@/components/CategoryPie";
import { toast } from "sonner";
import TransactionItem from "./TransactionItem";
import { isMonthLocked } from "@/lib/isMonthLocked";
import LockMonthButton from "./LockMonthButton";

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
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const locked = await isMonthLocked(householdId, month, year);
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
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="text-sm text-white-500">Ringkasan keuangan keluarga</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">Total Pemasukan</p>
          <p className="text-2xl font-semibold text-gray-900">Rp {income}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">Total Pengeluaran</p>
          <p className="text-2xl font-semibold text-gray-900">Rp {expense}</p>
        </div>
      </div>
      {/* CHART */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-sm font-medium text-gray-700 mb-4">
          Ringkasan Bulanan
        </h2>
        <MonthlyChart />
        <TrendChart />
        <CategoryPie />
      </div>
      {/* ACTIONS */}
      <button className="w-full md:w-auto">
        <Link
          href="/dashboard/add"
          className="
           bg-gray-900 text-white
             px-4 py-2
             rounded-lg
             text-sm
           hover:bg-gray-800
             hover:ring
             transition"
        >
          + Tambah Transaksi
        </Link>
      </button>
      {/* RECENT TRANSACTIONS */}
      <h2 className="px-2 py-2 text-lg font-semibold text-white-900">
        Transaksi Terbaru
      </h2>
      {locked && (
        <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-lg p-3 text-sm text-gray-700">
          <span>🔒</span>
          <span>
            Bulan ini telah dikunci. Data bersifat final dan tidak dapat diubah.
          </span>
        </div>
      )}

      {!locked && (
        <LockMonthButton householdId={householdId} month={month} year={year} />
      )}
      <div className="space-y-2">
        {transactions.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg py-12 text-center">
            <p className="text-sm text-gray-500">
              Belum ada transaksi bulan ini
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Tambahkan pemasukan atau pengeluaran pertama Anda
            </p>
          </div>
        ) : (
          <ul className=" space-x-2 space-y-2">
            {transactions.map((t) => (
              <li
                key={t.id}
                transactions={t}
                className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-4"
              >
                <div>
                  <p className="font-medium text-gray-800">{t.category}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(t.date).toLocaleDateString()}
                  </p>
                </div>

                {/* ⬇️ DELETE BUTTON DI SINI */}
                <TransactionItem key={t.id} transaction={t} />

                <p
                  className={`font-semibold ${
                    t.type === "INCOME" ? "text-green-700" : "text-red-700"
                  }`}
                >
                  Rp {t.amount}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
