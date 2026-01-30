"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

export default function MonthlyChart() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/summary/monthly?month=${month}&year=${year}`)
      .then((res) => res.json())
      .then((result) => {
        setData(
          result.map((item: any) => ({
            name: item.type === "INCOME" ? "Pemasukan" : "Pengeluaran",
            total: item._sum.amount || 0,
          })),
        );
      });
  }, [month, year]);

  return (
    <div className="bg-gray-200 rounded p-4 shadow space-y-4">
      <div className="flex gap-2">
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="border p-2 rounded text-gray-500"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i + 1}>
              Bulan {i + 1}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border p-2 rounded text-gray-500"
        >
          {[2024, 2025, 2026].map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </div>

      <div className="h-64">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
