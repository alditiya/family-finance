export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-card shadow-sm border border-slate-100 p-5">
      {children}
    </div>
  );
}
