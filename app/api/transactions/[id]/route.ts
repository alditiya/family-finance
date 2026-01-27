import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";
import { isMonthLocked } from "@/lib/server/isMonthLocked";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const trx = await prisma.transaction.findUnique({ where: { id } });
  if (!trx) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const locked = await isMonthLocked(
    trx.householdId,
    new Date(trx.date).getMonth() + 1,
    new Date(trx.date).getFullYear(),
  );

  if (locked) {
    return NextResponse.json({ error: "Bulan terkunci" }, { status: 403 });
  }

  try {
    await prisma.transaction.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menghapus transaksi" },
      { status: 500 },
    );
  }
}
