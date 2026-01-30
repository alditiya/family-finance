"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

export default function TrendChart() {
  const year = new Date().getFullYear();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/summary/trend?year=${year}`)
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="bg-white rounded p-4 shadow h-64">
      <h2 className="font-semibold text-gray-500 mb-2">Tren Tahunan</h2>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line dataKey="income" />
          <Line dataKey="expense" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
