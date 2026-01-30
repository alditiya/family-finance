"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/ui/Toast"

export default function LoginForm() {
  const router = useRouter();          // ✅ router
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // ✅ error state
  const [toast, setToast ] = useState("");


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
        setToast("Email atau password salah");
        setLoading(false);
        return;
    }

router.push("/dashboard");

  }
  function Header() {
  return (
    <div className="text-center space-y-1">
      <h1 className="text-xl font-semibold text-slate-900">
        Family Finance
      </h1>
      <p className="text-sm text-slate-500">
        Kelola keuangan keluarga dengan rapi
      </p>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}) {
  return (
    <label className="block space-y-1 text-sm">
      <span className="text-slate-600">{label}</span>
      <input
        {...props}
        required
        className="
          w-full rounded-lg border border-slate-300 px-3 py-2
          text-slate-900 placeholder:text-slate-400
          focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent
        "
      />
    </label>
  );
}

  return (
    <div className="w-full max-w-sm rounded-xl bg-white shadow-sm border border-slate-200 p-6 space-y-6">
      <Header />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="nama@email.com"
          autoFocus
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
        />
        {toast && (
            <Toast
                message={toast}
                onClose={() => setToast("")}
            />
        )}
        <button
            type="submit"
            disabled={loading}
            className="
            w-full rounded-lg bg-slate-900 text-white
            py-2.5 text-sm font-medium
          hover:bg-slate-800
            disabled:opacity-60
            disabled:cursor-not-allowed
            transition
            flex items-center justify-center gap-2
        "
        >
            {loading && <Spinner />}
            {loading ? "Memproses" : "Masuk"}
        </button>
      </form>
    </div>
  );
}
