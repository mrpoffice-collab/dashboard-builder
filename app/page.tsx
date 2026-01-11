import Link from "next/link";
import { BarChart3, LineChart, PieChart, Share2, FileDown, Zap, Database, Layout } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">DashBuilder</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Log in
              </Link>
              <Link
                href="/signup"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Build Dashboards in Minutes,
            <span className="text-indigo-600"> Not Hours</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create beautiful, professional dashboards without writing code.
            Upload your data, drag and drop widgets, and share insights instantly.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
            >
              Start Building Free
            </Link>
            <Link
              href="/templates"
              className="bg-white text-gray-700 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition border border-gray-300"
            >
              View Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Visualize Your Data
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Layout className="h-8 w-8 text-indigo-600" />}
              title="Drag & Drop Builder"
              description="Intuitive interface to create dashboards. No code required - just drag widgets and arrange them how you like."
            />
            <FeatureCard
              icon={<Database className="h-8 w-8 text-indigo-600" />}
              title="CSV Data Import"
              description="Upload your CSV files and instantly visualize your data. More integrations coming soon."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-indigo-600" />}
              title="Pre-Built Templates"
              description="Start with industry-specific templates for sales, marketing, and operations. Customize to fit your needs."
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-indigo-600" />}
              title="6 Widget Types"
              description="KPIs, line charts, bar charts, pie charts, tables, and progress bars. Everything you need to tell your data story."
            />
            <FeatureCard
              icon={<Share2 className="h-8 w-8 text-indigo-600" />}
              title="Share Instantly"
              description="Generate public links to share dashboards with clients or stakeholders. No login required for viewers."
            />
            <FeatureCard
              icon={<FileDown className="h-8 w-8 text-indigo-600" />}
              title="PDF Export"
              description="Download your dashboards as professional PDFs for presentations, reports, or offline viewing."
            />
          </div>
        </div>
      </section>

      {/* Widget Types Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Powerful Visualizations
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Choose from 6 widget types to display your data exactly how you want it.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <WidgetPreview icon={<span className="text-3xl font-bold text-indigo-600">42K</span>} label="KPI" />
            <WidgetPreview icon={<LineChart className="h-10 w-10 text-indigo-600" />} label="Line Chart" />
            <WidgetPreview icon={<BarChart3 className="h-10 w-10 text-indigo-600" />} label="Bar Chart" />
            <WidgetPreview icon={<PieChart className="h-10 w-10 text-indigo-600" />} label="Pie Chart" />
            <WidgetPreview icon={<div className="text-xs text-indigo-600 font-mono">| A | B |</div>} label="Table" />
            <WidgetPreview
              icon={<div className="w-16 h-3 bg-indigo-200 rounded-full overflow-hidden"><div className="w-3/4 h-full bg-indigo-600"></div></div>}
              label="Progress"
            />
          </div>
        </div>
      </section>

      {/* Integrations Coming Soon */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            More Integrations Coming Soon
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We&apos;re building connectors for the tools you already use. Start with CSV today, connect your favorite apps tomorrow.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Google Analytics", "Stripe", "HubSpot", "Shopify", "QuickBooks", "Salesforce", "Google Sheets", "Airtable"].map((name) => (
              <span key={name} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Your Dashboard?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
            Join thousands of businesses using DashBuilder to visualize their data and make better decisions.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-50 transition"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <BarChart3 className="h-6 w-6 text-indigo-400" />
              <span className="ml-2 text-lg font-semibold text-white">DashBuilder</span>
            </div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} DashBuilder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function WidgetPreview({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-center">
      <div className="mb-3 h-12 flex items-center justify-center">{icon}</div>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
}
