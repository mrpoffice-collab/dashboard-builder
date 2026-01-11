"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BarChart3, LogOut, Database, Layout, FileText } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center">
              <BarChart3 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">DashBuilder</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <Layout className="h-4 w-4" />
                Dashboards
              </Link>
              <Link
                href="/data"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <Database className="h-4 w-4" />
                Data Sources
              </Link>
              <Link
                href="/templates"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <FileText className="h-4 w-4" />
                Templates
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
