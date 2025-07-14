import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, Trash2, ChevronLeft, ChevronRight, X, Check, UserPlus } from 'lucide-react';
import { allOrderAdmin, updateOrderAdmin } from '@/Redux/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '@/components/Layout/LoadingComponent';

const OrderTable = () => {
  // Sample data based on your Order schema
  const [orders, setOrders] = useState([
  ]);
  const{isLoading}=useSelector((state)=>state.order)




  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(3);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [selectedChef, setSelectedChef] = useState('');
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState('');

  const dispatch=useDispatch()
  console.log(newStatus)



  // Sample staff data - replace with actual data from your backend
  const [chefs, setChefs] = useState([
    { _id: '1', firstName: 'Mike', lastName: 'Johnson', role: 'Chef' },
    { _id: '2', firstName: 'Sarah', lastName: 'Wilson', role: 'Chef' },
    { _id: '3', firstName: 'David', lastName: 'Brown', role: 'Chef' }
  ]);

  const [deliveryPersons, setDeliveryPersons] = useState([
    { _id: '1', firstName: 'Tom', lastName: 'Davis', role: 'Delivery' },
    { _id: '2', firstName: 'Lisa', lastName: 'Garcia', role: 'Delivery' },
    { _id: '3', firstName: 'James', lastName: 'Miller', role: 'Delivery' }
  ]);

  const statuses = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered', 'Cancelled'];
  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Confirmed': 'bg-blue-100 text-blue-800',
    'Preparing': 'bg-orange-100 text-orange-800',
    'Ready': 'bg-green-100 text-green-800',
    'Out for Delivery': 'bg-purple-100 text-purple-800',
    'Delivered': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800'
  };

  const paymentStatusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Paid': 'bg-green-100 text-green-800',
    'Failed': 'bg-red-100 text-red-800',
    'Refunded': 'bg-gray-100 text-gray-800'
  };


  useEffect(()=>{
    dispatch(allOrderAdmin()).then((data)=>{
   
      setOrders(data.payload.data.orders)
    })
  },[])

  // Filter and search logic
  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, orders]);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    setSelectedOrders(
      selectedOrders.length === currentOrders.length 
        ? [] 
        : currentOrders.map(order => order._id)
    );
  };

  const handleDelete = (order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedOrder) {
      setOrders(prev => prev.filter(o => o._id !== selectedOrder._id));
      setSelectedOrders(prev => prev.filter(id => id !== selectedOrder._id));
    } else {
      setOrders(prev => prev.filter(o => !selectedOrders.includes(o._id)));
      setSelectedOrders([]);
    }
    setShowDeleteModal(false);
    setSelectedOrder(null);
  };

  const handleUpdateStatus = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setShowUpdateModal(true);
  };

  const confirmUpdateStatus = () => {
    const formData={
      status:newStatus
    }
    dispatch(updateOrderAdmin({formData,orderId:selectedOrder._id})).then((data)=>{
      console.log(data)
      if(data.payload.success){
        dispatch(allOrderAdmin()).then((data)=>{
   
          setOrders(data.payload.data.orders)
        })
      }

    })
   


    setShowUpdateModal(false);
    setSelectedOrder(null);
    setNewStatus('');
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const handleAssign = (order) => {
    setSelectedOrder(order);
    setSelectedChef(order.assignedTo?.chef?._id || '');
    setSelectedDeliveryPerson(order.assignedTo?.deliveryPerson?._id || '');
    setShowAssignModal(true);
  };

  const confirmAssign = async () => {
    if (!selectedOrder) return;

    try {
      // Here you would make the API call to your backend
      const response = await fetch(`/api/orders/${selectedOrder._id}/assign`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chefId: selectedChef || null,
          deliveryPersonId: selectedDeliveryPerson || null,
        }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        
        // Update the order in state
        setOrders(prev => prev.map(o => 
          o._id === selectedOrder._id 
            ? { 
                ...o, 
                assignedTo: {
                  chef: selectedChef ? chefs.find(c => c._id === selectedChef) : null,
                  deliveryPerson: selectedDeliveryPerson ? deliveryPersons.find(d => d._id === selectedDeliveryPerson) : null
                }
              }
            : o
        ));

        setShowAssignModal(false);
        setSelectedOrder(null);
        setSelectedChef('');
        setSelectedDeliveryPerson('');
      } else {
        console.error('Failed to assign order');
      }
    } catch (error) {
      console.error('Error assigning order:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600">Manage your restaurant orders and track deliveries</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
            <span>+</span> New Order
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="bg-blue-50 p-3 rounded-lg flex items-center justify-between">
            <span className="text-blue-700 font-medium">
              {selectedOrders.length} order{selectedOrders.length > 1 ? 's' : ''} selected
            </span>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
            >
              Delete Selected
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
      {isLoading ? <LoadingComponent />:(

        

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedOrders.length === currentOrders.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order._id)}
                    onChange={() => handleSelectOrder(order._id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                    <div className="text-sm text-gray-500 capitalize">{order.orderType}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{order.user?.fristName}</div>
                    <div className="text-sm text-gray-500">{order.user?.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.items[0]?.name}
                    {order.items.length > 1 && ` +${order.items.length - 1} more`}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900 capitalize">{order.paymentMethod}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${paymentStatusColors[order.paymentStatus]}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(order.totalAmount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleView(order)}
                      className="text-blue-600 hover:text-blue-900"
                      title="View Order"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(order)}
                      className="text-green-600 hover:text-green-900"
                      title="Update Status"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAssign(order)}
                      className="text-purple-600 hover:text-purple-900"
                      title="Assign Order"
                    >
                      <UserPlus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(order)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete Order"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to{' '}
              <span className="font-medium">{Math.min(indexOfLastOrder, filteredOrders.length)}</span> of{' '}
              <span className="font-medium">{filteredOrders.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === i + 1
                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {selectedOrder ? 'Delete Order' : 'Delete Selected Orders'}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete {selectedOrder ? 'this order' : `${selectedOrders.length} order(s)`}? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Update Order Status</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order: {selectedOrder?.orderNumber}
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpdateStatus}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Order Modal */}
      {showViewModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Order Information</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Order Number:</span> {selectedOrder.orderNumber}</div>
                  <div><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${statusColors[selectedOrder.status]}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div><span className="font-medium">Order Type:</span> {selectedOrder.orderType}</div>
                  <div><span className="font-medium">Created:</span> {formatDate(selectedOrder.createdAt)}</div>
                  <div><span className="font-medium">Estimated Delivery:</span> {formatDate(selectedOrder.estimatedDeliveryTime)}</div>
                  {selectedOrder.actualDeliveryTime && (
                    <div><span className="font-medium">Actual Delivery:</span> {formatDate(selectedOrder.actualDeliveryTime)}</div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Customer Information</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Name:</span> {selectedOrder.user?.firstName}</div>
                  <div><span className="font-medium">Email:</span> {selectedOrder.user?.email}</div>
                  <div><span className="font-medium">Payment Method:</span> {selectedOrder.paymentMethod}</div>
                  <div><span className="font-medium">Payment Status:</span> 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${paymentStatusColors[selectedOrder.paymentStatus]}`}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{formatCurrency(item.price)}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{formatCurrency(item.totalPrice)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center text-sm">
                <div className="space-y-1">
                  <div className="flex justify-between"><span>Subtotal:</span> <span>{formatCurrency(selectedOrder.subtotal)}</span></div>
                  <div className="flex justify-between"><span>Delivery Fee:</span> <span>{formatCurrency(selectedOrder.deliveryFee)}</span></div>
                  <div className="flex justify-between"><span>Tax:</span> <span>{formatCurrency(selectedOrder.tax)}</span></div>
                </div>
              </div>
              <div className="flex justify-between items-center font-medium text-lg mt-2 pt-2 border-t">
                <span>Total:</span>
                <span>{formatCurrency(selectedOrder.totalAmount)}</span>
              </div>
            </div>

            {selectedOrder.assignedTo && (
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium text-gray-900 mb-3">Assignment</h4>
                <div className="space-y-2 text-sm">
                  {selectedOrder.assignedTo.chef && (
                    <div><span className="font-medium">Chef:</span> {selectedOrder.assignedTo.chef.name}</div>
                  )}
                  {selectedOrder.assignedTo.deliveryPerson && (
                    <div><span className="font-medium">Delivery Person:</span> {selectedOrder.assignedTo.deliveryPerson.name}</div>
                  )}
                </div>
              </div>
            )}

            {selectedOrder.rating && (
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium text-gray-900 mb-3">Customer Rating</h4>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-sm text-gray-600">{selectedOrder.rating}/5</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Assign Order Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Assign Order</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order: {selectedOrder?.orderNumber}
              </label>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Chef
              </label>
              <select
                value={selectedChef}
                onChange={(e) => setSelectedChef(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Chef</option>
                {chefs.map(chef => (
                  <option key={chef._id} value={chef._id}>
                    {chef.firstName} {chef.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Delivery Person
              </label>
              <select
                value={selectedDeliveryPerson}
                onChange={(e) => setSelectedDeliveryPerson(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Delivery Person</option>
                {deliveryPersons.map(person => (
                  <option key={person._id} value={person._id}>
                    {person.firstName} {person.lastName}
                  </option>
                ))}
              </select>
            </div>

            {/* Current Assignments */}
            {selectedOrder?.assignedTo && (
              <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Current Assignments:</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  {selectedOrder.assignedTo.chef && (
                    <div>Chef: {selectedOrder.assignedTo.chef.name}</div>
                  )}
                  {selectedOrder.assignedTo.deliveryPerson && (
                    <div>Delivery: {selectedOrder.assignedTo.deliveryPerson.name}</div>
                  )}
                  {!selectedOrder.assignedTo.chef && !selectedOrder.assignedTo.deliveryPerson && (
                    <div>No current assignments</div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmAssign}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700"
              >
                Assign Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;