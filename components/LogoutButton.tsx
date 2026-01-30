"use client"
import { signOut } from "next-auth/react";

const logout = async () => {
  await fetch("/api/auth/logout", { method: "POST" });
  await signOut({ callbackUrl: "/login" });
};

export function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/login",
        })
      }
      className="
        text-sm text-slate-600
        hover:text-slate-900
        transition
      "
    >
      Logout
    </button>
  );
}