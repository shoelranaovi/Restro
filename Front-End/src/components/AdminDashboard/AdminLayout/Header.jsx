import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  X,
} from "lucide-react";
import logo from "../../../assets/logo/image.png";
import { formatDateWithFull } from "@/helper/formatDate";
import { formatTime } from "@/helper/formatTime";

// Mobile navigation items array
const mobileNavItems = [
  {
    id: "dashboard",
    icon: <Home size={18} />,
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    id: "analytics",
    icon: <BarChart2 size={18} />,
    label: "Analytics",
    to: "/analytics",
  },
  {
    id: "products",
    icon: <ShoppingBag size={18} />,
    label: "Products",
    to: "/products",
  },
  {
    id: "customers",
    icon: <Users size={18} />,
    label: "Customers",
    to: "/customers",
  },
  {
    id: "orders",
    icon: <ShoppingBag size={18} />,
    label: "Orders",
    to: "/orders",
  },
  {
    id: "reservation",
    icon: <Users size={18} />,
    label: "Reservation",
    to: "/reservation",
  },
  {
    id: "messages",
    icon: <MessageSquare size={18} />,
    label: "Messages",
    to: "/messages",
  },
  {
    id: "calendar",
    icon: <Calendar size={18} />,
    label: "Calendar",
    to: "/calendar",
  },
  {
    id: "settings",
    icon: <Settings size={18} />,
    label: "Settings",
    to: "/settings",
  },
  {
    id: "help",
    icon: <HelpCircle size={18} />,
    label: "Help",
    to: "/help",
  },
  {
    id: "logout",
    icon: <LogOut size={18} />,
    label: "Logout",
    to: null, // No route for logout
    isSpecial: true,
  },
];

// Notifications array
const notificationsData = [
  {
    id: 1,
    title: "New Order Received",
    description: "You have received a new order #ORD-7892",
    time: "Just now",
    isNew: true,
  },
  {
    id: 2,
    title: "Product Update",
    description: "Inventory running low on SKU-3842",
    time: "1 hour ago",
    isNew: true,
  },
  {
    id: 3,
    title: "System Update",
    description: "System update scheduled for tonight 12 AM",
    time: "3 hours ago",
    isNew: false,
  },
  {
    id: 4,
    title: "New User Registration",
    description: "5 new users registered today",
    time: "5 hours ago",
    isNew: false,
  },
];

// User profile dropdown items array
const userProfileItems = [
  {
    id: "profile",
    label: "Your Profile",
    to: "/profile",
    isAction: false,
  },
  {
    id: "settings",
    label: "Settings",
    to: "/settings",
    isAction: false,
  },
  {
    id: "signout",
    label: "Sign out",
    to: null,
    isAction: true,
    action: "signout",
  },
];

export default function Header({ selectedTab, setSelectedTab }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (item) => {
    if (item.isSpecial) {
      // Handle special actions like logout
      console.log("Logout clicked");
      return;
    }
    toggleMobileMenu();
  };

  return (
    <div>
      <header className="bg-orange-50 shadow-sm pt-1">
        <div className=" mx-auto flex     px-4 sm:px-6 lg:px-8">
          <div className="flex w-full justify-between  items-center gap-4 h-16">
            <div className="flex">
              {/* Mobile menu button */}
              <div className="mr-2 flex items-center md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-orange-400   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-transform duration-1000"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <img className="h-10" src={logo} alt="logo" />
                <span className="ml-2 text-xl font-bold text-orange-400 hidden md:block">
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-400 focus:border-orange-500 sm:text-sm"
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
                  {formatDateWithFull(currentTime)}
                </span>
                <span className="text-xs text-orange-500">
                  {formatTime(currentTime)}
                </span>
              </div>

              {/* Notification dropdown */}
              <div className="relative ml-3 z-50">
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="p-1 text-gray-500 rounded-full hover:bg-gray-100 relative focus:ring-2 ring-orange-600"
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-orange-500 ring-2 ring-white"></span>
                </button>

                <div
                  className={`origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 ease-in-out transform ${
                    isNotificationOpen
                      ? "max-h-[500px] opacity-100 scale-y-100"
                      : "max-h-0 opacity-0 scale-y-0"
                  } `}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <div className="px-4 py-2 border-b">
                      <h3 className="text-sm text-orange-400 font-medium">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notificationsData.map((notification) => (
                        <NotificationItem
                          key={notification.id}
                          title={notification.title}
                          description={notification.description}
                          time={notification.time}
                          isNew={notification.isNew}
                        />
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t">
                      <Link
                        to="/notifications"
                        className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                      >
                        View all notifications
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center max-w-xs bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <User size={18} />
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                      Admin User
                    </span>
                    <ChevronDown
                      size={16}
                      className="ml-1 text-orange-400 hidden md:block"
                    />
                  </button>
                </div>

                <div
                  className={`origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 ease-in-out transform ${
                    isDropdownOpen
                      ? "max-h-[500px] opacity-100 scale-y-100"
                      : "max-h-0 opacity-0 scale-y-0"
                  } `}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {userProfileItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.to}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu - shown/hidden based on mobile menu state */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out transform ${
          isMobileMenuOpen
            ? "max-h-[1000px] opacity-100 scale-y-100"
            : "max-h-0 opacity-0 scale-y-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-md">
          {mobileNavItems.map((item) => (
            <MobileNavLink
              key={item.id}
              icon={item.icon}
              label={item.label}
              to={item.to}
              isActive={selectedTab === item.id}
              isSpecial={item.isSpecial}
              onClick={() => handleNavClick(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationItem({ title, description, time, isNew }) {
  return (
    <div
      className={`px-4 py-3 hover:bg-orange-50 ${isNew ? "bg-orange-100" : ""}`}
    >
      <div className="flex justify-between">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
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
        `}
    >
      <div
        className={`
          mr-3 ${
            isActive
              ? "text-gray-900"
              : "text-gray-400 group-hover:text-gray-500"
          }
        `}
      >
        {icon}
      </div>
      {label}
    </a>
  );
}
