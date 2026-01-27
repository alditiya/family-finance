"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { isMonthLocked } from "@/lib/isMonthLocked";
import AddTransactionForm from "./AddTransactionForm";
async function handleSubmit() {
  try {
    await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(data),
    });
    toast.success("Transaksi berhasil disimpan");
  } catch {
    toast.error("Gagal menyimpan transaksi");
  }
}

export default function AddTransaction() {
  const router = useRouter();
  const [type, setType] = useState("EXPENSE");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const householdId = getHouseholdId();
  const now = new Date();
  const monthLocked = isMonthLocked(
    householdId,
    now.getFullYear(),
    now.getMonth() + 1,
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="max-w-md mx-auto p-4">
        {locked && (
          <div className="mb-4 bg-gray-100 border border-gray-300 rounded-lg p-3 text-sm text-gray-600">
            Bulan ini sudah dikunci. Anda tidak dapat menambah transaksi.
          </div>
        )}

        <AddTransactionForm locked={locked} />
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await fetch("/api/transactions", {
            method: "POST",
            body: JSON.stringify({ type, amount, category }),
          });
          router.push("/dashboard");
        }}
        className="p-6 space-y-4"
      >
        <h1 className="text-xl font-bold">Tambah Transaksi</h1>

        <label className="block text-sm text-white-600 mb-1">
          Jenis Transaksi
        </label>

        <select
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="EXPENSE">Pengeluaran</option>
          <option value="INCOME">Pemasukan</option>
        </select>

        <label className="block text-sm text-white-600 mb-1">Jumlah</label>

        <input
          className="w-full 
          border border-gray-300 
          rounded-lg 
          px-3 py-2 
          text-sm
          focus:outline-none 
          focus:ring-2 
          focus:ring-gray-800"
          type="number"
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <label className="block text-sm text-white-600 mb-1">Kategori</label>

        <input
          className="w-full 
          border border-gray-300 
          rounded-lg 
          px-3 py-2 
          text-sm
          focus:outline-none 
          focus:ring-2 
          focus:ring-gray-800"
          type="text"
          onChange={(e) => setCategory(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
           border border-gray-300
         text-gray-700
           px-4 py-2
           rounded-lg
           text-sm
         hover:bg-gray-100"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
      <button
        disabled={loading}
        className="border border-white-300 text-gray-500 px-4 py-2 rounded-lg text-sm hover:bg-gray-100"
      >
        {loading ? "Menyimpan..." : ""}
        <a href="/api/export/excel" className="underline">
          Export Excel
        </a>{" "}
      </button>
    </div>
  );
}
