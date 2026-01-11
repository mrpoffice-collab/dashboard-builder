"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { Loader2, Plus, Trash2, Upload, Database, FileText } from "lucide-react";

interface DataSource {
  id: string;
  name: string;
  type: string;
  columns: { name: string; type: string }[];
  createdAt: string;
}

export default function DataSourcesPage() {
  const router = useRouter();
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    fetchDataSources();
  }, []);

  const fetchDataSources = async () => {
    try {
      const res = await fetch("/api/data-sources");
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setDataSources(data.dataSources || []);
    } catch (error) {
      console.error("Failed to fetch data sources:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadCSV = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", file.name.replace(".csv", ""));

      const res = await fetch("/api/data-sources", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setDataSources([data.dataSource, ...dataSources]);
        setShowUpload(false);
      }
    } catch (error) {
      console.error("Failed to upload CSV:", error);
    } finally {
      setUploading(false);
    }
  };

  const addDemoData = async (demoType: string) => {
    setUploading(true);
    try {
      const res = await fetch("/api/data-sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "demo", name: demoType }),
      });

      const data = await res.json();
      if (res.ok) {
        setDataSources([data.dataSource, ...dataSources]);
        setShowUpload(false);
      }
    } catch (error) {
      console.error("Failed to add demo data:", error);
    } finally {
      setUploading(false);
    }
  };

  const deleteDataSource = async (id: string) => {
    if (!confirm("Delete this data source?")) return;
    try {
      await fetch(`/api/data-sources/${id}`, { method: "DELETE" });
      setDataSources(dataSources.filter((ds) => ds.id !== id));
    } catch (error) {
      console.error("Failed to delete data source:", error);
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
            <h1 className="text-3xl font-bold text-gray-900">Data Sources</h1>
            <p className="text-gray-600 mt-1">Manage your data connections</p>
          </div>
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            Add Data Source
          </button>
        </div>

        {/* Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg">
              <h2 className="text-lg font-semibold mb-4">Add Data Source</h2>

              {/* CSV Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload a CSV file</p>
                <label className="cursor-pointer">
                  <span className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 inline-block">
                    {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Choose File"}
                  </span>
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadCSV(file);
                    }}
                  />
                </label>
              </div>

              {/* Demo Data Options */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-3">Or add demo data:</p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => addDemoData("sales")}
                    disabled={uploading}
                    className="p-3 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 text-sm"
                  >
                    Sales Data
                  </button>
                  <button
                    onClick={() => addDemoData("marketing")}
                    disabled={uploading}
                    className="p-3 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 text-sm"
                  >
                    Marketing Data
                  </button>
                  <button
                    onClick={() => addDemoData("operations")}
                    disabled={uploading}
                    className="p-3 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 text-sm"
                  >
                    Operations Data
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowUpload(false)}
                className="w-full py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Data Sources List */}
        {dataSources.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Database className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No data sources yet</h2>
            <p className="text-gray-600 mb-6">Upload a CSV file or add demo data to get started</p>
            <button
              onClick={() => setShowUpload(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Add Data Source
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Columns
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Added
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataSources.map((ds) => (
                  <tr key={ds.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {ds.type === "csv" ? (
                          <FileText className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Database className="h-5 w-5 text-indigo-400" />
                        )}
                        <span className="font-medium text-gray-900">{ds.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 uppercase">
                        {ds.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(ds.columns as { name: string }[]).length} columns
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(ds.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => deleteDataSource(ds.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
