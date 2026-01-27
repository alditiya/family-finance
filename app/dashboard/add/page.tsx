import { getHouseholdId } from "@/lib/server/auth";
import { isMonthLocked } from "@/lib/server/isMonthLocked";
import AddTransactionForm from "./AddTransactionForm";

export default async function Page() {
  const householdId = await getHouseholdId();
  const now = new Date();

  const locked = await isMonthLocked(
    householdId,
    now.getMonth() + 1,
    now.getFullYear(),
  );

  return (
    <div className="max-w-md mx-auto p-4">
      {locked && (
        <div className="mb-4 text-sm text-gray-600 bg-gray-100 p-3 rounded-lg">
          🔒 Bulan ini sudah dikunci
        </div>
      )}

      <AddTransactionForm locked={locked} householdId={householdId} />
    </div>
  );
}
