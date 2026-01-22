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
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/summary/monthly")
      .then((res) => res.json())
      .then((d) =>
        setData(
          d.map((i: any) => ({
            name: i.type,
            total: i._sum.amount,
          })),
        ),
      );
  }, []);

  return (
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
  );
}
