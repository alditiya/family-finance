import { LogoutButton } from "@/components/LogoutButton"
import { SessionGuard } from "@/components/SessionGuard";
import { IdleLogout } from "@/components/IdleLogout";
import { SessionPing } from "@/components/SessionPing";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-muted">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="font-semibold">Dashboard</h1>
        <LogoutButton />
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        <SessionPing />
        <SessionGuard>
        <IdleLogout />
        {children}
        </SessionGuard>
      </main>
    </div>
  );
}
