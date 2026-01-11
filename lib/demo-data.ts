// Demo data for showcasing the dashboard
export const demoSalesData = {
  name: "Demo Sales Data",
  type: "demo",
  columns: [
    { name: "month", type: "string" },
    { name: "revenue", type: "number" },
    { name: "orders", type: "number" },
    { name: "customers", type: "number" },
    { name: "avgOrderValue", type: "number" },
  ],
  data: [
    { month: "Jan", revenue: 45000, orders: 320, customers: 280, avgOrderValue: 141 },
    { month: "Feb", revenue: 52000, orders: 380, customers: 310, avgOrderValue: 137 },
    { month: "Mar", revenue: 48000, orders: 350, customers: 290, avgOrderValue: 137 },
    { month: "Apr", revenue: 61000, orders: 420, customers: 350, avgOrderValue: 145 },
    { month: "May", revenue: 55000, orders: 390, customers: 320, avgOrderValue: 141 },
    { month: "Jun", revenue: 67000, orders: 460, customers: 380, avgOrderValue: 146 },
    { month: "Jul", revenue: 72000, orders: 500, customers: 410, avgOrderValue: 144 },
    { month: "Aug", revenue: 69000, orders: 480, customers: 390, avgOrderValue: 144 },
    { month: "Sep", revenue: 74000, orders: 510, customers: 420, avgOrderValue: 145 },
    { month: "Oct", revenue: 81000, orders: 560, customers: 460, avgOrderValue: 145 },
    { month: "Nov", revenue: 95000, orders: 650, customers: 520, avgOrderValue: 146 },
    { month: "Dec", revenue: 110000, orders: 750, customers: 580, avgOrderValue: 147 },
  ],
};

export const demoMarketingData = {
  name: "Demo Marketing Data",
  type: "demo",
  columns: [
    { name: "channel", type: "string" },
    { name: "spend", type: "number" },
    { name: "impressions", type: "number" },
    { name: "clicks", type: "number" },
    { name: "conversions", type: "number" },
  ],
  data: [
    { channel: "Google Ads", spend: 5000, impressions: 250000, clicks: 7500, conversions: 150 },
    { channel: "Facebook", spend: 3000, impressions: 180000, clicks: 5400, conversions: 95 },
    { channel: "Instagram", spend: 2500, impressions: 150000, clicks: 4500, conversions: 80 },
    { channel: "LinkedIn", spend: 2000, impressions: 80000, clicks: 2400, conversions: 60 },
    { channel: "Twitter", spend: 1000, impressions: 60000, clicks: 1800, conversions: 30 },
    { channel: "Email", spend: 500, impressions: 50000, clicks: 5000, conversions: 200 },
  ],
};

export const demoOperationsData = {
  name: "Demo Operations Data",
  type: "demo",
  columns: [
    { name: "metric", type: "string" },
    { name: "current", type: "number" },
    { name: "target", type: "number" },
    { name: "lastMonth", type: "number" },
  ],
  data: [
    { metric: "Customer Satisfaction", current: 4.5, target: 4.8, lastMonth: 4.3 },
    { metric: "Response Time (hrs)", current: 2.1, target: 2.0, lastMonth: 2.5 },
    { metric: "Resolution Rate (%)", current: 92, target: 95, lastMonth: 89 },
    { metric: "Tickets Resolved", current: 1250, target: 1300, lastMonth: 1180 },
    { metric: "Team Utilization (%)", current: 78, target: 80, lastMonth: 75 },
  ],
};

export const templates = [
  {
    id: "sales-dashboard",
    name: "Sales Dashboard",
    description: "Track revenue, orders, and customer metrics",
    category: "sales",
    thumbnail: "/templates/sales.png",
    config: {
      widgets: [
        { type: "kpi", title: "Total Revenue", position: { x: 0, y: 0, w: 3, h: 2 }, config: { color: "#10b981" }, dataConfig: { source: "sales", field: "revenue", aggregation: "sum" } },
        { type: "kpi", title: "Total Orders", position: { x: 3, y: 0, w: 3, h: 2 }, config: { color: "#3b82f6" }, dataConfig: { source: "sales", field: "orders", aggregation: "sum" } },
        { type: "kpi", title: "Customers", position: { x: 6, y: 0, w: 3, h: 2 }, config: { color: "#8b5cf6" }, dataConfig: { source: "sales", field: "customers", aggregation: "sum" } },
        { type: "kpi", title: "Avg Order Value", position: { x: 9, y: 0, w: 3, h: 2 }, config: { color: "#f59e0b" }, dataConfig: { source: "sales", field: "avgOrderValue", aggregation: "avg" } },
        { type: "line", title: "Revenue Over Time", position: { x: 0, y: 2, w: 8, h: 4 }, config: { color: "#10b981" }, dataConfig: { source: "sales", xField: "month", yField: "revenue" } },
        { type: "bar", title: "Orders by Month", position: { x: 8, y: 2, w: 4, h: 4 }, config: { color: "#3b82f6" }, dataConfig: { source: "sales", xField: "month", yField: "orders" } },
      ],
    },
  },
  {
    id: "marketing-dashboard",
    name: "Marketing Dashboard",
    description: "Analyze ad spend, impressions, and conversions",
    category: "marketing",
    thumbnail: "/templates/marketing.png",
    config: {
      widgets: [
        { type: "kpi", title: "Total Spend", position: { x: 0, y: 0, w: 3, h: 2 }, config: { color: "#ef4444", prefix: "$" }, dataConfig: { source: "marketing", field: "spend", aggregation: "sum" } },
        { type: "kpi", title: "Impressions", position: { x: 3, y: 0, w: 3, h: 2 }, config: { color: "#3b82f6" }, dataConfig: { source: "marketing", field: "impressions", aggregation: "sum" } },
        { type: "kpi", title: "Conversions", position: { x: 6, y: 0, w: 3, h: 2 }, config: { color: "#10b981" }, dataConfig: { source: "marketing", field: "conversions", aggregation: "sum" } },
        { type: "pie", title: "Spend by Channel", position: { x: 0, y: 2, w: 6, h: 4 }, config: {}, dataConfig: { source: "marketing", nameField: "channel", valueField: "spend" } },
        { type: "bar", title: "Conversions by Channel", position: { x: 6, y: 2, w: 6, h: 4 }, config: { color: "#10b981" }, dataConfig: { source: "marketing", xField: "channel", yField: "conversions" } },
      ],
    },
  },
  {
    id: "operations-dashboard",
    name: "Operations Dashboard",
    description: "Monitor team performance and KPIs",
    category: "operations",
    thumbnail: "/templates/operations.png",
    config: {
      widgets: [
        { type: "kpi", title: "CSAT Score", position: { x: 0, y: 0, w: 4, h: 2 }, config: { color: "#10b981" }, dataConfig: { source: "operations", metric: "Customer Satisfaction", field: "current" } },
        { type: "kpi", title: "Response Time", position: { x: 4, y: 0, w: 4, h: 2 }, config: { color: "#f59e0b", suffix: " hrs" }, dataConfig: { source: "operations", metric: "Response Time (hrs)", field: "current" } },
        { type: "kpi", title: "Resolution Rate", position: { x: 8, y: 0, w: 4, h: 2 }, config: { color: "#3b82f6", suffix: "%" }, dataConfig: { source: "operations", metric: "Resolution Rate (%)", field: "current" } },
        { type: "progress", title: "Team Utilization", position: { x: 0, y: 2, w: 6, h: 2 }, config: { color: "#8b5cf6" }, dataConfig: { source: "operations", metric: "Team Utilization (%)", currentField: "current", targetField: "target" } },
        { type: "table", title: "All Metrics", position: { x: 0, y: 4, w: 12, h: 4 }, config: {}, dataConfig: { source: "operations" } },
      ],
    },
  },
];
