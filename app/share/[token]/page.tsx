"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { BarChart3, Loader2 } from "lucide-react";
import KPIWidget from "@/app/components/widgets/KPIWidget";
import LineChartWidget from "@/app/components/widgets/LineChartWidget";
import BarChartWidget from "@/app/components/widgets/BarChartWidget";
import PieChartWidget from "@/app/components/widgets/PieChartWidget";
import TableWidget from "@/app/components/widgets/TableWidget";
import ProgressWidget from "@/app/components/widgets/ProgressWidget";
import { demoSalesData } from "@/lib/demo-data";

interface Widget {
  id: string;
  type: string;
  title: string;
  config: Record<string, unknown>;
  dataConfig: Record<string, unknown>;
  position: { x: number; y: number; w: number; h: number };
}

interface Dashboard {
  id: string;
  name: string;
  description: string | null;
  widgets: Widget[];
}

export default function SharedDashboardPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboard();
  }, [token]);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`/api/public/${token}`);
      if (!res.ok) {
        setError("Dashboard not found or no longer shared");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setDashboard(data.dashboard);
    } catch (err) {
      console.error("Failed to fetch dashboard:", err);
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const renderWidget = (widget: Widget) => {
    const data = demoSalesData.data;

    switch (widget.type) {
      case "kpi":
        const kpiValue = data.reduce((sum, row) => sum + (row.revenue || 0), 0);
        return (
          <KPIWidget
            title={widget.title}
            value={kpiValue}
            prefix="$"
            color={widget.config.color as string}
          />
        );
      case "line":
        return (
          <LineChartWidget
            title={widget.title}
            data={data}
            xField="month"
            yField="revenue"
            color={widget.config.color as string}
          />
        );
      case "bar":
        return (
          <BarChartWidget
            title={widget.title}
            data={data}
            xField="month"
            yField="orders"
            color={widget.config.color as string}
          />
        );
      case "pie":
        return (
          <PieChartWidget
            title={widget.title}
            data={data.slice(0, 6)}
            nameField="month"
            valueField="revenue"
          />
        );
      case "table":
        return <TableWidget title={widget.title} data={data} />;
      case "progress":
        return (
          <ProgressWidget
            title={widget.title}
            current={data.reduce((sum, row) => sum + row.revenue, 0)}
            target={1000000}
            color={widget.config.color as string}
          />
        );
      default:
        return <div className="p-4 text-gray-500">Unknown widget type</div>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">{error || "Dashboard not found"}</p>
        <Link href="/" className="text-indigo-600 hover:text-indigo-700">
          Go to homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-indigo-600" />
              <h1 className="text-lg font-semibold text-gray-900">{dashboard.name}</h1>
            </div>
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2"
            >
              Powered by DashBuilder
            </Link>
          </div>
        </div>
      </header>

      {/* Dashboard Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {dashboard.widgets.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500">This dashboard has no widgets</p>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4">
            {dashboard.widgets.map((widget) => (
              <div
                key={widget.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                style={{
                  gridColumn: `span ${widget.position.w}`,
                  minHeight: `${widget.position.h * 60}px`,
                }}
              >
                {renderWidget(widget)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
