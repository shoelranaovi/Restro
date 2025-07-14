/* eslint-disable react/prop-types */

import {
  Edit,
  Eye,
  Mail,
  MapPin,
  Phone,
  Star,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";

function UserTable({
  selectedUsers,
  sortBy,
  sortOrder,
  handleSort,
  paginatedUsers,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  handleSelectAll,
  handleSelectUser,
  getRoleBadge,
  getStatusBadge,
  formatLastLogin,
  formatDate,
  setSelectedUser,
  setShowUserModal,
  totalPages,
  searchTerm,
  filterRole,
  filterStatus,
  startIndex,
  filteredUsers,
  setEditModel,
  setEditUserData,
  setDeleteModel,
  setDeleteUserDetail

}) {
  return (
    <div>
      {paginatedUsers && paginatedUsers.length > 0 ? (
        <div>
          {/* Enhanced Table */}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedUsers?.length === paginatedUsers?.length &&
                        paginatedUsers?.length > 0
                      }
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort("name")}>
                    <div className="flex items-center space-x-1">
                      <span>User</span>
                      {sortBy === "name" && (
                        <span className="text-blue-600">
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                    Contact & Location
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort("role")}>
                    <div className="flex items-center space-x-1">
                      <span>Role & Status</span>
                      {sortBy === "role" && (
                        <span className="text-blue-600">
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                    Performance
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden xl:table-cell">
                    Activity
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedUsers &&
                  paginatedUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          {
                            user.avatar?.url ?  (<img
                            className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100"
                            src={user.avatar?.url}
                            alt={user.name}
                          />) :(
                            <img
                            className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100"
                            src="https://th.bing.com/th/id/OIP.mYHS4Y_wgfQFF0sny-QVagAAAA?rs=1&pid=ImgDetMain"
                            alt={user.name}
                          />
                          )
                          }
                         
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-500 md:hidden">
                              {user.email}
                            </div>
                            {user.tags.includes("VIP") && (
                              <div className="flex items-center mt-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                                <span className="text-xs text-yellow-600 font-medium">
                                  VIP
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Mail className="w-3 h-3 mr-2 text-gray-400" />
                            {user.email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone className="w-3 h-3 mr-2 text-gray-400" />
                            {user.phone}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-2 text-gray-400" />
                            {user.address.street}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div>
                            <span className={getRoleBadge(user.role)}>
                              {user.role}
                            </span>
                          </div>
                          <div>
                            <span className={getStatusBadge(user.status)}>
                              {user.status}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        {user.role === "Customer" ? (
                          <div className="space-y-1">
                            <div className="text-sm text-gray-900 font-medium">
                              {user.totalOrders} orders
                            </div>
                            <div className="text-sm text-green-600 font-semibold">
                              ${user.totalSpent.toFixed(2)}
                            </div>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                              <span className="text-sm text-gray-600">
                                {user.rating}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">
                            Staff Member
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 hidden xl:table-cell">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-900">
                            {formatLastLogin(user.lastLogin)}
                          </div>
                          <div className="text-xs text-gray-500">
                            Joined {formatDate(user.joinDate)}
                          </div>
                          {user.orderFrequency && (
                            <div className="text-xs text-blue-600">
                              {user.orderFrequency} customer
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditModel(true);
                              setEditUserData(user);
                            }}
                            className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-50 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => {
                              setDeleteModel(true);
                              setDeleteUserDetail(user);
                            }} className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors">
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
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-semibold">{startIndex + 1}</span> to{" "}
                  <span className="font-semibold">
                    {Math.min(startIndex + itemsPerPage, filteredUsers?.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold">{filteredUsers?.length}</span>{" "}
                  users
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    Previous
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}>
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredUsers?.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No users found
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || filterRole !== "All" || filterStatus !== "All"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by adding your first user."}
              </p>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <UserPlus className="w-4 h-4 mr-2" />
                Add First User
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-6">No users found.</div>
      )}
    </div>
  );
}

export default UserTable;
