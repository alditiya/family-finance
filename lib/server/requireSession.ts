import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function requireSession() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        throw new Response("Unauthorized", { status: 401 });
    }
    return session;
}