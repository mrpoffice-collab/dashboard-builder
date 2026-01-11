"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { Plus, Loader2, MoreVertical, Trash2, ExternalLink } from "lucide-react";

interface Dashboard {
  id: string;
  name: string;
  description: string | null;
  isPublic: boolean;
  shareToken: string | null;
  updatedAt: string;
  _count: { widgets: number };
}

export default function DashboardListPage() {
  const router = useRouter();
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    fetchDashboards();
  }, []);

  const fetchDashboards = async () => {
    try {
      const res = await fetch("/api/dashboards");
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setDashboards(data.dashboards || []);
    } catch (error) {
      console.error("Failed to fetch dashboards:", error);
    } finally {
      setLoading(false);
    }
  };

  const createDashboard = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("/api/dashboards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push(`/dashboard/${data.dashboard.id}`);
      }
    } catch (error) {
      console.error("Failed to create dashboard:", error);
    } finally {
      setCreating(false);
    }
  };

  const deleteDashboard = async (id: string) => {
    if (!confirm("Are you sure you want to delete this dashboard?")) return;
    try {
      await fetch(`/api/dashboards/${id}`, { method: "DELETE" });
      setDashboards(dashboards.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Failed to delete dashboard:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Dashboards</h1>
            <p className="text-gray-600 mt-1">Create and manage your data dashboards</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <Plus className="h-5 w-5" />
            New Dashboard
          </button>
        </div>

        {showCreate && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
            <h2 className="text-lg font-semibold mb-4">Create New Dashboard</h2>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Dashboard name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onKeyDown={(e) => e.key === "Enter" && createDashboard()}
              />
              <button
                onClick={createDashboard}
                disabled={creating || !newName.trim()}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {creating ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create"}
              </button>
              <button
                onClick={() => setShowCreate(false)}
                className="text-gray-600 px-4 py-2 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {dashboards.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Plus className="h-16 w-16 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No dashboards yet</h2>
            <p className="text-gray-600 mb-6">Create your first dashboard or start from a template</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowCreate(true)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              >
                Create Dashboard
              </button>
              <Link
                href="/templates"
                className="bg-white text-gray-700 px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                Browse Templates
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboards.map((dashboard) => (
              <div
                key={dashboard.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition group"
              >
                <div className="flex justify-between items-start mb-4">
                  <Link href={`/dashboard/${dashboard.id}`} className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                      {dashboard.name}
                    </h3>
                    {dashboard.description && (
                      <p className="text-sm text-gray-500 mt-1">{dashboard.description}</p>
                    )}
                  </Link>
                  <div className="relative">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{dashboard._count.widgets} widgets</span>
                  <span>Updated {new Date(dashboard.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href={`/dashboard/${dashboard.id}`}
                    className="flex-1 text-center py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg"
                  >
                    Edit
                  </Link>
                  {dashboard.isPublic && dashboard.shareToken && (
                    <a
                      href={`/share/${dashboard.shareToken}`}
                      target="_blank"
                      className="flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  <button
                    onClick={() => deleteDashboard(dashboard.id)}
                    className="flex items-center justify-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
