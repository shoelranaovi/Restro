import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  MousePointer,
  Calendar,
  Download,
  Filter,
  Search,
  Bell,
  User,
  BarChart3,
  Package,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

const Analytics = () => {
  // Sample data arrays
  const salesData = [
    { month: 'Jan', sales: 4200 },
    { month: 'Feb', sales: 3100 },
    { month: 'Mar', sales: 1800 },
    { month: 'Apr', sales: 2800 },
    { month: 'May', sales: 1600 },
    { month: 'Jun', sales: 2400 },
    { month: 'Jul', sales: 3500 },
    { month: 'Aug', sales: 4100 },
    { month: 'Sep', sales: 3200 },
    { month: 'Oct', sales: 2900 },
    { month: 'Nov', sales: 3300 },
    { month: 'Dec', sales: 4300 }
  ];

  const trafficData = [
    { month: 'Jan', organic: 4200, paid: 3200 },
    { month: 'Feb', organic: 1800, paid: 2800 },
    { month: 'Mar', organic: 10200, paid: 2200 },
    { month: 'Apr', organic: 4200, paid: 2600 },
    { month: 'May', organic: 5200, paid: 2000 },
    { month: 'Jun', organic: 4400, paid: 2400 }
  ];

  const keyMetrics = [
    {
      title: 'Total Revenue',
      value: '$24,532',
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign
    },
    {
      title: 'Total Orders',
      value: '1,245',
      change: '+8.2%',
      isPositive: true,
      icon: ShoppingCart
    },
    {
      title: 'New Customers',
      value: '342',
      change: '+5.7%',
      isPositive: true,
      icon: Users
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-0.5%',
      isPositive: false,
      icon: MousePointer
    }
  ];

  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', active: false },
    { icon: BarChart3, label: 'Analytics', active: true },
    { icon: Package, label: 'Products', active: false },
    { icon: Users, label: 'Customers', active: false },
    { icon: MessageSquare, label: 'Messages', active: false },
    { icon: Calendar, label: 'Calendar', active: false },
    { icon: Settings, label: 'Settings', active: false },
    { icon: HelpCircle, label: 'Help', active: false },
    { icon: LogOut, label: 'Logout', active: false }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-gray-900 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-semibold text-white">AdminPanel</span>
            </div>
          </div>
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href="#"
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.active
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </a>
              );
            })}
          </nav>
          <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-300" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-gray-400">View profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Header */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-200">
          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="text-sm text-right mr-4">
                <div className="text-gray-900 font-medium">Thursday, May 22, 2025</div>
                <div className="text-gray-500">11:22:47 AM</div>
              </div>
              <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">Admin User</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Page Title */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                  <p className="text-gray-600 mt-1">A comprehensive overview of your analytics performance.</p>
                </div>
                <div className="flex space-x-3">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </button>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {keyMetrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <div key={index} className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                      <div className="p-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <Icon className="h-8 w-8 text-gray-400" />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">
                                {metric.title}
                              </dt>
                              <dd className="flex items-baseline">
                                <div className="text-2xl font-semibold text-gray-900">
                                  {metric.value}
                                </div>
                                <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                                  metric.isPositive ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {metric.isPositive ? (
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                  ) : (
                                    <TrendingDown className="h-3 w-3 mr-1" />
                                  )}
                                  {metric.change}
                                </div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sales Overview Chart */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Sales Overview</h3>
                  </div>
                  <div className="p-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="month" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#6b7280' }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#6b7280' }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Traffic Source Chart */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Traffic Source</h3>
                  </div>
                  <div className="p-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={trafficData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="month" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#6b7280' }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#6b7280' }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="organic" 
                          stroke="#10b981" 
                          strokeWidth={3}
                          dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                          name="Organic"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="paid" 
                          stroke="#6366f1" 
                          strokeWidth={3}
                          dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                          name="Paid"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Additional Analytics Tables */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Top Products */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Top Products</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {[
                        { name: 'Product A', sales: 1245, change: '+12%' },
                        { name: 'Product B', sales: 987, change: '+8%' },
                        { name: 'Product C', sales: 756, change: '+15%' },
                        { name: 'Product D', sales: 654, change: '+3%' },
                        { name: 'Product E', sales: 543, change: '+7%' }
                      ].map((product, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.sales} sales</div>
                          </div>
                          <div className="text-sm text-green-600 font-medium">{product.change}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {[
                        { action: 'New order received', time: '2 minutes ago', type: 'order' },
                        { action: 'Customer registered', time: '15 minutes ago', type: 'user' },
                        { action: 'Payment processed', time: '32 minutes ago', type: 'payment' },
                        { action: 'Product updated', time: '1 hour ago', type: 'product' },
                        { action: 'Report generated', time: '2 hours ago', type: 'report' }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <div className="flex-1">
                            <div className="text-sm text-gray-900">{activity.action}</div>
                            <div className="text-xs text-gray-500">{activity.time}</div>
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
                        { metric: 'Page Load Time', value: '1.2s', status: 'good' },
                        { metric: 'Bounce Rate', value: '34%', status: 'good' },
                        { metric: 'Session Duration', value: '4m 32s', status: 'excellent' },
                        { metric: 'Error Rate', value: '0.1%', status: 'excellent' },
                        { metric: 'API Response', value: '145ms', status: 'good' }
                      ].map((perf, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="text-sm text-gray-900">{perf.metric}</div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">{perf.value}</span>
                            <div className={`w-2 h-2 rounded-full ${
                              perf.status === 'excellent' ? 'bg-green-500' : 
                              perf.status === 'good' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;