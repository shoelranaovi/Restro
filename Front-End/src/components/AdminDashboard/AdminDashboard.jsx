import { useState, useEffect } from "react";

import {
  Menu,
  User,
  Settings,
  Bell,
  Search,
  Home,
  BarChart2,
  Users,
  ShoppingBag,
  MessageSquare,
  Calendar,
  HelpCircle,
  LogOut,
  ChevronDown,
  Layers,
  X,
  CalendarCheck2,
  FileStack,
} from "lucide-react";
import DashboardaMain from "./DashboardaMain";
import AnalyticsDashboard from "./Analytics";
import ProductTable from "./Product/AllProducts";
import MessageTable from "./Message";
import RestaurantSettingsPage from "./Settings";
import HelpPage from "./Admin-help";
import RestaurantCalendar from "./Calender";
import Customers from "./Customers/Customer";
import ReservationDashboard from "./Reserrvation/ReservationMain";
import RestaurantBlogManagement from "./Blog";
import OrderTable from "./Order";

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
    { title: "New Customers", value: "342", change: "+5.7%", isPositive: true },
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

export default function AdminDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // Dashboard Main Content
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
            {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Page
          </h2>
          <p className="text-gray-500">This page is under construction.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm pt-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-4 h-16">
            <div className="flex">
              {/* Mobile menu button */}
              <div className="mr-2 flex items-center md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Layers className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900 hidden md:block">
                  AdminPanel
                </span>
              </div>
            </div>

            {/* Search */}
            <div className="hidden md:flex md:flex-1 md:justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center">
              {/* Date & Time */}
              <div className="hidden lg:flex flex-col items-end mr-4">
                <span className="text-sm font-medium text-gray-700">
                  {formatDate(currentTime)}
                </span>
                <span className="text-xs text-gray-500">
                  {formatTime(currentTime)}
                </span>
              </div>

              {/* Notification dropdown */}
              <div className="relative ml-3 z-50">
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="p-1 text-gray-500 rounded-full hover:bg-gray-100 relative">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>

                {isNotificationOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical">
                      <div className="px-4 py-2 border-b">
                        <h3 className="text-sm font-medium">Notifications</h3>
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        <NotificationItem
                          title="New Order Received"
                          description="You have received a new order #ORD-7892"
                          time="Just now"
                          isNew={true}
                        />
                        <NotificationItem
                          title="Product Update"
                          description="Inventory running low on SKU-3842"
                          time="1 hour ago"
                          isNew={true}
                        />
                        <NotificationItem
                          title="System Update"
                          description="System update scheduled for tonight 12 AM"
                          time="3 hours ago"
                          isNew={false}
                        />
                        <NotificationItem
                          title="New User Registration"
                          description="5 new users registered today"
                          time="5 hours ago"
                          isNew={false}
                        />
                      </div>
                      <div className="px-4 py-2 border-t">
                        <a
                          href="#"
                          className="text-sm text-indigo-600 hover:text-indigo-900 font-medium">
                          View all notifications
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center max-w-xs bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <User size={18} />
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                      Admin User
                    </span>
                    <ChevronDown
                      size={16}
                      className="ml-1 text-gray-400 hidden md:block"
                    />
                  </button>
                </div>

                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem">
                        Your Profile
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem">
                        Settings
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem">
                        Sign out
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu - shown/hidden based on mobile menu state */}
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-md">
          <MobileNavLink
            icon={<Home size={18} />}
            label="Dashboard"
            isActive={selectedTab === "dashboard"}
            onClick={() => {
              setSelectedTab("dashboard");
              toggleMobileMenu();
            }}
          />
          <MobileNavLink
            icon={<BarChart2 size={18} />}
            label="Analytics"
            isActive={selectedTab === "analytics"}
            onClick={() => {
              setSelectedTab("analytics");
              toggleMobileMenu();
            }}
          />
          <MobileNavLink
            icon={<ShoppingBag size={18} />}
            label="Products"
            isActive={selectedTab === "products"}
            onClick={() => {
              setSelectedTab("products");
              toggleMobileMenu();
            }}
          />
          <MobileNavLink
            icon={<Users size={18} />}
            label="Customers"
            isActive={selectedTab === "customers"}
            onClick={() => {
              setSelectedTab("customers");
              toggleMobileMenu();
            }}
          />
          <MobileNavLink
            icon={<MessageSquare size={18} />}
            label="Messages"
            isActive={selectedTab === "messages"}
            onClick={() => {
              setSelectedTab("messages");
              toggleMobileMenu();
            }}
          />
          <MobileNavLink
            icon={<Calendar size={18} />}
            label="Calendar"
            isActive={selectedTab === "calendar"}
            onClick={() => {
              setSelectedTab("calendar");
              toggleMobileMenu();
            }}
          />
          <MobileNavLink
            icon={<Settings size={18} />}
            label="Settings"
            isActive={selectedTab === "settings"}
            onClick={() => {
              setSelectedTab("settings");
              toggleMobileMenu();
            }}
          />
          <MobileNavLink
            icon={<HelpCircle size={18} />}
            label="Help"
            isActive={selectedTab === "help"}
            onClick={() => {
              setSelectedTab("help");
              toggleMobileMenu();
            }}
          />
          <MobileNavLink
            icon={<LogOut size={18} />}
            label="Logout"
            isActive={false}
            onClick={() => {}}
          />
        </div>
      </div>

      <div className="flex-1  flex overflow-hidden">
        {/* Sidebar - hidden on mobile */}
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
                  icon={<FileStack  size={18} />}
                  label="Blog"
                  isActive={selectedTab === "blog"}
                  onClick={() => setSelectedTab("blog")}
                />
                   <SidebarLink
                  icon={<CalendarCheck2  size={18} />}
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
                    {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
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
    </div>
  );
}

// Components
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
      `}>
      <div
        className={`
        mr-3 ${
          isActive ? "text-white" : "text-gray-400 group-hover:text-gray-300"
        }
      `}>
        {icon}
      </div>
      {label}
    </a>
  );
}

function MobileNavLink({ icon, label, isActive, onClick }) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`
        group flex items-center px-3 py-2 text-base font-medium rounded-md 
        ${
          isActive
            ? "bg-gray-100 text-gray-900"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }
      `}>
      <div
        className={`
        mr-3 ${
          isActive ? "text-gray-900" : "text-gray-400 group-hover:text-gray-500"
        }
      `}>
        {icon}
      </div>
      {label}
    </a>
  );
}

export function StatCard({ title, value, change, isPositive }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-1 flex items-baseline justify-between">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p
          className={`text-sm font-medium flex items-center ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}>
          {change}
        </p>
      </div>
    </div>
  );
}

function NotificationItem({ title, description, time, isNew }) {
  return (
    <div className={`px-4 py-3 hover:bg-gray-50 ${isNew ? "bg-blue-50" : ""}`}>
      <div className="flex justify-between">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  );
}
