import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Clock, Package, Truck, CheckCircle, XCircle, RotateCcw, Phone, MapPin, Calendar, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

const MyOrdersPage = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5);

  // Sample order data
  const orderHistory = [
    {
      id: 'ORD-2024-001',
      date: '2024-05-24',
      time: '14:30',
      status: 'delivered',
      total: 45.97,
      items: [
        {
          id: 1,
          name: "Truffle Mushroom Risotto",
          price: 28.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop"
        },
        {
          id: 2,
          name: "Chocolate Lava Cake",
          price: 12.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop"
        }
      ],
      restaurant: "Bella Vista",
      deliveryAddress: "123 Main St, Downtown",
      estimatedTime: "25-35 min",
      actualTime: "28 min",
      rating: 5,
      trackingSteps: [
        { status: 'confirmed', time: '14:32', completed: true },
        { status: 'preparing', time: '14:45', completed: true },
        { status: 'ready', time: '15:10', completed: true },
        { status: 'picked_up', time: '15:15', completed: true },
        { status: 'delivered', time: '15:28', completed: true }
      ]
    },
    {
      id: 'ORD-2024-002',
      date: '2024-05-23',
      time: '19:15',
      status: 'preparing',
      total: 62.48,
      items: [
        {
          id: 3,
          name: "Grilled Salmon Teriyaki",
          price: 32.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop"
        },
        {
          id: 4,
          name: "Caesar Salad",
          price: 14.99,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop"
        }
      ],
      restaurant: "Bella Vista",
      deliveryAddress: "123 Main St, Downtown",
      estimatedTime: "30-40 min",
      rating: null,
      trackingSteps: [
        { status: 'confirmed', time: '19:17', completed: true },
        { status: 'preparing', time: '19:25', completed: true },
        { status: 'ready', time: '', completed: false },
        { status: 'picked_up', time: '', completed: false },
        { status: 'delivered', time: '', completed: false }
      ]
    },
    {
      id: 'ORD-2024-003',
      date: '2024-05-22',
      time: '12:45',
      status: 'cancelled',
      total: 23.98,
      items: [
        {
          id: 5,
          name: "Margherita Pizza",
          price: 18.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop"
        }
      ],
      restaurant: "Bella Vista",
      deliveryAddress: "123 Main St, Downtown",
      estimatedTime: "20-30 min",
      rating: null,
      cancelReason: "Restaurant unavailable"
    },
    {
      id: 'ORD-2024-004',
      date: '2024-05-21',
      time: '18:20',
      status: 'delivered',
      total: 34.97,
      items: [
        {
          id: 6,
          name: "Craft Beer Flight",
          price: 16.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1558642891-54be180ea339?w=400&h=300&fit=crop"
        },
        {
          id: 7,
          name: "Caesar Salad",
          price: 14.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop"
        }
      ],
      restaurant: "Bella Vista",
      deliveryAddress: "123 Main St, Downtown",
      estimatedTime: "25-35 min",
      actualTime: "31 min",
      rating: 4
    },
    {
      id: 'ORD-2024-005',
      date: '2024-05-20',
      time: '13:15',
      status: 'delivered',
      total: 89.47,
      items: [
        {
          id: 8,
          name: "Wagyu Beef Steak",
          price: 65.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop"
        },
        {
          id: 9,
          name: "Truffle Fries",
          price: 18.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop"
        }
      ],
      restaurant: "Prime Steakhouse",
      deliveryAddress: "123 Main St, Downtown",
      estimatedTime: "35-45 min",
      actualTime: "38 min",
      rating: 5
    },
    {
      id: 'ORD-2024-006',
      date: '2024-05-19',
      time: '20:30',
      status: 'delivered',
      total: 27.96,
      items: [
        {
          id: 10,
          name: "Chicken Tikka Masala",
          price: 19.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
        },
        {
          id: 11,
          name: "Garlic Naan",
          price: 4.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop"
        }
      ],
      restaurant: "Spice Garden",
      deliveryAddress: "123 Main St, Downtown",
      estimatedTime: "25-35 min",
      actualTime: "29 min",
      rating: 4
    }
  ];

  const statusConfig = {
    confirmed: { color: 'bg-blue-500', text: 'Order Confirmed', icon: CheckCircle },
    preparing: { color: 'bg-orange-500', text: 'Preparing', icon: Package },
    ready: { color: 'bg-purple-500', text: 'Ready for Pickup', icon: Clock },
    picked_up: { color: 'bg-indigo-500', text: 'Out for Delivery', icon: Truck },
    delivered: { color: 'bg-green-500', text: 'Delivered', icon: CheckCircle },
    cancelled: { color: 'bg-red-500', text: 'Cancelled', icon: XCircle }
  };

  const filterTabs = [
    { id: 'all', name: 'All Orders', count: orderHistory.length },
    { id: 'preparing', name: 'Active', count: orderHistory.filter(o => ['confirmed', 'preparing', 'ready', 'picked_up'].includes(o.status)).length },
    { id: 'delivered', name: 'Delivered', count: orderHistory.filter(o => o.status === 'delivered').length },
    { id: 'cancelled', name: 'Cancelled', count: orderHistory.filter(o => o.status === 'cancelled').length }
  ];

  // Filter and sort orders
  const filteredOrders = orderHistory
    .filter(order => {
      const matchesStatus = selectedStatus === 'all' || 
        (selectedStatus === 'preparing' && ['confirmed', 'preparing', 'ready', 'picked_up'].includes(order.status)) ||
        order.status === selectedStatus;
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'oldest': return new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time);
        case 'amount-high': return b.total - a.total;
        case 'amount-low': return a.total - b.total;
        default: return new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time);
      }
    });

  // Pagination calculations
  const totalOrders = filteredOrders.length;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus, searchTerm, sortBy]);

  const reorderItems = (order) => {
    // Simulate reorder functionality
    alert(`Reordering ${order.items.length} items from order ${order.id}`);
  };

  const trackOrder = (order) => {
    setExpandedOrder(expandedOrder === order.id ? null : order.id);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const renderRating = (rating) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-sm text-slate-600 ml-1">{rating}/5</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                My Orders
              </h1>
              <span className="hidden sm:block text-sm text-slate-500 font-medium">Order History & Tracking</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders, restaurants, or items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/80 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/80 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="amount-high">Highest Amount</option>
              <option value="amount-low">Lowest Amount</option>
            </select>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedStatus === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white/70 text-slate-600 hover:bg-white hover:shadow-md'
                }`}
              >
                <span>{tab.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedStatus === tab.id ? 'bg-white/20' : 'bg-slate-200'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {/* Results Summary */}
          {totalOrders > 0 && (
            <div className="flex items-center justify-between text-sm text-slate-600 bg-white/70 backdrop-blur-sm rounded-xl px-4 py-3 shadow-md border border-white/20">
              <span>
                Showing {startIndex + 1}-{Math.min(endIndex, totalOrders)} of {totalOrders} orders
              </span>
              <div className="flex items-center gap-2">
                <span>Show:</span>
                <select
                  value={ordersPerPage}
                  onChange={(e) => {
                    setOrdersPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-2 py-1 bg-white rounded border border-slate-200 text-sm"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                </select>
              </div>
            </div>
          )}

          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No orders found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              {currentOrders.map((order) => {
                const StatusIcon = statusConfig[order.status]?.icon || Package;
                const isExpanded = expandedOrder === order.id;
                
                return (
                  <div
                    key={order.id}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Order Header */}
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 ${statusConfig[order.status]?.color} rounded-lg`}>
                            <StatusIcon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-slate-800">Order #{order.id.split('-')[2]}</h3>
                            <p className="text-slate-600 text-sm">{order.restaurant}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-bold text-lg text-slate-800">${order.total.toFixed(2)}</p>
                            <p className="text-sm text-slate-500">{formatDate(order.date)} at {order.time}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${statusConfig[order.status]?.color}`}>
                            {statusConfig[order.status]?.text}
                          </span>
                        </div>
                      </div>

                      {/* Order Items Preview */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex -space-x-2 overflow-hidden">
                          {order.items.slice(0, 3).map((item, index) => (
                            <img
                              key={item.id}
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded-full border-2 border-white object-cover"
                            />
                          ))}
                          {order.items.length > 3 && (
                            <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-600">
                            {order.items.slice(0, 2).map(item => item.name).join(', ')}
                            {order.items.length > 2 && ` and ${order.items.length - 2} more items`}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => reorderItems(order)}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Reorder
                        </button>
                        
                        {['confirmed', 'preparing', 'ready', 'picked_up'].includes(order.status) && (
                          <button
                            onClick={() => trackOrder(order)}
                            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-lg border border-slate-200 transition-all duration-300"
                          >
                            <Package className="w-4 h-4" />
                            Track Order
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        )}
                        
                        {order.rating && (
                          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-lg">
                            {renderRating(order.rating)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expanded Order Details */}
                    {isExpanded && (
                      <div className="border-t border-slate-200 bg-slate-50/50 p-6">
                        {/* Tracking Steps */}
                        {order.trackingSteps && (
                          <div className="mb-6">
                            <h4 className="font-semibold text-slate-800 mb-4">Order Tracking</h4>
                            <div className="space-y-3">
                              {order.trackingSteps.map((step, index) => (
                                <div key={step.status} className="flex items-center gap-3">
                                  <div className={`w-3 h-3 rounded-full ${step.completed ? 'bg-green-500' : 'bg-slate-300'}`} />
                                  <div className="flex-1">
                                    <p className={`text-sm font-medium ${step.completed ? 'text-slate-800' : 'text-slate-500'}`}>
                                      {statusConfig[step.status]?.text}
                                    </p>
                                    {step.time && (
                                      <p className="text-xs text-slate-500">{step.time}</p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Detailed Items */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-slate-800 mb-3">Order Details</h4>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center justify-between py-2">
                                <div className="flex items-center gap-3">
                                  <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover" />
                                  <span className="text-sm text-slate-700">{item.name}</span>
                                  <span className="text-xs text-slate-500">x{item.quantity}</span>
                                </div>
                                <span className="text-sm font-medium text-slate-800">${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Delivery Info */}
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin className="w-4 h-4" />
                          <span>Delivered to: {order.deliveryAddress}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      currentPage === 1
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-white hover:bg-slate-50 text-slate-700 shadow-md hover:shadow-lg border border-slate-200'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      const isCurrentPage = pageNum === currentPage;
                      
                      // Show first page, last page, current page, and pages around current
                      const shouldShow = pageNum === 1 || 
                                       pageNum === totalPages || 
                                       Math.abs(pageNum - currentPage) <= 1;
                      
                      if (!shouldShow) {
                        // Show ellipsis
                        if (pageNum === 2 && currentPage > 4) {
                          return <span key={pageNum} className="px-2 py-2 text-slate-400">...</span>;
                        }
                        if (pageNum === totalPages - 1 && currentPage < totalPages - 3) {
                          return <span key={pageNum} className="px-2 py-2 text-slate-400">...</span>;
                        }
                        return null;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                            isCurrentPage
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                              : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:shadow-md'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      currentPage === totalPages
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-white hover:bg-slate-50 text-slate-700 shadow-md hover:shadow-lg border border-slate-200'
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;