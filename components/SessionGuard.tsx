"use client"

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export function SessionGuard({ children }: { children: React.ReactNode }) {
    const { data, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            fetch("/api/auth/expired", { methode: "POST" });
            signOut({ callbackUrl: "/login"});
        }
    }, [status]);

    return <>{children}</>;
}