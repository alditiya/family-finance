import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { getDefaultHousehold } from "@/lib/server/getDefaultHousehold";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password,
        );

        if (!isValid) {
          return null;
        }

        return { 
          id: user.id, 
          email: user.email, 
          name: user.name 
        };
      },
    }),
  ],
  callbacks: {
  async redirect({ url, baseUrl }) {
    if (url.startsWith(baseUrl)) return url;
    return baseUrl;
  },

  async signIn({ user }) {
    if (!user.email) return false;
    return true;
  },
},
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
