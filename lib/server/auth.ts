import "server-only";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "./prisma";
import { logActivity } from "@/lib/server/logActivity";
import { ActivityAction } from '@prisma/client';

/**
 * Ambil household aktif milik user yang sedang login
 * Asumsi: 1 user = 1 household
 */


export async function getHouseholdId(userId: string) {
  const membership = await prisma.householdMember.findFirst({
    where: { userId },
    select: { householdId: true },
  });

  if (!membership) {
    throw new Error("User tidak tergabung dalam household mana pun");
  }

  return membership.householdId;
}

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);

        if (!valid) return null;

        return { 
          id: user.id, 
          name: user.name, 
          email: user.email 
        };
      },
    }),
  ],
  
callbacks: {
  async signIn({ user, req }) {
    await logActivity({
      userId: user.id,
      action: ActivityAction.LOGIN,
      req,
    });
    return true;
  },
},
  session: { 
    strategy: "jwt",
    maxAge: 60 * 60 * 4,
    updateAge: 60 * 15, 
   },

   jwt: {
    maxAge: 60 * 60 * 4,
   },

  pages: { 
    signIn: "/login" 
  },
};
