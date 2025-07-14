import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, Clock, Users, Phone, Mail, MapPin, MoreVertical, Edit, Trash2, CheckCircle, XCircle, AlertCircle, Download, Plus, X, Save } from 'lucide-react';

const ReservationTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedReservations, setSelectedReservations] = useState([]);
  const [editingReservation, setEditingReservation] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const [editForm, setEditForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
    table: '',
    status: 'pending',
    specialRequests: ''
  });

  // Mock reservation data
  const [reservations, setReservations] = useState([
    {
      id: 'RES001',
      customerName: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      date: '2024-05-25',
      time: '19:00',
      guests: 4,
      table: 'T-12',
      status: 'confirmed',
      specialRequests: 'Window seat preferred',
      createdAt: '2024-05-20T10:30:00',
      totalAmount: 120.00
    },
    {
      id: 'RES002',
      customerName: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      date: '2024-05-25',
      time: '20:30',
      guests: 2,
      table: 'T-05',
      status: 'pending',
      specialRequests: 'Anniversary dinner',
      createdAt: '2024-05-21T14:15:00',
      totalAmount: 85.00
    },
    {
      id: 'RES003',
      customerName: 'Michael Brown',
      email: 'mbrown@email.com',
      phone: '+1 (555) 456-7890',
      date: '2024-05-24',
      time: '18:00',
      guests: 6,
      table: 'T-08',
      status: 'completed',
      specialRequests: 'Birthday celebration',
      createdAt: '2024-05-19T09:45:00',
      totalAmount: 180.00
    },
    {
      id: 'RES004',
      customerName: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 321-0987',
      date: '2024-05-26',
      time: '19:30',
      guests: 3,
      table: 'T-15',
      status: 'cancelled',
      specialRequests: 'Vegetarian options',
      createdAt: '2024-05-22T16:20:00',
      totalAmount: 95.00
    },
    {
      id: 'RES005',
      customerName: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+1 (555) 654-3210',
      date: '2024-05-25',
      time: '17:30',
      guests: 8,
      table: 'T-20',
      status: 'confirmed',
      specialRequests: 'Business dinner',
      createdAt: '2024-05-23T11:10:00',
      totalAmount: 240.00
    },
    {
      id: 'RES001',
      customerName: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      date: '2024-05-25',
      time: '19:00',
      guests: 4,
      table: 'T-12',
      status: 'confirmed',
      specialRequests: 'Window seat preferred',
      createdAt: '2024-05-20T10:30:00',
      totalAmount: 120.00
    },
    {
      id: 'RES002',
      customerName: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      date: '2024-05-25',
      time: '20:30',
      guests: 2,
      table: 'T-05',
      status: 'pending',
      specialRequests: 'Anniversary dinner',
      createdAt: '2024-05-21T14:15:00',
      totalAmount: 85.00
    },
    {
      id: 'RES003',
      customerName: 'Michael Brown',
      email: 'mbrown@email.com',
      phone: '+1 (555) 456-7890',
      date: '2024-05-24',
      time: '18:00',
      guests: 6,
      table: 'T-08',
      status: 'completed',
      specialRequests: 'Birthday celebration',
      createdAt: '2024-05-19T09:45:00',
      totalAmount: 180.00
    },
    {
      id: 'RES004',
      customerName: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 321-0987',
      date: '2024-05-26',
      time: '19:30',
      guests: 3,
      table: 'T-15',
      status: 'cancelled',
      specialRequests: 'Vegetarian options',
      createdAt: '2024-05-22T16:20:00',
      totalAmount: 95.00
    },
    {
      id: 'RES005',
      customerName: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+1 (555) 654-3210',
      date: '2024-05-25',
      time: '17:30',
      guests: 8,
      table: 'T-20',
      status: 'confirmed',
      specialRequests: 'Business dinner',
      createdAt: '2024-05-23T11:10:00',
      totalAmount: 240.00
    },  {
      id: 'RES001',
      customerName: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      date: '2024-05-25',
      time: '19:00',
      guests: 4,
      table: 'T-12',
      status: 'confirmed',
      specialRequests: 'Window seat preferred',
      createdAt: '2024-05-20T10:30:00',
      totalAmount: 120.00
    },
    {
      id: 'RES002',
      customerName: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      date: '2024-05-25',
      time: '20:30',
      guests: 2,
      table: 'T-05',
      status: 'pending',
      specialRequests: 'Anniversary dinner',
      createdAt: '2024-05-21T14:15:00',
      totalAmount: 85.00
    },
    {
      id: 'RES003',
      customerName: 'Michael Brown',
      email: 'mbrown@email.com',
      phone: '+1 (555) 456-7890',
      date: '2024-05-24',
      time: '18:00',
      guests: 6,
      table: 'T-08',
      status: 'completed',
      specialRequests: 'Birthday celebration',
      createdAt: '2024-05-19T09:45:00',
      totalAmount: 180.00
    },
    {
      id: 'RES004',
      customerName: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 321-0987',
      date: '2024-05-26',
      time: '19:30',
      guests: 3,
      table: 'T-15',
      status: 'cancelled',
      specialRequests: 'Vegetarian options',
      createdAt: '2024-05-22T16:20:00',
      totalAmount: 95.00
    },
    {
      id: 'RES005',
      customerName: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+1 (555) 654-3210',
      date: '2024-05-25',
      time: '17:30',
      guests: 8,
      table: 'T-20',
      status: 'confirmed',
      specialRequests: 'Business dinner',
      createdAt: '2024-05-23T11:10:00',
      totalAmount: 240.00
    }
  ]);

  const statusConfig = {
    confirmed: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
    pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: AlertCircle },
    cancelled: { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle },
    completed: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircle }
  };

  // Filter and search logic
  const filteredReservations = useMemo(() => {
    return reservations.filter(reservation => {
      const matchesSearch = reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          reservation.phone.includes(searchTerm) ||
                          reservation.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
      const matchesDate = !dateFilter || reservation.date === dateFilter;
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [reservations, searchTerm, statusFilter, dateFilter]);

  // Sort logic
  const sortedReservations = useMemo(() => {
    const sorted = [...filteredReservations].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date + ' ' + a.time);
          bValue = new Date(b.date + ' ' + b.time);
          break;
        case 'name':
          aValue = a.customerName.toLowerCase();
          bValue = b.customerName.toLowerCase();
          break;
        case 'guests':
          aValue = a.guests;
          bValue = b.guests;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          return 0;
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredReservations, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedReservations.length / itemsPerPage);
  const paginatedReservations = sortedReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleStatusUpdate = (id, newStatus) => {
    setReservations(prev => prev.map(res => 
      res.id === id ? { ...res, status: newStatus } : res
    ));
  };

  const handleSelectReservation = (id) => {
    setSelectedReservations(prev => 
      prev.includes(id) 
        ? prev.filter(resId => resId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedReservations.length === paginatedReservations.length) {
      setSelectedReservations([]);
    } else {
      setSelectedReservations(paginatedReservations.map(res => res.id));
    }
  };

  const handleEditReservation = (reservation) => {
    setEditingReservation(reservation);
    setEditForm({
      customerName: reservation.customerName,
      email: reservation.email,
      phone: reservation.phone,
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      table: reservation.table,
      status: reservation.status,
      specialRequests: reservation.specialRequests
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editingReservation) return;

    setReservations(prev => prev.map(res => 
      res.id === editingReservation.id 
        ? { 
            ...res, 
            ...editForm,
            guests: parseInt(editForm.guests)
          }
        : res
    ));
    
    setShowEditModal(false);
    setEditingReservation(null);
    setEditForm({
      customerName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: 1,
      table: '',
      status: 'pending',
      specialRequests: ''
    });
  };

  const handleDeleteReservation = (reservation) => {
    setReservationToDelete(reservation);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!reservationToDelete) return;

    setReservations(prev => prev.filter(res => res.id !== reservationToDelete.id));
    setSelectedReservations(prev => prev.filter(id => id !== reservationToDelete.id));
    setShowDeleteModal(false);
    setReservationToDelete(null);
  };

  const handleBulkDelete = () => {
    setReservations(prev => prev.filter(res => !selectedReservations.includes(res.id)));
    setSelectedReservations([]);
  };

  const handleBulkStatusUpdate = (newStatus) => {
    setReservations(prev => prev.map(res => 
      selectedReservations.includes(res.id) 
        ? { ...res, status: newStatus }
        : res
    ));
    setSelectedReservations([]);
  };

  const closeModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setEditingReservation(null);
    setReservationToDelete(null);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    return new Date(`2000-01-01 ${timeStr}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reservations</h1>
              <p className="text-gray-600 mt-1">Manage your restaurant reservations</p>
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                New Reservation
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Reservations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reservations.filter(res => res.date === '2024-05-25').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reservations.filter(res => res.status === 'confirmed').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reservations.filter(res => res.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Guests</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reservations.reduce((sum, res) => sum + res.guests, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reservations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <input
                type="date"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
              >
                <option value="date-desc">Date (Newest)</option>
                <option value="date-asc">Date (Oldest)</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="guests-desc">Guests (Most)</option>
                <option value="guests-asc">Guests (Least)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {selectedReservations.length > 0 && (
            <div className="px-6 py-4 bg-blue-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">
                  {selectedReservations.length} reservation(s) selected
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleBulkStatusUpdate('confirmed')}
                    className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                  >
                    Confirm Selected
                  </button>
                  <button 
                    onClick={() => handleBulkStatusUpdate('cancelled')}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                  >
                    Cancel Selected
                  </button>
                  <button 
                    onClick={handleBulkDelete}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Delete Selected
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedReservations.length === paginatedReservations.length && paginatedReservations.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-1 hover:text-gray-700"
                    >
                      Customer
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort('date')}
                      className="flex items-center gap-1 hover:text-gray-700"
                    >
                      Date & Time
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort('guests')}
                      className="flex items-center gap-1 hover:text-gray-700"
                    >
                      Guests
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Table
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort('status')}
                      className="flex items-center gap-1 hover:text-gray-700"
                    >
                      Status
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedReservations.map((reservation) => {
                  const StatusIcon = statusConfig[reservation.status].icon;
                  return (
                    <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={selectedReservations.includes(reservation.id)}
                          onChange={() => handleSelectReservation(reservation.id)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">{reservation.customerName}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {reservation.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {reservation.phone}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">ID: {reservation.id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {formatDate(reservation.date)}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            {formatTime(reservation.time)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{reservation.guests}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {reservation.table}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig[reservation.status].color}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">
                          ${reservation.totalAmount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <select
                            className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={reservation.status}
                            onChange={(e) => handleStatusUpdate(reservation.id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button 
                            onClick={() => handleEditReservation(reservation)}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Edit reservation"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteReservation(reservation)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete reservation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedReservations.length)} of {sortedReservations.length} results
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 text-sm border rounded-md transition-colors ${
                        currentPage === page
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Edit Reservation</h3>
                <button 
                  onClick={closeModals}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      value={editForm.customerName}
                      onChange={(e) => setEditForm(prev => ({ ...prev, customerName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time *
                    </label>
                    <input
                      type="time"
                      value={editForm.time}
                      onChange={(e) => setEditForm(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Guests *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={editForm.guests}
                      onChange={(e) => setEditForm(prev => ({ ...prev, guests: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Table
                    </label>
                    <select
                      value={editForm.table}
                      onChange={(e) => setEditForm(prev => ({ ...prev, table: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Table</option>
                      {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                        <option key={num} value={`T-${num.toString().padStart(2, '0')}`}>
                          Table {num} (T-{num.toString().padStart(2, '0')})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    value={editForm.specialRequests}
                    onChange={(e) => setEditForm(prev => ({ ...prev, specialRequests: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special requests or notes..."
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={closeModals}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && reservationToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Delete Reservation</h3>
                    <p className="text-gray-600 mt-1">
                      Are you sure you want to delete the reservation for <strong>{reservationToDelete.customerName}</strong>? This action cannot be undone.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">
                    <div><strong>Reservation ID:</strong> {reservationToDelete.id}</div>
                    <div><strong>Date:</strong> {formatDate(reservationToDelete.date)} at {formatTime(reservationToDelete.time)}</div>
                    <div><strong>Guests:</strong> {reservationToDelete.guests}</div>
                    <div><strong>Table:</strong> {reservationToDelete.table}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={closeModals}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Reservation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationTable;