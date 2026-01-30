import { getHouseholdId } from "@/lib/server/auth";
import { isMonthLocked } from "@/lib/server/isMonthLocked";
import AddTransactionForm from "./AddTransactionForm";
import { requireHousehold } from "@/lib/server/household";


export default async function Page({  
  params,
}: {
  params: Promise<{ householdId: string }>;
}) {
  const { householdId } = await params;
  const now = new Date();

  const locked = await isMonthLocked(
    householdId,
    now.getMonth() + 1,
    now.getFullYear(),
  );

  //await requireHousehold(params.householdId);
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
