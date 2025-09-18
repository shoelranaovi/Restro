import React, { useState, useEffect } from "react";
import {
  Search,
  Download,
  Upload,
  Plus,
  Eye,
  Edit,
  Trash2,
  X,
  Calendar,
  Clock,
  Users,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import ViewModal from "./ViewModal";
import AddReservationModal from "./AddModel";
import RestaurantLoader from "@/components/restaurant_loader";
import { useDispatch, useSelector } from "react-redux";
import { allReservationAdmin } from "@/Redux/ReservationSlice";
import LoadingComponent from "@/components/Layout/LoadingComponent";
import ReservationTable from "./ReservationTable";

const ReservationDashboard = () => {

  const { isLoading, reservations: reservations } = useSelector(
    (state) => state.reservation
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allReservationAdmin());
  }, [dispatch]);

  const [filteredReservations, setFilteredReservations] =
    useState(reservations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal states
  const [viewModal, setViewModal] = useState({
    open: false,
    reservation: null,
  });
  const [editModal, setEditModal] = useState({
    open: false,
    reservation: null,
  });
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    reservation: null,
  });
  const [addModal, setAddModal] = useState(false);

  // Statistics
  const totalReservations = reservations.length;
  const activeReservations = reservations.filter(
    (r) => r.status === "confirmed"
  ).length;
  const totalRevenue = 0; // You can calculate based on your pricing logic
  const avgOrderValue = 0; // You can calculate based on your data

  // Filter reservations
  useEffect(() => {
    let filtered = reservations;

    if (searchTerm) {
      filtered = filtered.filter(
        (reservation) =>
          reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reservation.phone.includes(searchTerm)
      );
    }

    if (statusFilter !== "All Status") {
      filtered = filtered.filter(
        (reservation) =>
          reservation.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredReservations(filtered);
  }, [searchTerm, statusFilter, reservations]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
    setReservations((prev) =>
      prev.map((r) =>
        r._id === updatedReservation._id ? updatedReservation : r
      )
    );
    setEditModal({ open: false, reservation: null });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReservations = filteredReservations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 overflow-x-hidden">
      <div className="flex flex-wrap pb-5   items-end justify-end gap-3 mt-4 sm:mt-0">
        <button className="flex justify-center h-10 items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
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
          Add
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm">
      

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
              <option>Completed</option>
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
        <ReservationTable
          getStatusColor={getStatusColor}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleView={handleView}
          formatTime={formatTime}
          formatDate={formatDate}
          currentReservations={currentReservations}
        />

        {/* Pagination */}
        <div className="px-6 py-3 border-t border-gray-200">
          {currentReservations?.length > 0 && (
            <div className="flex flex-col gap-4 lg:flex-row items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, filteredReservations.length)} of{" "}
                {filteredReservations.length} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1 bg-orange-600 text-white rounded text-sm">
                  {currentPage}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(
                        prev + 1,
                        Math.ceil(filteredReservations.length / itemsPerPage)
                      )
                    )
                  }
                  disabled={
                    currentPage >=
                    Math.ceil(filteredReservations.length / itemsPerPage)
                  }
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* View Modal */}
      {viewModal.open && (
        <ViewModal
          setViewModal={setViewModal}
          viewModal={viewModal}
          formatTime={formatTime}
          getStatusColor={getStatusColor}
          formatDate={formatDate}
        />
      )}

      {/* Edit Modal */}
      {editModal.open && (
        <EditModal
          setEditModal={setEditModal}
          editModal={editModal}
          saveEdit={saveEdit}
        />
      )}

      {/* Delete Modal */}
      {deleteModal.open && (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          deleteModal={deleteModal}
        />
      )}
      {/* Delete Modal */}
      {addModal && <AddReservationModal setAddModal={setAddModal} />}
    </div>
  );
};

export default ReservationDashboard;
