import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DashBuilder - Create Beautiful Dashboards in Minutes",
  description: "Build professional data dashboards without code. Connect your data via CSV, use pre-built templates, and share insights with drag-and-drop simplicity.",
  keywords: "dashboard builder, data visualization, business intelligence, no-code dashboard, analytics, reporting",
  openGraph: {
    title: "DashBuilder - Create Beautiful Dashboards in Minutes",
    description: "Build professional data dashboards without code. Connect your data, use templates, share insights.",
    type: "website",
    siteName: "DashBuilder",
  },
  twitter: {
    card: "summary_large_image",
    title: "DashBuilder - Create Beautiful Dashboards in Minutes",
    description: "Build professional data dashboards without code.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
