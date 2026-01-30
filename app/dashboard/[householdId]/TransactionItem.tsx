"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  transaction: Transaction;
  locked: boolean;
};

export default function TransactionItem({ transaction, locked }: Props) {
  const router = useRouter();

  async function handleDelete() {
    if (locked) return;

    const ok = confirm("Yakin ingin menghapus transaksi ini?");
    if (!ok) return;

    const res = await fetch(`/api/transactions/${transaction.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Transaksi dihapus");
      router.refresh();
    } else {
      toast.error("Gagal menghapus transaksi");
    }
  }

  return (
    //<div className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between">
    <button
      onClick={handleDelete}
      disabled={locked}
      className={`bg-white border border-gray-200 rounded-lg p-4 flex justify-between text-xs text-red-600 hover:ring mt-1 ${locked ? "text-gray-400 hover:ring-0 cursor-not-allowed" : "hover:ring-red-300 cursor-pointer"}`}
    >
      Hapus
    </button>
    //</div>
  );
}
