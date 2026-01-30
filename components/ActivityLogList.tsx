"use client";

import { ACTIVITY_LABEL } from "@/lib/activityLabel";
import { ACTIVITY_ICON } from "@/lib/activityIcon";

type Log = {
  id: string;
  action: string;
  createdAt: string;
};

type Props = {
  logs: Log[];
};

export function ActivityLogList({ logs }: Props) {
  if (!logs.length) {
    return (
      <p className="text-sm text-muted">
        Belum ada aktivitas
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {logs.map((log) => (
        <li
          key={log.id}
          className="flex flex-col rounded-lg border p-3"
        >
          <span className="font-medium text-sm">
            {ACTIVITY_ICON[log.action]}
            {ACTIVITY_LABEL[log.action] ?? log.action}
          </span>

          <span className="text-xs text-muted">
            {new Date(log.createdAt).toLocaleString("id-ID")}
          </span>
        </li>
      ))}
    </ul>
  );
}
