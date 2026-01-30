"use client";
import { addTransaction } from "../../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

type Props = {
  locked: boolean;
};
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

export default function AddTransactionForm({ locked }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("EXPENSE");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const now = new Date();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </div>
  );
}
