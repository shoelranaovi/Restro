import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  Calendar,
  Download,
  RefreshCw,
  Bell,
  Search,
  Activity,
  Target,
  Clock,
  Zap,
} from "lucide-react";

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [isLive, setIsLive] = useState(false);
  const [activeView, setActiveView] = useState("overview");

  // Smart data arrays
  const kpiData = [
    {
      title: "Revenue",
      value: "$45.2K",
      change: "+12.5%",
      isUp: true,
      icon: DollarSign,
      color: "emerald",
    },
    {
      title: "Users",
      value: "8.5K",
      change: "+8.2%",
      isUp: true,
      icon: Users,
      color: "blue",
    },
    {
      title: "Orders",
      value: "1.2K",
      change: "-2.1%",
      isUp: false,
      icon: ShoppingCart,
      color: "purple",
    },
    {
      title: "Conversion",
      value: "3.24%",
      change: "+0.3%",
      isUp: true,
      icon: Target,
      color: "orange",
    },
  ];

  const chartData = [
    { name: "Mon", revenue: 4200, users: 120, orders: 45 },
    { name: "Tue", revenue: 5100, users: 140, orders: 52 },
    { name: "Wed", revenue: 4800, users: 135, orders: 48 },
    { name: "Thu", revenue: 6200, users: 165, orders: 61 },
    { name: "Fri", revenue: 7100, users: 190, orders: 72 },
    { name: "Sat", revenue: 5800, users: 155, orders: 58 },
    { name: "Sun", revenue: 4900, users: 130, orders: 49 },
  ];

  const trafficData = [
    { name: "Organic", value: 45, color: "#3B82F6" },
    { name: "Direct", value: 25, color: "#10B981" },
    { name: "Social", value: 20, color: "#F59E0B" },
    { name: "Email", value: 10, color: "#EF4444" },
  ];

  const topPages = [
    { page: "/dashboard", views: 12400, bounce: "32%", time: "4:12" },
    { page: "/products", views: 8900, bounce: "28%", time: "5:45" },
    { page: "/checkout", views: 4200, bounce: "45%", time: "2:18" },
    { page: "/profile", views: 3100, bounce: "38%", time: "3:24" },
  ];

  const alerts = [
    { type: "success", message: "Revenue up 15% vs yesterday", time: "2m ago" },
    {
      type: "warning",
      message: "High bounce rate on /checkout",
      time: "15m ago",
    },
    {
      type: "info",
      message: "New users from social media spike",
      time: "1h ago",
    },
  ];

  // Smart components
  const KPICard = ({ title, value, change, isUp, icon: Icon, color }) => {
    const colors = {
      emerald: "from-emerald-500 to-emerald-600",
      blue: "from-blue-500 to-blue-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
    };

    return (
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <div className="flex items-center mt-2">
              {isUp ? (
                <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span
                className={`text-xs font-medium ${
                  isUp ? "text-emerald-600" : "text-red-600"
                }`}>
                {change}
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-lg bg-gradient-to-r ${colors[color]}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    );
  };

  const AlertBadge = ({ type, message, time }) => {
    const styles = {
      success: "bg-emerald-50 border-emerald-200 text-emerald-800",
      warning: "bg-amber-50 border-amber-200 text-amber-800",
      info: "bg-blue-50 border-blue-200 text-blue-800",
    };

    return (
      <div className={`p-3 rounded-lg border ${styles[type]} text-sm`}>
        <p className="font-medium">{message}</p>
        <p className="text-xs opacity-75 mt-1">{time}</p>
      </div>
    );
  };

  const QuickStats = () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Live Visitors</p>
            <p className="text-2xl font-bold">
              {isLive ? Math.floor(Math.random() * 50) + 150 : "187"}
            </p>
          </div>
          <Activity className="h-6 w-6 opacity-80" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Avg. Speed</p>
            <p className="text-2xl font-bold">2.1s</p>
          </div>
          <Zap className="h-6 w-6 opacity-80" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Session Time</p>
            <p className="text-2xl font-bold">4:32</p>
          </div>
          <Clock className="h-6 w-6 opacity-80" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Page Views</p>
            <p className="text-2xl font-bold">23.4K</p>
          </div>
          <Eye className="h-6 w-6 opacity-80" />
        </div>
      </div>
    </div>
  );

  // Auto-refresh for live mode
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        // Trigger re-render for live data
        setIsLive(true);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isLive]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Smart Header */}
      <div className="bg-white border-b border-gray-200 sticky -top-6 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
              <div
                className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs ${
                  isLive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-600"
                }`}>
                <div
                  className={`w-2 h-2 rounded-full ${
                    isLive ? "bg-emerald-500" : "bg-gray-400"
                  }`}></div>
                <span>{isLive ? "Live" : "Static"}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-48 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                <option value="24h">Last 24h</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
              </select>

              <button
                onClick={() => setIsLive(!isLive)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isLive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}>
                <Activity className="h-4 w-4 mr-1 inline" />
                Live
              </button>

              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Smart Alerts */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {alerts.map((alert, index) => (
              <AlertBadge key={index} {...alert} />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-6">
          <QuickStats />
        </div>

        {/* Main KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* Smart Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Main Revenue Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue Trend
              </h3>
              <div className="flex space-x-2">
                {["revenue", "users", "orders"].map((metric) => (
                  <button
                    key={metric}
                    className={`px-3 py-1 rounded-lg text-xs font-medium capitalize ${
                      activeView === metric
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveView(metric)}>
                    {metric}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={activeView}
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Traffic Sources
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value">
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {trafficData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Smart Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Top Pages</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Page
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Bounce Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Avg Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {topPages.map((page, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {page.page}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {page.views.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          parseFloat(page.bounce) > 40
                            ? "bg-red-100 text-red-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}>
                        {page.bounce}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{page.time}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {/* Top Products */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Top Products
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: "Product A", sales: 1245, change: "+12%" },
                  { name: "Product B", sales: 987, change: "+8%" },
                  { name: "Product C", sales: 756, change: "+15%" },
                  { name: "Product D", sales: 654, change: "+3%" },
                  { name: "Product E", sales: 543, change: "+7%" },
                ].map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-1 border-gray-200">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.sales} sales
                      </div>
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      {product.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Activity
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  {
                    action: "New order received",
                    time: "2 minutes ago",
                    type: "order",
                  },
                  {
                    action: "Customer registered",
                    time: "15 minutes ago",
                    type: "user",
                  },
                  {
                    action: "Payment processed",
                    time: "32 minutes ago",
                    type: "payment",
                  },
                  {
                    action: "Product updated",
                    time: "1 hour ago",
                    type: "product",
                  },
                  {
                    action: "Report generated",
                    time: "2 hours ago",
                    type: "report",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">
                        {activity.action}
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Performance</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { metric: "Page Load Time", value: "1.2s", status: "good" },
                  { metric: "Bounce Rate", value: "34%", status: "good" },
                  {
                    metric: "Session Duration",
                    value: "4m 32s",
                    status: "excellent",
                  },
                  { metric: "Error Rate", value: "0.1%", status: "excellent" },
                  { metric: "API Response", value: "145ms", status: "good" },
                ].map((perf, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between">
                    <div className="text-sm text-gray-900">{perf.metric}</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {perf.value}
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          perf.status === "excellent"
                            ? "bg-green-500"
                            : perf.status === "good"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="fixed bottom-6 right-6 flex space-x-3">
          <button className="bg-white p-3 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <RefreshCw className="h-5 w-5 text-gray-600" />
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors">
            <Download className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
