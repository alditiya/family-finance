import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "../../../../generated/prisma-client/";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials!.email },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isValid) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
