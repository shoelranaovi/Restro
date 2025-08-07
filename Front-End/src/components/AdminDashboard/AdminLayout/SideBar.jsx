import { useState } from "react";
import DashboardaMain from "../DashboardaMain";
import AnalyticsDashboard from "../Analytics";
import Customers from "../Customers/Customer";
import ProductTable from "../Product/AllProducts";
import OrderTable from "../Order";
import MessageTable from "../Message";
import RestaurantSettingsPage from "../Settings";
import HelpPage from "../Admin-help";
import RestaurantCalendar from "../Calender";
import ReservationDashboard from "../Reserrvation/ReservationMain";
import RestaurantBlogManagement from "../Blog";
import {
  User,
  Settings,
  Home,
  BarChart2,
  Users,
  ShoppingBag,
  MessageSquare,
  Calendar,
  HelpCircle,
  LogOut,
  CalendarCheck2,
  FileStack,
} from "lucide-react";

export default function SideBar({selectedTab ,setSelectedTab}) {
  console.log(selectedTab)
 
  // Sample data using array structures
  const dashboardData = {
    sales: [
      { name: "Jan", value: 4000 },
      { name: "Feb", value: 3000 },
      { name: "Mar", value: 2000 },
      { name: "Apr", value: 2780 },
      { name: "May", value: 1890 },
      { name: "Jun", value: 2390 },
      { name: "Jul", value: 3490 },
      { name: "Aug", value: 4000 },
      { name: "Sep", value: 3200 },
      { name: "Oct", value: 2800 },
      { name: "Nov", value: 3300 },
      { name: "Dec", value: 4200 },
    ],
    traffic: [
      { name: "Jan", organic: 4000, paid: 2400 },
      { name: "Feb", organic: 3000, paid: 1398 },
      { name: "Mar", organic: 2000, paid: 9800 },
      { name: "Apr", organic: 2780, paid: 3908 },
      { name: "May", organic: 1890, paid: 4800 },
      { name: "Jun", organic: 2390, paid: 3800 },
    ],
    userSources: [
      { name: "Direct", value: 400 },
      { name: "Social", value: 300 },
      { name: "Email", value: 300 },
      { name: "Organic", value: 200 },
      { name: "Referral", value: 100 },
    ],
    orders: [
      {
        id: "ORD-001",
        customer: "John Doe",
        status: "Delivered",
        amount: "$352.00",
        date: "May 20, 2025",
      },
      {
        id: "ORD-002",
        customer: "Jane Smith",
        status: "Processing",
        amount: "$120.99",
        date: "May 19, 2025",
      },
      {
        id: "ORD-003",
        customer: "Mike Johnson",
        status: "Pending",
        amount: "$75.50",
        date: "May 19, 2025",
      },
      {
        id: "ORD-004",
        customer: "Sara Wilson",
        status: "Delivered",
        amount: "$214.30",
        date: "May 18, 2025",
      },
      {
        id: "ORD-005",
        customer: "Robert Brown",
        status: "Cancelled",
        amount: "$42.75",
        date: "May 17, 2025",
      },
    ],
    stats: [
      {
        title: "Total Revenue",
        value: "$24,532",
        change: "+12.5%",
        isPositive: true,
      },
      {
        title: "Total Orders",
        value: "1,245",
        change: "+8.2%",
        isPositive: true,
      },
      {
        title: "New Customers",
        value: "342",
        change: "+5.7%",
        isPositive: true,
      },
      {
        title: "Conversion Rate",
        value: "3.24%",
        change: "-0.5%",
        isPositive: false,
      },
    ],
    notifications: [
      {
        title: "New Order Received",
        description: "You have received a new order #ORD-7892",
        time: "Just now",
        isNew: true,
      },
      {
        title: "Product Update",
        description: "Inventory running low on SKU-3842",
        time: "1 hour ago",
        isNew: true,
      },
      {
        title: "System Update",
        description: "System update scheduled for tonight 12 AM",
        time: "3 hours ago",
        isNew: false,
      },
      {
        title: "New User Registration",
        description: "5 new users registered today",
        time: "5 hours ago",
        isNew: false,
      },
    ],
  };

  const statusClasses = {
    Delivered: "bg-green-100 text-green-800",
    Processing: "bg-blue-100 text-blue-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  const renderContent = () => {
    if (selectedTab === "dashboard") {
      return (
        <DashboardaMain
          dashboardData={dashboardData}
          statusClasses={statusClasses}
        />
      );
    }
    if (selectedTab === "analytics") {
      return <AnalyticsDashboard />;
    }
    if (selectedTab === "customers") {
      return <Customers />;
    }
    if (selectedTab === "products") {
      return <ProductTable />;
    }
    if (selectedTab === "orders") {
      return <OrderTable />;
    }
    if (selectedTab === "messages") {
      return <MessageTable />;
    }
    if (selectedTab === "settings") {
      return <RestaurantSettingsPage />;
    }
    if (selectedTab === "help") {
      return <HelpPage />;
    }
    if (selectedTab === "calendar") {
      return <RestaurantCalendar />;
    }
    if (selectedTab === "reservation") {
      return <ReservationDashboard />;
    }
    if (selectedTab === "blog") {
      return <RestaurantBlogManagement />;
    }
    return (
      <div className="flex items-center justify-center h-64 bg-white p-6 rounded-lg shadow text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            {selectedTab?.charAt(0).toUpperCase() + selectedTab?.slice(1)} Page
          </h2>
          <p className="text-gray-500">This page is under construction.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1  flex overflow-hidden">
      <nav className="hidden h-screen md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-gray-800 h-[90vh] ">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 space-y-1">
              <SidebarLink
                icon={<Home size={18} />}
                label="Dashboard"
                isActive={selectedTab === "dashboard"}
                onClick={() => setSelectedTab("dashboard")}
              />
              <SidebarLink
                icon={<BarChart2 size={18} />}
                label="Analytics"
                isActive={selectedTab === "analytics"}
                onClick={() => setSelectedTab("analytics")}
              />
              <SidebarLink
                icon={<FileStack size={18} />}
                label="Blog"
                isActive={selectedTab === "blog"}
                onClick={() => setSelectedTab("blog")}
              />
              <SidebarLink
                icon={<CalendarCheck2 size={18} />}
                label="Reservation"
                isActive={selectedTab === "Reservation"}
                onClick={() => setSelectedTab("reservation")}
              />
              <SidebarLink
                icon={<ShoppingBag size={18} />}
                label="Products"
                isActive={selectedTab === "products"}
                onClick={() => setSelectedTab("products")}
              />
              <SidebarLink
                icon={<ShoppingBag size={18} />}
                label="Orders"
                isActive={selectedTab === "orders"}
                onClick={() => setSelectedTab("orders")}
              />
              <SidebarLink
                icon={<Users size={18} />}
                label="Customers"
                isActive={selectedTab === "customers"}
                onClick={() => setSelectedTab("customers")}
              />

              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Communications
                </h3>
              </div>
              <SidebarLink
                icon={<MessageSquare size={18} />}
                label="Messages"
                isActive={selectedTab === "messages"}
                onClick={() => setSelectedTab("messages")}
              />
              <SidebarLink
                icon={<Calendar size={18} />}
                label="Calendar"
                isActive={selectedTab === "calendar"}
                onClick={() => setSelectedTab("calendar")}
              />

              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Settings
                </h3>
              </div>
              <SidebarLink
                icon={<Settings size={18} />}
                label="Settings"
                isActive={selectedTab === "settings"}
                onClick={() => setSelectedTab("settings")}
              />
              <SidebarLink
                icon={<HelpCircle size={18} />}
                label="Help"
                isActive={selectedTab === "help"}
                onClick={() => setSelectedTab("help")}
              />
              <SidebarLink
                icon={<LogOut size={18} />}
                label="Logout"
                isActive={false}
                onClick={() => {}}
              />
            </div>
          </div>
          <div className="flex-shrink-0 flex bg-gray-700 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <div className="h-9 w-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
                    <User size={18} />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Admin User</p>
                  <p className="text-xs font-medium text-gray-300">
                    View profile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6">
        <div className="container mx-auto">
          {/* Breadcrumb & Title */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {selectedTab?.charAt(0).toUpperCase() + selectedTab?.slice(1)}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  A comprehensive overview of your {selectedTab} performance.
                </p>
              </div>
              {selectedTab === "dashboard" && (
                <div className="mt-4 md:mt-0">
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Generate Report
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Dashboard Content */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, isActive, onClick }) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`
          group flex items-center px-3 py-2 text-sm font-medium rounded-md 
          ${
            isActive
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }
        `}
    >
      <div
        className={`
          mr-3 ${
            isActive ? "text-white" : "text-gray-400 group-hover:text-gray-300"
          }
        `}
      >
        {icon}
      </div>
      {label}
    </a>
  );
}
