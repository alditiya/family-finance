"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ChartSkeleton } from "@/components/ChartSkeleton";
import { EmptyChart } from "@/components/EmptyChart";

export default function YearlyChart({
  householdId,
}: {
  householdId: string;
}) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/report/yearly?year=2025&householdId=${householdId}`)
      .then(async (res) => {
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }
      return res.json();
    })
    .then(setData)
    .catch((err) => {
      console.error(err);
      setData([]);
    })
    .finally(() => setLoading(false));
}, [householdId]);

  if (loading) return <ChartSkeleton />;
  if (!data.length) return <EmptyChart />;

  return (
    <div className="h-70">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#16a34a"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#dc2626"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
