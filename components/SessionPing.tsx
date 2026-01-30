"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function SessionPing() {
    const {data} = useSession();

    useEffect(() => {
        const interval = setInterval(() => {
            if (data) console.log("session alive");
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [data]);

    return null;
}