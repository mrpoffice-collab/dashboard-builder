"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { Loader2, BarChart3, TrendingUp, Users } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
}

export default function TemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState<string | null>(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch("/api/templates");
      const data = await res.json();
      setTemplates(data.templates || []);
    } catch (error) {
      console.error("Failed to fetch templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const useTemplate = async (templateId: string) => {
    setCreating(templateId);
    try {
      const res = await fetch(`/api/templates/${templateId}/use`, {
        method: "POST",
      });

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      const data = await res.json();
      if (res.ok) {
        router.push(`/dashboard/${data.dashboard.id}`);
      }
    } catch (error) {
      console.error("Failed to use template:", error);
    } finally {
      setCreating(null);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "sales":
        return <TrendingUp className="h-8 w-8 text-green-500" />;
      case "marketing":
        return <BarChart3 className="h-8 w-8 text-blue-500" />;
      case "operations":
        return <Users className="h-8 w-8 text-purple-500" />;
      default:
        return <BarChart3 className="h-8 w-8 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "sales":
        return "bg-green-50 border-green-200";
      case "marketing":
        return "bg-blue-50 border-blue-200";
      case "operations":
        return "bg-purple-50 border-purple-200";
      default:
        return "bg-gray-50 border-gray-200";
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Templates</h1>
          <p className="text-gray-600 mt-1">
            Start with a pre-built template and customize it to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`rounded-xl border-2 p-6 transition hover:shadow-lg ${getCategoryColor(template.category)}`}
            >
              <div className="mb-4">{getCategoryIcon(template.category)}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 capitalize">{template.category}</span>
                <button
                  onClick={() => useTemplate(template.id)}
                  disabled={creating === template.id}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 text-sm"
                >
                  {creating === template.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Use Template"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
