"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface LineChartWidgetProps {
  title: string;
  data: Record<string, unknown>[];
  xField: string;
  yField: string;
  color?: string;
}

export default function LineChartWidget({ title, data, xField, yField, color = "#6366f1" }: LineChartWidgetProps) {
  return (
    <div className="h-full flex flex-col p-4">
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={xField} tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip />
            <Line type="monotone" dataKey={yField} stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
