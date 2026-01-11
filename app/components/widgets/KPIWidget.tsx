"use client";

interface KPIWidgetProps {
  title: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  color?: string;
}

export default function KPIWidget({ title, value, prefix = "", suffix = "", color = "#6366f1" }: KPIWidgetProps) {
  const formatValue = (val: number | string) => {
    if (typeof val === "number") {
      if (val >= 1000000) return (val / 1000000).toFixed(1) + "M";
      if (val >= 1000) return (val / 1000).toFixed(1) + "K";
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <div className="h-full flex flex-col justify-center items-center p-4">
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      <p className="text-4xl font-bold" style={{ color }}>
        {prefix}{formatValue(value)}{suffix}
      </p>
    </div>
  );
}
