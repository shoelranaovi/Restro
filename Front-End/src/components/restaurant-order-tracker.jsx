import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, Truck, ChefHat, Package, MapPin, Phone, Star, RefreshCw, Sparkles, Flame } from 'lucide-react';

const OrderTracker = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(true);

  // Mock order data - in real app this would come from API
  const [orderData] = useState({
    orderId: "ORD-2024-0892",
    status: "preparing",
    estimatedTime: "25-30 mins",
    placedAt: "2:45 PM",
    restaurant: {
      name: "Bella Vista Kitchen",
      phone: "+1 (555) 123-4567",
      rating: 4.8,
      address: "123 Main Street, Downtown"
    },
    driver: {
      name: "Sarah Johnson",
      phone: "+1 (555) 987-6543",
      rating: 4.9,
      vehicle: "Honda Civic - ABC 123"
    },
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 18.99 },
      { name: "Caesar Salad", quantity: 2, price: 12.99 },
      { name: "Garlic Bread", quantity: 1, price: 6.99 }
    ],
    total: 52.96,
    timeline: [
      { status: "confirmed", time: "2:45 PM", completed: true },
      { status: "preparing", time: "2:50 PM", completed: true },
      { status: "ready", time: "3:10 PM", completed: false },
      { status: "picked_up", time: "3:15 PM", completed: false },
      { status: "delivered", time: "3:25 PM", completed: false }
    ]
  });

  const statusConfig = {
    confirmed: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-100", label: "Order Confirmed", gradient: "from-green-400 to-emerald-500" },
    preparing: { icon: ChefHat, color: "text-orange-500", bg: "bg-orange-100", label: "Preparing", gradient: "from-orange-400 to-red-500" },
    ready: { icon: Package, color: "text-blue-500", bg: "bg-blue-100", label: "Ready for Pickup", gradient: "from-blue-400 to-cyan-500" },
    picked_up: { icon: Truck, color: "text-purple-500", bg: "bg-purple-100", label: "Out for Delivery", gradient: "from-purple-400 to-pink-500" },
    delivered: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-100", label: "Delivered", gradient: "from-green-400 to-emerald-500" }
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const pulseTimer = setInterval(() => {
      setPulseAnimation(prev => !prev);
    }, 2000);
    return () => clearInterval(pulseTimer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getCurrentStatusIndex = () => {
    return orderData.timeline.findIndex(item => item.status === orderData.status);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-300/30 to-red-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-300/30 to-orange-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-orange-200/20 to-red-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-xl shadow-2xl border-b border-orange-200/50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg blur opacity-25"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                    Track Your Order
                  </h1>
                </div>
                <p className="text-orange-700/80 font-medium">Order #{orderData.orderId}</p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 disabled:opacity-50 self-start sm:self-auto shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <RefreshCw className={`relative w-5 h-5 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
              <span className="relative font-semibold">Refresh Status</span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Status Card */}
            <div className="group relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200/50 overflow-hidden hover:shadow-3xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5"></div>
              
              <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-8 text-white">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Flame className="w-6 h-6 animate-pulse" />
                      <h2 className="text-2xl font-bold">Current Status</h2>
                    </div>
                    <p className="text-orange-100 text-lg">Estimated delivery: {orderData.estimatedTime}</p>
                  </div>
                  <div className="text-right bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <div className="text-sm text-orange-100">Placed at</div>
                    <div className="text-xl font-bold">{orderData.placedAt}</div>
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="relative p-8">
                <div className="relative">
                  {orderData.timeline.map((step, index) => {
                    const StatusIcon = statusConfig[step.status].icon;
                    const isActive = index <= getCurrentStatusIndex();
                    const isCurrent = index === getCurrentStatusIndex();
                    
                    return (
                      <div key={step.status} className="relative flex items-center mb-10 last:mb-0">
                        {/* Connection Line */}
                        {index < orderData.timeline.length - 1 && (
                          <div className={`absolute left-7 top-16 w-1 h-20 rounded-full transition-all duration-1000 ${
                            isActive 
                              ? `bg-gradient-to-b ${statusConfig[step.status].gradient} shadow-lg` 
                              : 'bg-orange-200'
                          }`} />
                        )}
                        
                        {/* Status Icon */}
                        <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 transform ${
                          isActive 
                            ? `bg-gradient-to-br ${statusConfig[step.status].gradient} text-white shadow-2xl scale-110` 
                            : 'bg-orange-100 text-orange-300 shadow-md'
                        } ${isCurrent ? `ring-4 ring-orange-300/50 ${pulseAnimation ? 'animate-pulse' : ''}` : ''}`}>
                          <StatusIcon className="w-6 h-6" />
                          {isCurrent && (
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur opacity-50 animate-pulse"></div>
                          )}
                        </div>
                        
                        {/* Status Info */}
                        <div className="ml-8 flex-1">
                          <div className={`text-lg font-bold transition-colors ${
                            isActive ? 'bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent' : 'text-orange-400'
                          }`}>
                            {statusConfig[step.status].label}
                          </div>
                          <div className={`text-sm mt-1 transition-colors ${
                            isActive ? 'text-orange-700' : 'text-orange-400'
                          }`}>
                            {step.completed ? `✨ Completed at ${step.time}` : `⏱️ Expected at ${step.time}`}
                          </div>
                        </div>

                        {isCurrent && (
                          <div className="ml-6">
                            <span className="px-4 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-sm font-bold rounded-full shadow-lg animate-pulse">
                              🔥 In Progress
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200/50 p-8 hover:shadow-3xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/50 rounded-3xl"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl shadow-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Order Details</h3>
                </div>
                <div className="space-y-6">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="group flex justify-between items-center py-4 px-6 bg-gradient-to-r from-orange-50/50 to-red-50/50 rounded-2xl border border-orange-200/30 hover:shadow-lg transition-all duration-300">
                      <div className="flex-1">
                        <div className="font-bold text-orange-900 text-lg group-hover:text-orange-700 transition-colors">{item.name}</div>
                        <div className="text-orange-600 font-medium">Quantity: {item.quantity}</div>
                      </div>
                      <div className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">${item.price}</div>
                    </div>
                  ))}
                  <div className="pt-6 border-t-2 border-gradient-to-r from-orange-300 to-red-300">
                    <div className="flex justify-between items-center p-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white shadow-xl">
                      <span className="text-2xl font-bold">Total Amount</span>
                      <span className="text-3xl font-black">${orderData.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Restaurant Info */}
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200/50 p-6 hover:shadow-3xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-red-50/30 rounded-3xl"></div>
              <div className="relative">
                <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">Restaurant</h3>
                <div className="space-y-6">
                  <div>
                    <div className="font-bold text-orange-900 text-lg">{orderData.restaurant.name}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current drop-shadow-sm" />
                      <span className="font-semibold text-orange-700">{orderData.restaurant.rating}</span>
                      <span className="text-orange-600">★★★★★</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-orange-50/50 rounded-xl">
                    <MapPin className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div className="text-orange-700 font-medium">{orderData.restaurant.address}</div>
                  </div>
                  
                  <a 
                    href={`tel:${orderData.restaurant.phone}`}
                    className="group flex items-center gap-3 p-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl hover:from-orange-500 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Phone className="w-5 h-5 text-white group-hover:animate-pulse" />
                    <span className="font-bold text-white">{orderData.restaurant.phone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Driver Info - Only show if order is being delivered */}
            {getCurrentStatusIndex() >= 3 && (
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200/50 p-6 hover:shadow-3xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30 rounded-3xl"></div>
                <div className="relative">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">Your Driver</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="font-bold text-green-900 text-lg">{orderData.driver.name}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-current drop-shadow-sm" />
                        <span className="font-semibold text-green-700">{orderData.driver.rating}</span>
                        <span className="text-green-600">★★★★★</span>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-green-50/50 rounded-xl">
                      <div className="text-green-700 font-medium">{orderData.driver.vehicle}</div>
                    </div>
                    
                    <a 
                      href={`tel:${orderData.driver.phone}`}
                      className="group flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Phone className="w-5 h-5 text-white group-hover:animate-pulse" />
                      <span className="font-bold text-white">Call Driver</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Live Time */}
            <div className="relative bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-white overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                    <Clock className="w-6 h-6 animate-pulse" />
                  </div>
                  <span className="font-bold text-xl">Live Time</span>
                </div>
                <div className="text-4xl font-black mb-2 drop-shadow-lg">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="text-orange-100 font-medium">
                  {currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-16 relative bg-gradient-to-r from-orange-100 via-red-100 to-pink-100 rounded-3xl p-10 border-2 border-orange-200/50 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/50"></div>
          <div className="relative text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">Need Help?</h3>
            </div>
            <p className="text-orange-800 text-lg mb-8 max-w-2xl mx-auto font-medium">
              If you have any questions about your order, don't hesitate to contact us. We're here to make your experience amazing! 🌟
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <span className="relative">💬 Contact Support</span>
              </button>
              <button className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-orange-700 rounded-2xl hover:bg-white transition-all duration-300 font-bold text-lg border-2 border-orange-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                <span className="group-hover:text-orange-600 transition-colors">🚨 Report Issue</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;