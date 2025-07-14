import React, { useState, useMemo } from 'react';
import { Search, Filter, Eye, Edit, Trash2, Clock, CheckCircle, XCircle, AlertCircle, ChevronLeft, ChevronRight, X, Save, Plus } from 'lucide-react';

const OrderTable = () => {
  // Sample order data
  const [orders, setOrders] = useState([
    { id: 'ORD-001', customer: 'John Doe', items: 'Burger, Fries, Coke', total: 24.50, status: 'pending', time: '2:30 PM', table: 'T-05', phone: '+1234567890', notes: 'No onions please' },
    { id: 'ORD-002', customer: 'Sarah Wilson', items: 'Pizza Margherita, Salad', total: 32.00, status: 'preparing', time: '2:15 PM', table: 'T-02', phone: '+1234567891', notes: 'Extra cheese' },
    { id: 'ORD-003', customer: 'Mike Johnson', items: 'Pasta, Garlic Bread', total: 18.75, status: 'ready', time: '1:45 PM', table: 'T-08', phone: '+1234567892', notes: '' },
    { id: 'ORD-004', customer: 'Emily Davis', items: 'Steak, Mashed Potatoes', total: 45.00, status: 'delivered', time: '1:20 PM', table: 'T-12', phone: '+1234567893', notes: 'Medium rare' },
    { id: 'ORD-005', customer: 'Alex Brown', items: 'Chicken Wings, Beer', total: 28.50, status: 'cancelled', time: '12:55 PM', table: 'T-03', phone: '+1234567894', notes: 'Customer cancelled' },
    { id: 'ORD-006', customer: 'Lisa Garcia', items: 'Fish & Chips, Lemonade', total: 22.25, status: 'pending', time: '2:40 PM', table: 'T-07', phone: '+1234567895', notes: 'Takeaway' },
    { id: 'ORD-007', customer: 'David Miller', items: 'Caesar Salad, Soup', total: 16.00, status: 'preparing', time: '2:25 PM', table: 'T-01', phone: '+1234567896', notes: 'Vegetarian' },
    { id: 'ORD-008', customer: 'Emma Thompson', items: 'Tacos, Nachos, Margarita', total: 35.75, status: 'ready', time: '2:10 PM', table: 'T-06', phone: '+1234567897', notes: 'Spicy' },
    { id: 'ORD-009', customer: 'Robert Lee', items: 'Sushi Platter, Miso Soup', total: 42.00, status: 'pending', time: '3:00 PM', table: 'T-09', phone: '+1234567898', notes: 'No wasabi' },
    { id: 'ORD-010', customer: 'Anna White', items: 'Grilled Salmon, Rice', total: 29.50, status: 'preparing', time: '2:50 PM', table: 'T-11', phone: '+1234567899', notes: 'Lemon on side' },
    { id: 'ORD-011', customer: 'Tom Green', items: 'BBQ Ribs, Coleslaw', total: 38.25, status: 'ready', time: '2:35 PM', table: 'T-04', phone: '+1234567800', notes: 'Extra sauce' },
    { id: 'ORD-012', customer: 'Maria Lopez', items: 'Vegetable Curry, Naan', total: 21.75, status: 'delivered', time: '2:00 PM', table: 'T-10', phone: '+1234567801', notes: 'Mild spice' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('time');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  // Modal states
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [editForm, setEditForm] = useState({});

  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    preparing: { color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
    ready: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
    delivered: { color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
    cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const deleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
    setDeleteModal(null);
  };

  const editOrder = (orderId, updatedOrder) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, ...updatedOrder } : order
    ));
    setEditModal(null);
    setEditForm({});
  };

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.items.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'total') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [orders, searchTerm, statusFilter, sortBy, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredAndSortedOrders.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Modal Components
  const ViewModal = ({ order, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Order ID</label>
              <p className="text-gray-900 font-medium">{order.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusConfig[order.status]?.color}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Customer</label>
            <p className="text-gray-900 font-medium">{order.customer}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Phone</label>
            <p className="text-gray-900">{order.phone}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Table</label>
              <p className="text-gray-900">{order.table}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Time</label>
              <p className="text-gray-900">{order.time}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Items</label>
            <p className="text-gray-900">{order.items}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Total</label>
            <p className="text-gray-900 font-bold text-lg">${order.total.toFixed(2)}</p>
          </div>
          {order.notes && (
            <div>
              <label className="text-sm font-medium text-gray-500">Notes</label>
              <p className="text-gray-900">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const EditModal = ({ order, onClose, onSave }) => {
    const [form, setForm] = useState(order);

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(order.id, form);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Edit Order</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  value={form.customer}
                  onChange={(e) => setForm({...form, customer: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({...form, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Items</label>
              <textarea
                value={form.items}
                onChange={(e) => setForm({...form, items: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Table</label>
                <input
                  type="text"
                  value={form.table}
                  onChange={(e) => setForm({...form, table: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.total}
                  onChange={(e) => setForm({...form, total: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({...form, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={form.notes || ''}
                onChange={(e) => setForm({...form, notes: e.target.value})}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any special instructions..."
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const DeleteModal = ({ order, onClose, onConfirm }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Order</h3>
              <p className="text-gray-600">Are you sure you want to delete order {order.id}?</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(order.id)}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
          <p className="text-gray-600">Manage and track all restaurant orders in real-time</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {Object.entries(
            orders.reduce((acc, order) => {
              acc[order.status] = (acc[order.status] || 0) + 1;
              return acc;
            }, {})
          ).map(([status, count]) => {
            const StatusIcon = statusConfig[status]?.icon || Clock;
            return (
              <div key={status} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 capitalize">{status}</p>
                    <p className="text-2xl font-bold text-gray-900">{count}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${statusConfig[status]?.color || 'bg-gray-100 text-gray-800'}`}>
                    <StatusIcon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-center flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search orders, customers, or items..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                >
                  <option value="time-desc">Latest First</option>
                  <option value="time-asc">Oldest First</option>
                  <option value="total-desc">Highest Amount</option>
                  <option value="total-asc">Lowest Amount</option>
                  <option value="customer-asc">Customer A-Z</option>
                  <option value="customer-desc">Customer Z-A</option>
                </select>

                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Table</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status]?.icon || Clock;
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{order.customer}</div>
                          <div className="text-sm text-gray-500">{order.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate" title={order.items}>
                          {order.items}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {order.table}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-semibold text-gray-900">${order.total.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize border-0 focus:ring-2 focus:ring-blue-500 ${statusConfig[order.status]?.color || 'bg-gray-100 text-gray-800'}`}
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready">Ready</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setViewModal(order)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => setEditModal(order)}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit Order"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => setDeleteModal(order)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Order"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {currentOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredAndSortedOrders.length)} of {filteredAndSortedOrders.length} orders
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        currentPage === pageNumber
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
          <div>
            Total Orders: {orders.length} | Filtered: {filteredAndSortedOrders.length}
          </div>
          <div>
            Total Revenue: ${orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.total, 0).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Modals */}
      {viewModal && (
        <ViewModal order={viewModal} onClose={() => setViewModal(null)} />
      )}
      
      {editModal && (
        <EditModal 
          order={editModal} 
          onClose={() => setEditModal(null)} 
          onSave={editOrder}
        />
      )}
      
      {deleteModal && (
        <DeleteModal 
          order={deleteModal} 
          onClose={() => setDeleteModal(null)} 
          onConfirm={deleteOrder}
        />
      )}
    </div>
  );
};

export default OrderTable;