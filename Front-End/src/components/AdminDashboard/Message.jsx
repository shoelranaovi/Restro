import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Eye, Trash2, MessageCircle, Clock, User, Phone, Mail, 
  ChevronDown, ChevronUp, Download, RefreshCw, Archive, Reply, 
  CheckSquare, Square, Star, AlertTriangle, Calendar, Tag,
  X, Send, FileText, Settings, MoreVertical, ChevronLeft, ChevronRight,
  Settings2
} from 'lucide-react';
import { useSelector } from 'react-redux';

const MessageTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage, setMessagesPerPage] = useState(10);
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({ status: '', priority: '' });

  // // Sample message data (expanded)



  const {connects:messages}=useSelector((state)=>state.contacts)


  

  // Auto-refresh functionality
  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        console.log('Auto-refreshing messages...');
      }, 30000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, priorityFilter, typeFilter, messagesPerPage]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'complaint': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'inquiry': return <Phone className="w-4 h-4 text-blue-500" />;
      case 'feedback': return <User className="w-4 h-4 text-green-500" />;
      case 'business': return <Mail className="w-4 h-4 text-purple-500" />;
      case 'suggestion': return <MessageCircle className="w-4 h-4 text-orange-500" />;
      default: return <MessageCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (diffDays === 2) return 'Yesterday ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedMessages = [...messages].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'timestamp') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const filteredMessages = sortedMessages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter;
    const matchesType = typeFilter === 'all' || message.type === typeFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesType;
  });

  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);
  const startIndex = (currentPage - 1) * messagesPerPage;
  const endIndex = Math.min(startIndex + messagesPerPage, filteredMessages.length);
  const currentMessages = filteredMessages.slice(startIndex, endIndex);

  const handleSelectAll = () => {
    if (selectedMessages.length === currentMessages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(currentMessages.map(msg => msg.id));
    }
  };

  const handleSelectMessage = (messageId) => {
    setSelectedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const handleBulkAction = (action) => {
    setMessages(prev => prev.map(msg => {
      if (selectedMessages.includes(msg.id)) {
        switch (action) {
          case 'mark-read':
            return { ...msg, status: 'read' };
          case 'mark-unread':
            return { ...msg, status: 'unread' };
          case 'archive':
            return { ...msg, status: 'archived' };
          case 'star':
            return { ...msg, isStarred: true };
          case 'unstar':
            return { ...msg, isStarred: false };
          default:
            return msg;
        }
      }
      return msg;
    }));
    setSelectedMessages([]);
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedMessages.length} message(s)?`)) {
      setMessages(prev => prev.filter(msg => !selectedMessages.includes(msg.id)));
      setSelectedMessages([]);
    }
  };

  const handleUpdate = (message) => {
    setSelectedMessage(message);
    setUpdateData({ status: message.status, priority: message.priority });
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = () => {
    if (selectedMessage) {
      // setMessages(messages.map(msg => 
      //   msg._id === selectedMessage._id 
      //     ? { ...msg, status: updateData.status, priority: updateData.priority }
      //     : msg
      // ));
      setShowUpdateModal(false);
      setSelectedMessage(null);
      setUpdateData({ status: '', priority: '' });
    }
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
    setMessages(prev => prev.map(msg => 
      msg.id === message.id ? { ...msg, status: 'read' } : msg
    ));
  };

  const handleReply = (message) => {
    setSelectedMessage(message);
    setShowReplyModal(true);
    setReplyText('');
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      setMessages(prev => prev.map(msg => 
        msg.id === selectedMessage.id ? { ...msg, status: 'replied' } : msg
      ));
      setShowReplyModal(false);
      setReplyText('');
      alert('Reply sent successfully!');
    }
  };

  const toggleStar = (messageId) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
    ));
  };

  const exportMessages = () => {
    const csvContent = [
      ['Date', 'Customer', 'Email', 'Subject', 'Status', 'Priority', 'Type'],
      ...filteredMessages.map(msg => [
        formatTimestamp(msg.timestamp),
        msg.name,
        msg.email,
        msg.subject,
        msg.status,
        msg.priority,
        msg.type
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'messages.csv';
    a.click();
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  // Generate pagination numbers with ellipsis
  const getPaginationNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots.filter((item, index, arr) => arr.indexOf(item) === index);
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="flex items-center gap-4 mb-4 lg:mb-0">
          <h2 className="text-2xl font-bold text-gray-900">Customer Messages</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.location.reload()}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`p-2 rounded-lg ${autoRefresh ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}
              title="Auto Refresh"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={exportMessages}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters and Per Page Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search messages..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="archived">Archived</option>
        </select>

        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="complaint">Complaints</option>
          <option value="inquiry">Inquiries</option>
          <option value="feedback">Feedback</option>
          <option value="business">Business</option>
          <option value="suggestion">Suggestions</option>
        </select>

        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={messagesPerPage}
          onChange={(e) => setMessagesPerPage(Number(e.target.value))}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
          <option value={100}>100 per page</option>
        </select>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
        <div>
          Showing {startIndex + 1} to {endIndex} of {filteredMessages.length} messages
          {filteredMessages.length !== messages.length && (
            <span className="ml-2 text-blue-600">
              (filtered from {messages.length} total)
            </span>
          )}
        </div>
        <div>
          Page {currentPage} of {totalPages}
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedMessages.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-blue-800">
              {selectedMessages.length} message(s) selected
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleBulkAction('mark-read')}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Mark Read
              </button>
              <button
                onClick={() => handleBulkAction('mark-unread')}
                className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
              >
                Mark Unread
              </button>
              <button
                onClick={() => handleBulkAction('archive')}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
              >
                Archive
              </button>
              <button
                onClick={() => handleBulkAction('star')}
                className="px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700"
              >
                Star
              </button>
              <button
                onClick={handleDeleteSelected}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Cards View */}
      <div className="block lg:hidden">
        {currentMessages.map((message) => (
          <div key={message.id} className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSelectMessage(message.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {selectedMessages.includes(message.id) ? 
                    <CheckSquare className="w-4 h-4" /> : 
                    <Square className="w-4 h-4" />
                  }
                </button>
                <button
                  onClick={() => toggleStar(message.id)}
                  className={message.isStarred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}
                >
                  <Star className="w-4 h-4" fill={message.isStarred ? 'currentColor' : 'none'} />
                </button>
                {getTypeIcon(message.type)}
                <h3 className="font-semibold text-gray-900">{message.name}</h3>
                <div className={`w-3 h-3 rounded-full ${getPriorityColor(message.priority)}`}></div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                {message.status}
              </span>
            </div>
            
            <div className="mb-3">
              <p className="font-medium text-gray-800 mb-1">{message.subject}</p>
              <p className="text-sm text-gray-600 mb-2">{message.email}</p>
              <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
              {message.tags && message.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {message.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatTimestamp(message.timestamp)}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleViewMessage(message)}
                  className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleReply(message)}
                  className="p-1 text-green-600 hover:bg-green-100 rounded"
                >
                  <Reply className="w-4 h-4" />
                </button>
                <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4">
                <button
                  onClick={handleSelectAll}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {selectedMessages.length === currentMessages.length && currentMessages.length > 0 ? 
                    <CheckSquare className="w-4 h-4" /> : 
                    <Square className="w-4 h-4" />
                  }
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                <button
                  onClick={() => handleSort('priority')}
                  className="flex items-center gap-1 hover:text-gray-900"
                >
                  Priority
                  <SortIcon field="priority" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                <button
                  onClick={() => handleSort('customerName')}
                  className="flex items-center gap-1 hover:text-gray-900"
                >
                  Customer
                  <SortIcon field="customerName" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                <button
                  onClick={() => handleSort('subject')}
                  className="flex items-center gap-1 hover:text-gray-900"
                >
                  Subject
                  <SortIcon field="subject" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Message</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-1 hover:text-gray-900"
                >
                  Status
                  <SortIcon field="status" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                <button
                  onClick={() => handleSort('timestamp')}
                  className="flex items-center gap-1 hover:text-gray-900"
                >
                  Date
                  <SortIcon field="timestamp" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMessages.map((message) => (
              <tr key={message.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSelectMessage(message.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {selectedMessages.includes(message.id) ? 
                        <CheckSquare className="w-4 h-4" /> : 
                        <Square className="w-4 h-4" />
                      }
                    </button>
                    <button
                      onClick={() => toggleStar(message.id)}
                      className={message.isStarred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}
                    >
                      <Star className="w-4 h-4" fill={message.isStarred ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(message.priority)}`}></div>
                    {getTypeIcon(message.type)}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <div className="font-medium text-gray-900">{message.name}</div>
                    <div className="text-sm text-gray-600">{message.email}</div>
                    <div className="text-sm text-gray-600">{message.phone}</div>
                    <div className="text-xs text-gray-500">
                      {message.customerHistory} previous messages
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="font-medium text-gray-900">{message.subject}</div>
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      <FileText className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {message.attachments.length} attachment(s)
                      </span>
                    </div>
                  )}
                </td>
                <td className="py-4 px-4">
                  <div className="max-w-xs">
                    <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                    {message.tags && message.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {message.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                        {message.tags.length > 2 && (
                          <span className="text-xs text-gray-500">+{message.tags.length - 2}</span>
                        )}
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                    {message.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{formatTimestamp(message.timestamp)}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleViewMessage(message)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleUpdate(message)}
                      className="text-yellow-600 hover:text-yellow-900 p-1 rounded hover:bg-yellow-50"
                      title="Update Status/Priority"
                    >
                      <Settings2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleReply(message)}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      title="Reply"
                    >
                      <Reply className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          {/* Pagination Summary */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            <div className="text-sm text-gray-600 mb-4 sm:mb-0">
              Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{endIndex}</span> of <span className="font-medium">{filteredMessages.length}</span> messages
              {filteredMessages.length !== messages.length && (
                <span className="ml-2 text-blue-600">
                  (filtered from {messages.length} total)
                </span>
              )}
            </div>
            
            {/* Quick Jump */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Go to page:</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value);
                  if (page >= 1 && page <= totalPages) {
                    setCurrentPage(page);
                  }
                }}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-600">of {totalPages}</span>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Navigation Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={goToFirstPage}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="First Page"
              >
                <ChevronLeft className="w-4 h-4" />
                <ChevronLeft className="w-4 h-4 -ml-2" />
              </button>
              
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {/* Page Numbers */}
              <div className="flex items-center gap-1 mx-2">
                {getPaginationNumbers().map((pageNum, index) => (
                  <div key={index}>
                    {pageNum === '...' ? (
                      <span className="px-3 py-2 text-gray-500">...</span>
                    ) : (
                      <button
                        onClick={() => goToPage(pageNum)}
                        className={`px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Last Page"
              >
                <ChevronRight className="w-4 h-4" />
                <ChevronRight className="w-4 h-4 -ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {filteredMessages.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || typeFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'No messages available at the moment.'}
          </p>
          {(searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || typeFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setPriorityFilter('all');
                setTypeFilter('all');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Message Detail Modal */}
      {showMessageModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {getTypeIcon(selectedMessage.type)}
                <h3 className="text-xl font-semibold text-gray-900">{selectedMessage.subject}</h3>
                <div className={`w-3 h-3 rounded-full ${getPriorityColor(selectedMessage.priority)}`}></div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedMessage.status)}`}>
                  {selectedMessage.status}
                </span>
              </div>
              <button
                onClick={() => setShowMessageModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{selectedMessage.name}</h4>
                    <p className="text-sm text-gray-600">{selectedMessage.email}</p>
                    <p className="text-sm text-gray-600">{selectedMessage.phone}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatTimestamp(selectedMessage.timestamp)}</span>
                    </div>
                    <div className="mt-1">
                      {selectedMessage.customerHistory} previous messages
                    </div>
                  </div>
                </div>
                
                {selectedMessage.tags && selectedMessage.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedMessage.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800 leading-relaxed">{selectedMessage.message}</p>
                </div>
                
                {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Attachments:</h5>
                    <div className="space-y-2">
                      {selectedMessage.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-blue-600">
                          <FileText className="w-4 h-4" />
                          <span>{attachment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowMessageModal(false);
                    handleReply(selectedMessage);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Reply className="w-4 h-4" />
                  Reply
                </button>
                <button
                  onClick={() => toggleStar(selectedMessage.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedMessage.isStarred 
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Star className="w-4 h-4" fill={selectedMessage.isStarred ? 'currentColor' : 'none'} />
                  {selectedMessage.isStarred ? 'Unstar' : 'Star'}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Archive className="w-4 h-4" />
                  Archive
                </button>
              </div>
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


      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Reply to {selectedMessage.name}
              </h3>
              <button
                onClick={() => setShowReplyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Original Message:</strong> {selectedMessage.subject}
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                  {selectedMessage.message.substring(0, 200)}...
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="reply-text" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Reply
                </label>
                <textarea
                  id="reply-text"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-8">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Unread Messages</p>
              <p className="text-2xl font-bold text-red-900">
                {messages.filter(msg => msg.status === 'unread').length}
              </p>
            </div>
            <MessageCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">High Priority</p>
              <p className="text-2xl font-bold text-yellow-900">
                {messages.filter(msg => msg.priority === 'high').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Replied Today</p>
              <p className="text-2xl font-bold text-green-900">
                {messages.filter(msg => msg.status === 'replied').length}
              </p>
            </div>
            <Reply className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Messages</p>
              <p className="text-2xl font-bold text-blue-900">{messages.length}</p>
            </div>
            <Mail className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageTable;