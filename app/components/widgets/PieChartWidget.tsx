"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface PieChartWidgetProps {
  title: string;
  data: Record<string, unknown>[];
  nameField: string;
  valueField: string;
}

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#84cc16"];

export default function PieChartWidget({ title, data, nameField, valueField }: PieChartWidgetProps) {
  const chartData = data.map((item) => ({
    name: item[nameField] as string,
    value: item[valueField] as number,
  }));

  return (
    <div className="h-full flex flex-col p-4">
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="70%"
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
