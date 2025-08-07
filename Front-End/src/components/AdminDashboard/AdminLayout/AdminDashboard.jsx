import { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation */}
      <Header selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {/* Sidebar  */}
      <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </div>
  );
}

// Components

export function StatCard({ title, value, change, isPositive }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-1 flex items-baseline justify-between">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p
          className={`text-sm font-medium flex items-center ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}
        </p>
      </div>
    </div>
  );
}
