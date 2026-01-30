"use client";

import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

export default function CategoryPie() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/summary/category")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="bg-white rounded p-4 shadow h-64">
      <h2 className="font-semibold text-gray-500 mb-2">Pengeluaran per Kategori</h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
