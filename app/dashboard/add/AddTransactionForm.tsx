"use client";
import { addTransaction } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  locked: boolean;
};

export default function AddTransactionForm({ locked }: Props) {
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (locked) return;
    await addTransaction({
      householdId,
      amount: Number(amount),
      type,
      date: new Date(),
    });

    toast.success("Transaksi berhasil ditambahkan");
    router.refresh();
  }

  return (
    <form className="space-y-4">
      <select disabled={locked} className="w-full border rounded-lg px-3 py-2">
        <option>Pengeluaran</option>
        <option>Pemasukan</option>
      </select>

      <input
        type="number"
        disabled={locked}
        className="w-full border rounded-lg px-3 py-2"
        placeholder="Jumlah"
      />

      <button
        type="submit"
        disabled={locked}
        className={`w-full rounded-lg py-2 text-sm
          ${
            locked
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
      >
        Simpan
      </button>
    </form>
  );
}
