"use client";

interface ProgressWidgetProps {
  title: string;
  current: number;
  target: number;
  color?: string;
}

export default function ProgressWidget({ title, current, target, color = "#6366f1" }: ProgressWidgetProps) {
  const percentage = Math.min(Math.round((current / target) * 100), 100);

  return (
    <div className="h-full flex flex-col justify-center p-4">
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      <div className="flex items-center gap-4">
        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%`, backgroundColor: color }}
          />
        </div>
        <span className="text-lg font-semibold text-gray-900">{percentage}%</span>
      </div>
      <p className="text-xs text-gray-400 mt-1">
        {current.toLocaleString()} / {target.toLocaleString()}
      </p>
    </div>
  );
}
