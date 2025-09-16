import React from 'react'
import {
  AreaChart,
  Area,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
} from 'recharts';

function RevenueTraffic({ activeView, setActiveView }) {
  const trafficData = [
    { name: "Organic", value: 45, color: "#3B82F6" },
    { name: "Direct", value: 25, color: "#10B981" },
    { name: "Social", value: 20, color: "#F59E0B" },
    { name: "Email", value: 10, color: "#EF4444" },
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

  return (
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
                onClick={() => setActiveView(metric)}
              >
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
              dataKey="value"
            >
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
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
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
  );
}

export default RevenueTraffic;
