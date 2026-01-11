"use client";

interface TableWidgetProps {
  title: string;
  data: Record<string, unknown>[];
  columns?: string[];
}

export default function TableWidget({ title, data, columns }: TableWidgetProps) {
  const displayColumns = columns || (data.length > 0 ? Object.keys(data[0]) : []);

  return (
    <div className="h-full flex flex-col p-4 overflow-hidden">
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      <div className="flex-1 overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              {displayColumns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {displayColumns.map((col) => (
                  <td key={col} className="px-4 py-2 text-sm text-gray-900 whitespace-nowrap">
                    {String(row[col] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
