import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/getSession";
import * as XLSX from "xlsx";

export async function GET() {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
    include: { members: true },
  });

  const householdId = user!.members[0].householdId;

  const tx = await prisma.transaction.findMany({
    where: { householdId },
  });

  const worksheet = XLSX.utils.json_to_sheet(tx);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Transaksi");

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  return new Response(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=laporan.xlsx",
    },
  });
}
