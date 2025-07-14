import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Download, 
  RefreshCw, 
  Settings, 
  Eye, 
  Reply, 
  Trash2, 
  Star, 
  AlertTriangle,
  Phone,
  Mail,
  Calendar,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const CustomerMessages = () => {
  const [messages, setMessages] = useState([
    {
      _id: '1',
      name: 'John Smith',
      email: 'john@email.com',
      phone: '+1 234-567-8900',
      subject: 'Food Quality Complaint',
      message: 'The pasta was overcooked and...',
      status: 'pending',
      priority: 'high',
      createdAt: '2024-05-22T20:30:00Z',
      reply: null,
      repliedBy: null,
      repliedAt: null
    },
    {
      _id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '+1 234-567-8901',
      subject: 'Reservation Inquiry',
      message: 'I would like to make a reservation for...',
      status: 'replied',
      priority: 'medium',
      createdAt: '2024-05-22T19:15:00Z',
      reply: 'Thank you for your inquiry. We have availability...',
      repliedBy: { name: 'Admin', email: 'admin@restaurant.com' },
      repliedAt: '2024-05-22T19:30:00Z'
    },
    {
      _id: '3',
      name: 'Mike Davis',
      email: 'mike@email.com',
      phone: '+1 234-567-8902',
      subject: 'Compliment',
      message: 'Excellent food and service. Will definitely...',
      status: 'resolved',
      priority: 'low',
      createdAt: '2024-05-22T18:45:00Z',
      reply: 'Thank you so much for your kind words!',
      repliedBy: { name: 'Manager', email: 'manager@restaurant.com' },
      repliedAt: '2024-05-22T19:00:00Z'
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    type: 'all'
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 2,
    totalMessages: 12,
    itemsPerPage: 10
  });

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({ status: '', priority: '' });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-50';
      case 'replied': return 'text-blue-600 bg-blue-50';
      case 'resolved': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Star className="w-4 h-4 text-yellow-500" />;
      case 'low': return <Phone className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleReply = (message) => {
    setSelectedMessage(message);
    setShowReplyModal(true);
  };

  const handleView = (message) => {
    setSelectedMessage(message);
    setShowViewModal(true);
  };

  const handleUpdate = (message) => {
    setSelectedMessage(message);
    setUpdateData({ status: message.status, priority: message.priority });
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (message) => {
    setSelectedMessage(message);
    setShowDeleteModal(true);
  };

  const handleSubmitReply = () => {
    // Handle reply submission
    console.log('Reply submitted:', replyText);
    setShowReplyModal(false);
    setReplyText('');
    setSelectedMessage(null);
  };

  const handleConfirmDelete = () => {
    if (selectedMessage) {
      setMessages(messages.filter(msg => msg._id !== selectedMessage._id));
      setShowDeleteModal(false);
      setSelectedMessage(null);
    }
  };

  const handleUpdateSubmit = () => {
    if (selectedMessage) {
      setMessages(messages.map(msg => 
        msg._id === selectedMessage._id 
          ? { ...msg, status: updateData.status, priority: updateData.priority }
          : msg
      ));
      setShowUpdateModal(false);
      setSelectedMessage(null);
      setUpdateData({ status: '', priority: '' });
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         message.email.toLowerCase().includes(filters.search.toLowerCase()) ||
                         message.subject.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || message.status === filters.status;
    const matchesPriority = filters.priority === 'all' || message.priority === filters.priority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900">Customer Messages</h1>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
          </div>
          
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="replied">Replied</option>
            <option value="resolved">Resolved</option>
          </select>

          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.priority}
            onChange={(e) => setFilters({...filters, priority: e.target.value})}
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="all">All Types</option>
            <option value="complaint">Complaint</option>
            <option value="inquiry">Inquiry</option>
            <option value="compliment">Compliment</option>
          </select>

          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={pagination.itemsPerPage}
            onChange={(e) => setPagination({...pagination, itemsPerPage: parseInt(e.target.value)})}
          >
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Showing {filteredMessages.length} of {pagination.totalMessages} messages</span>
          <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
        </div>
      </div>

      {/* Messages Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Date
                  <Calendar className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMessages.map((message) => (
              <tr key={message._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getPriorityIcon(message.priority)}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                      {message.priority}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{message.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {message.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {message.phone}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{message.subject}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">{message.message}</div>
                  <div className="flex gap-1 mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      refund
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      quality
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                    {message.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(message.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleView(message)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                      title="View Message"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleReply(message)}
                      className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                      title="Reply"
                    >
                      <Reply className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleUpdate(message)}
                      className="text-yellow-600 hover:text-yellow-900 p-1 rounded hover:bg-yellow-50"
                      title="Update Status/Priority"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(message)}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">12</span> results
          </div>
          <div className="flex items-center gap-2">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Message Details</h3>
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Customer Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="text-sm text-gray-900">{selectedMessage.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-sm text-gray-900">{selectedMessage.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="text-sm text-gray-900">{selectedMessage.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedMessage.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Message Status */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Message Status</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Priority</label>
                      <div className="flex items-center gap-2 mt-1">
                        {getPriorityIcon(selectedMessage.priority)}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedMessage.priority)}`}>
                          {selectedMessage.priority}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedMessage.status)}`}>
                        {selectedMessage.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Subject</label>
                      <p className="text-sm text-gray-900">{selectedMessage.subject}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Message</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Reply Section */}
              {selectedMessage.reply && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Reply</h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-900">
                        {selectedMessage.repliedBy?.name || 'Admin'}
                      </span>
                      <span className="text-xs text-blue-700">
                        {selectedMessage.repliedAt && formatDate(selectedMessage.repliedAt)}
                      </span>
                    </div>
                    <p className="text-sm text-blue-800 whitespace-pre-wrap">{selectedMessage.reply}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setShowViewModal(false);
                  handleReply(selectedMessage);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Status/Priority Modal */}
      {showUpdateModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Update Message Status & Priority</h3>
              <p className="text-sm text-gray-600 mt-1">Customer: {selectedMessage.name}</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={updateData.status}
                    onChange={(e) => setUpdateData({...updateData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="replied">Replied</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={updateData.priority}
                    onChange={(e) => setUpdateData({...updateData, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 border border-transparent rounded-md hover:bg-yellow-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Message</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to delete this message from <strong>{selectedMessage.name}</strong>?
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Subject:</strong> {selectedMessage.subject}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Message:</strong> {selectedMessage.message.substring(0, 100)}...
                </p>
              </div>
              <p className="text-sm text-red-600 mt-3 font-medium">
                This action cannot be undone.
              </p>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
              >
                Delete Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Reply to {selectedMessage.name}</h3>
              <p className="text-sm text-gray-600 mt-1">Subject: {selectedMessage.subject}</p>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Original Message</label>
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                  {selectedMessage.message}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="6"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply here..."
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowReplyModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitReply}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerMessages;