import React, { useState, useEffect } from "react";

import {

  Users,
  ShoppingCart,
  DollarSign,
  Download,
  RefreshCw,
  Target,
} from "lucide-react";
import { QuickStats } from "./QuickStats";
import { KPICard } from "./KPICard";
import RevenueTraffic from "./RevenueTraffic";
import TopPageTable from "./TopPageTable";
import TopTables from "./TopTable";

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [isLive, setIsLive] = useState(false);
  const [activeView, setActiveView] = useState("revenue");

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
          <QuickStats isLive={isLive} />
        </div>

        {/* Main KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* Smart Charts Grid */}
        <RevenueTraffic activeView={activeView} setActiveView={setActiveView} />

        {/* Smart Table */}
        <TopPageTable />

        {/* bottom-3-table */}
        <TopTables />

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
