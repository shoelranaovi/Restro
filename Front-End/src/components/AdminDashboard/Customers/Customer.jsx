import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  UserPlus,
  Eye,
  Mail,
  Phone,
  Download,
  Upload,
  Star,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  ChevronDown,
  X,
  Check,
  AlertCircle,
  MapPin,
  Clock,
  Award,
} from "lucide-react";
import StatisticsCard from "./StatisticsCard";
import EnhancedHeader from "./EnhancedHeader";
import UserTable from "./UserTable";
import { useDispatch, useSelector } from "react-redux";
import { allUserAdmin } from "@/Redux/AuthSlice";
import EditModal from "./EditModal";
import DeleteUserModal from "./DeleteModal";
import RestaurantLoader from "@/components/restaurant_loader";
import LoadingComponent from "@/components/Layout/LoadingComponent";

const Customers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(allUserAdmin());
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [addusermodal, setAddUserModel] = useState(false);
  const [eiditmodal, setEditModel] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [deletemodal, setDeleteModel] = useState(false);
  const [deleteUserDetail, setDeleteUserDetail] = useState(null);

  // Statistics
  const stats = useMemo(() => {
    const totalUsers = users?.length;
    const activeUsers = users?.filter((u) => u.status === "Active")?.length;
    const totalRevenue = users?.reduce((sum, u) => sum + u.totalSpent, 0);
    const totalOrders = users?.reduce((sum, u) => sum + u.totalOrders, 0);
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
      totalUsers,
      activeUsers,
      totalRevenue,
      avgOrderValue,
    };
  }, [users]);

  // Filtered and sorted users
  const filteredUsers = useMemo(() => {
    let filtered = users?.filter((user) => {
      const matchesSearch =
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.includes(searchTerm);
      const matchesRole = filterRole === "All" || user.role === filterRole;
      const matchesStatus =
        filterStatus === "All" || user.status === filterStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });

    filtered?.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === "string") {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [users, searchTerm, filterRole, filterStatus, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (
      selectedUsers.length === paginatedUsers.length &&
      paginatedUsers.length > 0
    ) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map((user) => user.id));
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses =
      "px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center";
    if (status === "Active") {
      return `${baseClasses} bg-emerald-100 text-emerald-700 border border-emerald-200`;
    } else {
      return `${baseClasses} bg-red-100 text-red-700 border border-red-200`;
    }
  };

  const getRoleBadge = (role) => {
    const baseClasses =
      "px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center";
    switch (role) {
      case "Manager":
        return `${baseClasses} bg-purple-100 text-purple-700 border border-purple-200`;
      case "Staff":
        return `${baseClasses} bg-blue-100 text-blue-700 border border-blue-200`;
      case "Customer":
        return `${baseClasses} bg-amber-100 text-amber-700 border border-amber-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700 border border-gray-200`;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatLastLogin = (dateString) => {
    const now = new Date();
    const loginDate = new Date(dateString);
    const diffInHours = Math.floor((now - loginDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return formatDate(dateString);
  };

  const UserModal = ({ user, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              User Details
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={user?.avatar?.url}
                  alt={user.firstName}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h4 className="text-lg font-medium text-gray-900">
                    {user.firstName}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={getRoleBadge(user.role)}>{user.role}</span>
                    <span className={getStatusBadge(user.status)}>
                      {user.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {user.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Last login: {formatLastLogin(user.lastLogin)}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {user.role === "Customer" && (
                <>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">
                      Order Statistics
                    </h5>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Total Orders:</span>
                        <div className="font-semibold">{user.totalOrders}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Total Spent:</span>
                        <div className="font-semibold">
                          ${user.totalSpent.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Loyalty Points:</span>
                        <div className="font-semibold">
                          {user.loyaltyPoints}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Rating:</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-semibold">{user.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {user.favoriteItems.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">
                        Favorite Items
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {user.favoriteItems.map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              <div>
                <h5 className="font-medium text-gray-900 mb-2">Tags</h5>
                <div className="flex flex-wrap gap-2">
                  {user.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );



  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <StatisticsCard stats={stats} />
      {/* Main Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Enhanced Header search & filter */}
        <EnhancedHeader
          setAddUserModel={setAddUserModel}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterRole={filterRole}
          setFilterRole={setFilterRole}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
        />

        {/* Bulk Actions */}
        {selectedUsers?.length > 0 && (
          <div className="px-6 py-3 bg-blue-50 border-b border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700 font-medium">
                {selectedUsers.length} user{selectedUsers.length > 1 ? "s" : ""}{" "}
                selected
              </span>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                  Send Email
                </button>
                <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors">
                  Activate
                </button>
                <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors">
                  Deactivate
                </button>
              </div>
            </div>
          </div>
        )}
        {/* User Table */}
        <div className="overflow-x-auto min-h-96">
      {isLoading ? <LoadingComponent />:(
          <UserTable
          selectedUsers={selectedUsers}
          sortBy={sortBy}
          sortOrder={sortOrder}
          handleSort={handleSort}
          paginatedUsers={paginatedUsers}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleSelectAll={handleSelectAll}
          handleSelectUser={handleSelectUser}
          getRoleBadge={getRoleBadge}
          getStatusBadge={getStatusBadge}
          formatLastLogin={formatLastLogin}
          formatDate={formatDate}
          setSelectedUser={setSelectedUser}
          setShowUserModal={setShowUserModal}
          totalPages={totalPages}
          searchTerm={searchTerm}
          filterRole={filterRole}
          filterStatus={filterStatus}
          startIndex={startIndex}
          filteredUsers={filteredUsers}
          setEditModel={setEditModel}
          setEditUserData={setEditUserData}
          setDeleteModel={setDeleteModel}
          setDeleteUserDetail={setDeleteUserDetail}
        />
       
      ) }
       
      </div>


        
      
      </div>

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => setShowUserModal(false)}
        />
      )}

      {eiditmodal && (
        <EditModal
          data={editUserData}
          onClose={() => {
            setEditModel(false);
            setEditUserData(null);
          }}
        />
      )}
       {deletemodal && (
        <DeleteUserModal
          data={deleteUserDetail}
          onClose={() => {
            setDeleteModel(false);
            setDeleteUserDetail(null);
          }}
        />
      )}

      {/* Quick Action Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          <button
            onClick={() => setShowBulkActions(!showBulkActions)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl">
            <MoreVertical className="w-6 h-6" />
          </button>

          {showBulkActions && (
            <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-2 min-w-48">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center transition-colors">
                <UserPlus className="w-4 h-4 mr-3" />
                Add New User
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center transition-colors">
                <Download className="w-4 h-4 mr-3" />
                Export All Data
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center transition-colors">
                <Upload className="w-4 h-4 mr-3" />
                Import Users
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center transition-colors">
                <Mail className="w-4 h-4 mr-3" />
                Send Newsletter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;
