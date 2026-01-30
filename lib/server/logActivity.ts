import { prisma } from "@/lib/server/prisma";
import { ActivityAction } from "@prisma/client";
import { userAgent } from "next/server";

export async function logActivity({
  userId,
  action,
  req,  
}: {
    userId: string;
    action: ActivityAction;
    req?: Request;
}) {
    await prisma.activityLog.create({
        data: {
            userId,
            action,
            ipAdrress: req?.headers.get("x-forwarded-for") ?? undefined,
            userAgent: req?.headers.get("user-agent") ?? undefined,
        },
    });
}