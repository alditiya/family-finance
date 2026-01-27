import { prisma } from "@/lib/server/prisma";
import bcrypt from "bcrypt";

export async function GET() {
  const email = "admin@keluarga.local";
  const password = await bcrypt.hash("123456", 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name: "Admin Keluarga",
      email,
      password,
    },
  });

  const household = await prisma.household.create({
    data: {
      name: "Keluarga Utama",
      members: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  return Response.json({
    email,
    password: "123456",
    household: household.name,
  });
}
