import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, RefreshCw, Filter, Calendar, User, AlertCircle, CheckCircle, XCircle, Info, Eye,
  Download, Settings, Bell, BellOff, Trash2, Archive, FileText, BarChart3, Activity,
  Clock, Globe, Shield, Database, TrendingUp, TrendingDown, Pause, Play, ChevronDown,
  CheckSquare, Square, X, Plus, Minus, MapPin, Smartphone, Monitor, Tablet
} from 'lucide-react';

const AdminLogger = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState({ start: '', end: '' });
  const [selectedUser, setSelectedUser] = useState('all');
  const [selectedAction, setSelectedAction] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [selectedLogs, setSelectedLogs] = useState(new Set());
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage, setLogsPerPage] = useState(25);
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [ipFilter, setIpFilter] = useState('');
  const [deviceFilter, setDeviceFilter] = useState('all');
  const [severityThreshold, setSeverityThreshold] = useState('all');
  const realTimeInterval = useRef(null);

  // Enhanced mock log data
  const generateMockLogs = () => {
    const levels = ['info', 'warning', 'error', 'success', 'debug'];
    const actions = [
      'User login', 'User logout', 'Order created', 'Order updated', 'Order cancelled',
      'Payment processed', 'Payment failed', 'Menu updated', 'Staff member added',
      'Staff member removed', 'Table reserved', 'Table cancelled', 'Inventory updated',
      'Customer registered', 'Customer updated', 'System backup', 'Database sync',
      'Report generated', 'Settings changed', 'Password changed', 'Email sent',
      'Notification sent', 'File uploaded', 'File deleted', 'Cache cleared',
      'Security scan', 'API call made', 'Integration sync', 'Webhook received'
    ];
    
    const users = [
      'admin@restaurant.com', 'manager@restaurant.com', 'staff@restaurant.com', 
      'cashier@restaurant.com', 'chef@restaurant.com', 'waiter@restaurant.com',
      'system', 'api_user', 'webhook_handler'
    ];

    const devices = ['desktop', 'mobile', 'tablet'];
    const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
    
    return Array.from({ length: 200 }, (_, i) => ({
      id: i + 1,
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      level: levels[Math.floor(Math.random() * levels.length)],
      action: actions[Math.floor(Math.random() * actions.length)],
      user: users[Math.floor(Math.random() * users.length)],
      details: `Log entry ${i + 1} with additional context and information about the action performed. This includes relevant metadata and system state information.`,
      ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      sessionId: `sess_${Math.random().toString(36).substr(2, 9)}`,
      device: devices[Math.floor(Math.random() * devices.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      duration: Math.floor(Math.random() * 5000) + 100,
      statusCode: Math.random() > 0.8 ? (Math.random() > 0.5 ? 404 : 500) : 200,
      userAgent: `Mozilla/5.0 (${devices[Math.floor(Math.random() * devices.length)]})`,
      referer: Math.random() > 0.5 ? 'https://restaurant.com/dashboard' : null,
      tags: ['auth', 'order', 'payment', 'system'][Math.floor(Math.random() * 4)]
    }));
  };

  const fetchLogs = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockLogs = generateMockLogs();
    setLogs(mockLogs);
    setFilteredLogs(mockLogs);
    setIsRefreshing(false);
  };

  const startRealTimeUpdates = () => {
    if (realTimeInterval.current) return;
    realTimeInterval.current = setInterval(() => {
      // Simulate new log entries
      const newLog = generateMockLogs().slice(0, 1)[0];
      newLog.id = Date.now();
      newLog.timestamp = new Date().toISOString();
      setLogs(prev => [newLog, ...prev.slice(0, 199)]);
    }, 5000);
  };

  const stopRealTimeUpdates = () => {
    if (realTimeInterval.current) {
      clearInterval(realTimeInterval.current);
      realTimeInterval.current = null;
    }
  };

  useEffect(() => {
    fetchLogs();
    return () => stopRealTimeUpdates();
  }, []);

  useEffect(() => {
    if (isRealTimeEnabled) {
      startRealTimeUpdates();
    } else {
      stopRealTimeUpdates();
    }
  }, [isRealTimeEnabled]);

  // Enhanced filtering logic
  useEffect(() => {
    let filtered = logs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ip.includes(searchTerm) ||
        log.sessionId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Level filter
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(log => log.level === selectedLevel);
    }

    // Date range filter
    if (selectedDateRange.start && selectedDateRange.end) {
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= new Date(selectedDateRange.start) && logDate <= new Date(selectedDateRange.end);
      });
    } else if (selectedDate) {
      filtered = filtered.filter(log => log.timestamp.startsWith(selectedDate));
    }

    // User filter
    if (selectedUser !== 'all') {
      filtered = filtered.filter(log => log.user === selectedUser);
    }

    // Action filter
    if (selectedAction !== 'all') {
      filtered = filtered.filter(log => log.action === selectedAction);
    }

    // IP filter
    if (ipFilter) {
      filtered = filtered.filter(log => log.ip.includes(ipFilter));
    }

    // Device filter
    if (deviceFilter !== 'all') {
      filtered = filtered.filter(log => log.device === deviceFilter);
    }

    // Severity threshold filter
    if (severityThreshold !== 'all') {
      const severityOrder = { 'debug': 0, 'info': 1, 'success': 1, 'warning': 2, 'error': 3 };
      const threshold = severityOrder[severityThreshold];
      filtered = filtered.filter(log => severityOrder[log.level] >= threshold);
    }

    // Sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        
        if (sortConfig.key === 'timestamp') {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        }
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredLogs(filtered);
    setCurrentPage(1);
  }, [logs, searchTerm, selectedLevel, selectedDate, selectedDateRange, selectedUser, selectedAction, ipFilter, deviceFilter, severityThreshold, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const startIndex = (currentPage - 1) * logsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + logsPerPage);

  // Bulk actions
  const toggleLogSelection = (logId) => {
    const newSelected = new Set(selectedLogs);
    if (newSelected.has(logId)) {
      newSelected.delete(logId);
    } else {
      newSelected.add(logId);
    }
    setSelectedLogs(newSelected);
  };

  const toggleAllSelection = () => {
    if (selectedLogs.size === paginatedLogs.length) {
      setSelectedLogs(new Set());
    } else {
      setSelectedLogs(new Set(paginatedLogs.map(log => log.id)));
    }
  };

  const bulkArchive = () => {
    setLogs(prev => prev.filter(log => !selectedLogs.has(log.id)));
    setSelectedLogs(new Set());
  };

  const bulkExport = () => {
    const selectedLogsData = logs.filter(log => selectedLogs.has(log.id));
    const csvContent = [
      ['Timestamp', 'Level', 'Action', 'User', 'IP', 'Device', 'Details'].join(','),
      ...selectedLogsData.map(log => [
        log.timestamp,
        log.level,
        log.action,
        log.user,
        log.ip,
        log.device,
        `"${log.details}"`
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Analytics data
  const getAnalyticsData = () => {
    const last24Hours = logs.filter(log => 
      new Date(log.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    );
    
    const levelCounts = logs.reduce((acc, log) => {
      acc[log.level] = (acc[log.level] || 0) + 1;
      return acc;
    }, {});

    const userActivity = logs.reduce((acc, log) => {
      acc[log.user] = (acc[log.user] || 0) + 1;
      return acc;
    }, {});

    const deviceStats = logs.reduce((acc, log) => {
      acc[log.device] = (acc[log.device] || 0) + 1;
      return acc;
    }, {});

    return {
      totalLogs: logs.length,
      last24Hours: last24Hours.length,
      errorRate: ((levelCounts.error || 0) / logs.length * 100).toFixed(1),
      topUser: Object.entries(userActivity).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A',
      levelCounts,
      deviceStats
    };
  };

  const analytics = getAnalyticsData();

  const getLevelIcon = (level) => {
    switch (level) {
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'debug': return <Activity className="w-4 h-4 text-purple-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getLevelBadgeColor = (level) => {
    switch (level) {
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'debug': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getDeviceIcon = (device) => {
    switch (device) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'tablet': return <Tablet className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getUniqueValues = (key) => {
    return [...new Set(logs.map(log => log[key]))].sort();
  };

  const LogModal = ({ log, onClose }) => {
    if (!log) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Log Details</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Timestamp</label>
                  <p className="text-gray-900 font-mono">{formatTimestamp(log.timestamp)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Level</label>
                  <div className="flex items-center gap-2 mt-1">
                    {getLevelIcon(log.level)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getLevelBadgeColor(log.level)}`}>
                      {log.level.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Action</label>
                  <p className="text-gray-900 font-medium">{log.action}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">User</label>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{log.user}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">IP Address</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 font-mono">{log.ip}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Device</label>
                  <div className="flex items-center gap-2 mt-1">
                    {getDeviceIcon(log.device)}
                    <p className="text-gray-900 capitalize">{log.device}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{log.location}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Duration</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{log.duration}ms</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Session ID</label>
                <p className="text-gray-900 font-mono text-sm bg-gray-50 px-3 py-2 rounded-lg">{log.sessionId}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Status Code</label>
                <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                  log.statusCode === 200 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {log.statusCode}
                </span>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">User Agent</label>
                <p className="text-gray-900 text-sm bg-gray-50 px-3 py-2 rounded-lg break-all">{log.userAgent}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Details</label>
                <p className="text-gray-900 bg-gray-50 p-4 rounded-lg leading-relaxed">{log.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Logger</h1>
              <p className="text-gray-600">Monitor system activities and user actions</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  isRealTimeEnabled 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                {isRealTimeEnabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isRealTimeEnabled ? 'Live' : 'Paused'}
              </button>
              
              <button
                onClick={() => setAlertsEnabled(!alertsEnabled)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  alertsEnabled 
                    ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                {alertsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                Alerts
              </button>
              
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="bg-purple-100 text-purple-800 border border-purple-200 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </button>
              
              <button
                onClick={fetchLogs}
                disabled={isRefreshing}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md transform hover:scale-105 disabled:transform-none"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        {showAnalytics && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Analytics Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Logs</p>
                    <p className="text-2xl font-bold">{analytics.totalLogs}</p>
                  </div>
                  <Database className="w-8 h-8 text-blue-200" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Last 24h</p>
                    <p className="text-2xl font-bold">{analytics.last24Hours}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-200" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Error Rate</p>
                    <p className="text-2xl font-bold">{analytics.errorRate}%</p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-red-200" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Top User</p>
                    <p className="text-lg font-bold truncate">{analytics.topUser}</p>
                  </div>
                  <User className="w-8 h-8 text-purple-200" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Log Levels Distribution</h3>
                <div className="space-y-2">
                  {Object.entries(analytics.levelCounts).map(([level, count]) => (
                    <div key={level} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getLevelIcon(level)}
                        <span className="capitalize text-gray-700">{level}</span>
                      </div>
                      <span className="font-medium text-gray-900">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Device Usage</h3>
                <div className="space-y-2">
                  {Object.entries(analytics.deviceStats).map(([device, count]) => (
                    <div key={device} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(device)}
                        <span className="capitalize text-gray-700">{device}</span>
                      </div>
                      <span className="font-medium text-gray-900">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search logs, users, IPs, sessions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Levels</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="debug">Debug</option>
              </select>
              
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Users</option>
                {getUniqueValues('user').map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
              
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Advanced
                <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="border-t border-gray-200 pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={selectedDateRange.start}
                    onChange={(e) => setSelectedDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    value={selectedDateRange.end}
                    onChange={(e) => setSelectedDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">IP Address</label>
                <input
                  type="text"
                  placeholder="Filter by IP..."
                  value={ipFilter}
                  onChange={(e) => setIpFilter(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Device Type</label>
                <select
                  value={deviceFilter}
                  onChange={(e) => setDeviceFilter(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Devices</option>
                  <option value="desktop">Desktop</option>
                  <option value="mobile">Mobile</option>
                  <option value="tablet">Tablet</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Severity Threshold</label>
                <select
                  value={severityThreshold}
                  onChange={(e) => setSeverityThreshold(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Severities</option>
                  <option value="debug">Debug & Above</option>
                  <option value="info">Info & Above</option>
                  <option value="warning">Warning & Above</option>
                  <option value="error">Error Only</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedLogs.size > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-blue-600" />
                <span className="text-blue-900 font-medium">
                  {selectedLogs.size} log{selectedLogs.size !== 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={bulkExport}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button
                  onClick={bulkArchive}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <Archive className="w-4 h-4" />
                  Archive
                </button>
                <button
                  onClick={() => setSelectedLogs(new Set())}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logs Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Logs ({filteredLogs.length})
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Show:</span>
                <select
                  value={logsPerPage}
                  onChange={(e) => setLogsPerPage(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const csvContent = [
                    ['Timestamp', 'Level', 'Action', 'User', 'IP', 'Device', 'Details'].join(','),
                    ...filteredLogs.map(log => [
                      log.timestamp,
                      log.level,
                      log.action,
                      log.user,
                      log.ip,
                      log.device,
                      `"${log.details}"`
                    ].join(','))
                  ].join('\n');
                  
                  const blob = new Blob([csvContent], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `all-logs-${new Date().toISOString().split('T')[0]}.csv`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export All
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 w-12">
                    <button
                      onClick={toggleAllSelection}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {selectedLogs.size === paginatedLogs.length && paginatedLogs.length > 0 ? 
                        <CheckSquare className="w-5 h-5" /> : 
                        <Square className="w-5 h-5" />
                      }
                    </button>
                  </th>
                  <th 
                    className="text-left px-6 py-4 text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setSortConfig({ key: 'timestamp', direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })}
                  >
                    <div className="flex items-center gap-2">
                      Timestamp
                      {sortConfig.key === 'timestamp' && (
                        sortConfig.direction === 'asc' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Level</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Action</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">User</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Device</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">IP</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Duration</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedLogs.map((log) => (
                  <tr 
                    key={log.id} 
                    className={`hover:bg-gray-50 transition-colors duration-150 ${
                      selectedLogs.has(log.id) ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleLogSelection(log.id)}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {selectedLogs.has(log.id) ? 
                          <CheckSquare className="w-5 h-5 text-blue-600" /> : 
                          <Square className="w-5 h-5" />
                        }
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="font-medium">{formatTimestamp(log.timestamp)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getLevelIcon(log.level)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getLevelBadgeColor(log.level)}`}>
                          {log.level.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{log.action}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span className="truncate max-w-32">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(log.device)}
                        <span className="capitalize">{log.device}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">{log.ip}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {log.duration}ms
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-150 flex items-center gap-1 group"
                      >
                        <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(startIndex + logsPerPage, filteredLogs.length)} of {filteredLogs.length} results
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page 
                            ? 'bg-blue-600 text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  
                  {totalPages > 5 && (
                    <>
                      <span className="px-2 text-gray-500">...</span>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === totalPages 
                            ? 'bg-blue-600 text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No logs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or refresh the data.</p>
            </div>
          )}
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Info className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Logs</p>
                <p className="text-2xl font-bold text-gray-900">{filteredLogs.length}</p>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {analytics.last24Hours} in last 24h
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-red-100 p-2 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Errors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredLogs.filter(log => log.level === 'error').length}
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {analytics.errorRate}% error rate
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Warnings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredLogs.filter(log => log.level === 'warning').length}
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Needs attention
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Success</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredLogs.filter(log => log.level === 'success').length}
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Operations completed
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Log Detail Modal */}
      <LogModal log={selectedLog} onClose={() => setSelectedLog(null)} />
    </div>
  );
};

export default AdminLogger;