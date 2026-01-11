"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BarChart3, Plus, Loader2, Share2, ArrowLeft, Trash2, Settings, Save } from "lucide-react";
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
  shareToken: string | null;
  isPublic: boolean;
  widgets: Widget[];
}

const WIDGET_TYPES = [
  { type: "kpi", label: "KPI", icon: "📊" },
  { type: "line", label: "Line Chart", icon: "📈" },
  { type: "bar", label: "Bar Chart", icon: "📊" },
  { type: "pie", label: "Pie Chart", icon: "🥧" },
  { type: "table", label: "Table", icon: "📋" },
  { type: "progress", label: "Progress", icon: "⏳" },
];

export default function DashboardEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);

  useEffect(() => {
    fetchDashboard();
  }, [id]);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`/api/dashboards/${id}`);
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (res.status === 404) {
        router.push("/dashboard");
        return;
      }
      const data = await res.json();
      setDashboard(data.dashboard);
      if (data.dashboard.shareToken) {
        setShareUrl(`${window.location.origin}/share/${data.dashboard.shareToken}`);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const addWidget = async (type: string) => {
    if (!dashboard) return;
    try {
      const res = await fetch(`/api/dashboards/${id}/widgets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Widget`,
          config: { color: "#6366f1" },
          dataConfig: { useDemo: true },
          position: { x: 0, y: dashboard.widgets.length * 4, w: type === "kpi" ? 3 : 6, h: type === "kpi" ? 2 : 4 },
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setDashboard({ ...dashboard, widgets: [...dashboard.widgets, data.widget] });
        setShowAddWidget(false);
      }
    } catch (error) {
      console.error("Failed to add widget:", error);
    }
  };

  const updateWidget = async (widgetId: string, updates: Partial<Widget>) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/widgets/${widgetId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok && dashboard) {
        setDashboard({
          ...dashboard,
          widgets: dashboard.widgets.map((w) =>
            w.id === widgetId ? { ...w, ...updates } : w
          ),
        });
      }
    } catch (error) {
      console.error("Failed to update widget:", error);
    } finally {
      setSaving(false);
      setEditingWidget(null);
    }
  };

  const deleteWidget = async (widgetId: string) => {
    if (!confirm("Delete this widget?")) return;
    try {
      await fetch(`/api/widgets/${widgetId}`, { method: "DELETE" });
      if (dashboard) {
        setDashboard({
          ...dashboard,
          widgets: dashboard.widgets.filter((w) => w.id !== widgetId),
        });
      }
    } catch (error) {
      console.error("Failed to delete widget:", error);
    }
  };

  const toggleShare = async () => {
    if (!dashboard) return;
    try {
      if (dashboard.isPublic) {
        await fetch(`/api/dashboards/${id}/share`, { method: "DELETE" });
        setDashboard({ ...dashboard, isPublic: false, shareToken: null });
        setShareUrl(null);
      } else {
        const res = await fetch(`/api/dashboards/${id}/share`, { method: "POST" });
        const data = await res.json();
        setDashboard({ ...dashboard, isPublic: true, shareToken: data.shareToken });
        setShareUrl(data.shareUrl);
      }
    } catch (error) {
      console.error("Failed to toggle share:", error);
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

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Dashboard not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-indigo-600" />
                <h1 className="text-lg font-semibold text-gray-900">{dashboard.name}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {saving && (
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </span>
              )}
              <button
                onClick={() => setShowAddWidget(true)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm"
              >
                <Plus className="h-4 w-4" />
                Add Widget
              </button>
              <button
                onClick={toggleShare}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border ${
                  dashboard.isPublic
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Share2 className="h-4 w-4" />
                {dashboard.isPublic ? "Shared" : "Share"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Share URL Banner */}
      {shareUrl && (
        <div className="bg-green-50 border-b border-green-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="text-sm text-green-800">
              Dashboard is shared publicly at:
            </span>
            <div className="flex items-center gap-2">
              <code className="bg-white px-3 py-1 rounded text-sm text-green-700">{shareUrl}</code>
              <button
                onClick={() => navigator.clipboard.writeText(shareUrl)}
                className="text-sm text-green-700 hover:text-green-900"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Widget Modal */}
      {showAddWidget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add Widget</h2>
            <div className="grid grid-cols-2 gap-3">
              {WIDGET_TYPES.map((wt) => (
                <button
                  key={wt.type}
                  onClick={() => addWidget(wt.type)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 text-left transition"
                >
                  <span className="text-2xl">{wt.icon}</span>
                  <p className="font-medium mt-2">{wt.label}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAddWidget(false)}
              className="mt-4 w-full py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Widget Edit Modal */}
      {editingWidget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Widget</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editingWidget.title}
                  onChange={(e) => setEditingWidget({ ...editingWidget, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <input
                  type="color"
                  value={(editingWidget.config.color as string) || "#6366f1"}
                  onChange={(e) => setEditingWidget({
                    ...editingWidget,
                    config: { ...editingWidget.config, color: e.target.value }
                  })}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => updateWidget(editingWidget.id, {
                  title: editingWidget.title,
                  config: editingWidget.config
                })}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save
              </button>
              <button
                onClick={() => setEditingWidget(null)}
                className="flex-1 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {dashboard.widgets.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Plus className="h-16 w-16 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No widgets yet</h2>
            <p className="text-gray-600 mb-6">Add widgets to start building your dashboard</p>
            <button
              onClick={() => setShowAddWidget(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Add Widget
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4">
            {dashboard.widgets.map((widget) => (
              <div
                key={widget.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group"
                style={{
                  gridColumn: `span ${widget.position.w}`,
                  minHeight: `${widget.position.h * 60}px`,
                }}
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex gap-1 z-10">
                  <button
                    onClick={() => setEditingWidget(widget)}
                    className="p-1 bg-white rounded shadow hover:bg-gray-50"
                  >
                    <Settings className="h-4 w-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => deleteWidget(widget.id)}
                    className="p-1 bg-white rounded shadow hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
                <div className="h-full relative">{renderWidget(widget)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
