"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

const IDLE_TIME = 15 * 60 * 1000; // 15 menit

export function IdleLogout() {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        signOut({ callbackUrl: "/login" });
      }, IDLE_TIME);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      clearTimeout(timer);
    };
  }, []);

  return null;
}
