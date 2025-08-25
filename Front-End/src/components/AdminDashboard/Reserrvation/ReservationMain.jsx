import React, { useState, useEffect } from 'react';
import { Search, Download, Upload, Plus, Eye, Edit, Trash2, X, Calendar, Clock, Users, Mail, Phone, MessageSquare } from 'lucide-react';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import ViewModal from './ViewModal';
import AddReservationModal from './AddModel';
import RestaurantLoader from '@/components/restaurant_loader';
import { useDispatch, useSelector } from 'react-redux';
import { allReservationAdmin } from '@/Redux/ReservationSlice';


const ReservationDashboard = () => {
  // Sample reservation data
  // const [reservations, setReservations] = useState([
  //   {
  //     _id: '1',
  //     name: 'John Doe',
  //     email: 'john.doe@gmail.com',
  //     phone: '01644880331',
  //     numberOfGuests: 4,
  //     date: '2024-07-25',
  //     time: '19:30',
  //     message: 'Anniversary dinner, please arrange a corner table',
  //     status: 'confirmed',
  //     createdAt: '2024-06-18T10:30:00Z'
  //   },
  //   {
  //     _id: '2',
  //     name: 'Sarah Wilson',
  //     email: 'sarah.wilson@gmail.com',
  //     phone: '01711223344',
  //     numberOfGuests: 2,
  //     date: '2024-07-26',
  //     time: '20:00',
  //     message: 'Business dinner',
  //     status: 'pending',
  //     createdAt: '2024-06-19T14:20:00Z'
  //   },
  //   {
  //     _id: '3',
  //     name: 'Mike Johnson',
  //     email: 'mike.j@gmail.com',
  //     phone: '01555667788',
  //     numberOfGuests: 6,
  //     date: '2024-07-27',
  //     time: '18:30',
  //     message: 'Family gathering for birthday celebration',
  //     status: 'cancelled',
  //     createdAt: '2024-06-20T09:15:00Z'
  //   }
  // ]);
  const {isLoading,reservations:reservations}=useSelector((state)=>state.reservation)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(allReservationAdmin())

  },[dispatch])

  const [filteredReservations, setFilteredReservations] = useState(reservations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Modal states
  const [viewModal, setViewModal] = useState({ open: false, reservation: null });
  const [editModal, setEditModal] = useState({ open: false, reservation: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, reservation: null });
  const [addModal, setAddModal] = useState(false);



  // Statistics
  const totalReservations = reservations.length;
  const activeReservations = reservations.filter(r => r.status === 'confirmed').length;
  const totalRevenue = 0; // You can calculate based on your pricing logic
  const avgOrderValue = 0; // You can calculate based on your data

  // Filter reservations
  useEffect(() => {
    let filtered = reservations;
    
    if (searchTerm) {
      filtered = filtered.filter(reservation =>
        reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.phone.includes(searchTerm)
      );
    }
    
    if (statusFilter !== 'All Status') {
      filtered = filtered.filter(reservation => 
        reservation.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    
    setFilteredReservations(filtered);
  }, [searchTerm, statusFilter, reservations]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (reservation) => {
    setEditModal({ open: true, reservation: { ...reservation } });
  };

  const handleDelete = (reservation) => {
    setDeleteModal({ open: true, reservation });
  };

  const handleView = (reservation) => {
    setViewModal({ open: true, reservation });
  };

 

  const saveEdit = (updatedReservation) => {
    setReservations(prev => prev.map(r => 
      r._id === updatedReservation._id ? updatedReservation : r
    ));
    setEditModal({ open: false, reservation: null });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReservations = filteredReservations.slice(indexOfFirstItem, indexOfLastItem);

  if(isLoading){
    return <RestaurantLoader />
    }



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Reservations</p>
              <p className="text-3xl font-bold">{totalReservations}</p>
            </div>
            <Users className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-green-500 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Active Reservations</p>
              <p className="text-3xl font-bold">{activeReservations}</p>
            </div>
            <Calendar className="h-8 w-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-purple-500 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold">${totalRevenue}</p>
            </div>
            <div className="h-8 w-8 text-purple-200 flex items-center justify-center text-xl font-bold">$</div>
          </div>
        </div>
        
        <div className="bg-orange-500 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Avg Order Value</p>
              <p className="text-3xl font-bold">${avgOrderValue}</p>
            </div>
            <div className="h-8 w-8 text-orange-200 flex items-center justify-center text-xl font-bold">∅</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reservation Management</h1>
              <p className="text-gray-600 mt-1">Manage restaurant reservations, staff, and customer data</p>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-0">
              <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </button>
              <button 
                onClick={() => setAddModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Reservation
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search reservations by name, email, or phone..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
            </select>
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact & Details
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentReservations.map((reservation) => (
                <tr key={reservation._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {reservation.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{reservation.name}</div>
                        <div className="text-sm text-gray-500">Customer</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center mb-1">
                        <Mail className="h-3 w-3 mr-1 text-gray-400" />
                        {reservation.email}
                      </div>
                      <div className="flex items-center mb-1">
                        <Phone className="h-3 w-3 mr-1 text-gray-400" />
                        {reservation.phone}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1 text-gray-400" />
                        {reservation.numberOfGuests} guests
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center mb-1">
                        <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                        {formatDate(reservation.date)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-gray-400" />
                        {formatTime(reservation.time)}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {new Date(reservation.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleView(reservation)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEdit(reservation)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(reservation)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredReservations.length)} of {filteredReservations.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                {currentPage}
              </span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredReservations.length / itemsPerPage)))}
                disabled={currentPage >= Math.ceil(filteredReservations.length / itemsPerPage)}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {viewModal.open && (
        <ViewModal setViewModal={setViewModal}viewModal={viewModal} formatTime={formatTime} getStatusColor={getStatusColor} formatDate={formatDate} />
      )}

      {/* Edit Modal */}
      {editModal.open && (
       <EditModal setEditModal={setEditModal} editModal={editModal} saveEdit={saveEdit} />
      )}

      {/* Delete Modal */}
      {deleteModal.open && (
        <DeleteModal setDeleteModal={setDeleteModal} deleteModal={deleteModal} />
   
      )}
      {/* Delete Modal */}
      {addModal && (
        <AddReservationModal setAddModal={setAddModal} />
   
      )}
    </div>
  );
};

export default ReservationDashboard;