"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { lockCurrentMonth } from "./actions";

type Props = {
  householdId: string;
  month: number;
  year: number;
};

export default function LockMonthButton({ householdId, month, year }: Props) {
  const router = useRouter();

  async function handleLock() {
    const ok = confirm(
      "Setelah dikunci, data bulan ini tidak bisa diubah. Lanjutkan?",
    );
    if (!ok) return;

    await lockCurrentMonth(householdId, month, year);
    toast.success("Bulan berhasil dikunci");
    router.refresh();
  }

  return (
    <button
      onClick={handleLock}
      className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:ring text-sm"
    >
      Kunci Bulan Ini
    </button>
  );
}
