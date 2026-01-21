"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await signIn("credentials", {
            email,
            password,
            callbackUrl: "/dashboard",
          });
        }}
        className="bg-white p-6 rounded w-80 space-y-4"
      >
        <h1 className="text-xl font-bold text-center">
          Keuangan Keluarga
        </h1>

        <input
          placeholder="Email"
          className="border w-full p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
