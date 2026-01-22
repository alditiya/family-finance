"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddTransaction() {
  const router = useRouter();
  const [type, setType] = useState("EXPENSE");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

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

        <select onChange={(e) => setType(e.target.value)}>
          <option value="EXPENSE">Pengeluaran</option>
          <option value="INCOME">Pemasukan</option>
        </select>

        <input
          className="p-3 text-base"
          type="number"
          placeholder="Jumlah"
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <input
          className="p-3 text-base"
          type="text"
          placeholder="Kategori"
          onChange={(e) => setCategory(e.target.value)}
        />

        <button className="bg-black text-white px-4 py-3 w-full md:w-auto rounded">
          Simpan
        </button>
      </form>
      <a href="/api/export/excel" className="underline">
        Export Excel
      </a>
    </div>
  );
}
