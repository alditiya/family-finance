"use client";

import { useEffect, useState } from "react";
import { ACTIVITY_ICON } from "@/lib/activityIcon";
import { ACTIVITY_LABEL } from "@/lib/activityLabel";

type ActivityLog = {
  id: string;
  action: string;
  createdAt: string;
};

export default function ActivityPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch("/api/activity")
    .then(async (res) => {
      if (!res.ok) {
        setLogs([]);
        return;
      }
      const text = await res.text();
      if (!text) {
        setLogs([]);
        return;
      }
      setLogs(JSON.parse(text));
    })
    .finally(() => setLoading(false));
}, []);

  if (loading) {
    return <p className="text-sm text-slate-400">Loading activity…</p>;
  }

  if (logs.length === 0) {
    return (
      <p className="text-sm text-slate-400">
        Belum ada aktivitas.
      </p>
    );
  }

  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">
        Activity Log
      </h2>

      {/* ⬇️ POTONGAN KODE ANDA MASUK DI SINI */}
      <ul className="space-y-2 text-sm">
        {logs.map((log) => (
          <li
            key={log.id}
            className="flex justify-between text-slate-600"
          >
            <span>
            {ACTIVITY_ICON[log.action]}
            {ACTIVITY_LABEL[log.action] ?? log.action}
            </span>

            <span className="text-xs">
              {new Date(log.createdAt).toLocaleString("id-ID")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
