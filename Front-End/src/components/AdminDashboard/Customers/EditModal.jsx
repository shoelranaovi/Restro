/* eslint-disable no-unused-vars */
import { updateUserAdmin } from "@/Redux/AuthSlice";
import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function EditModal({ data, onClose }) {

  const { isLoading } = useSelector((state) => state.auth);
  const [fromData, setFromData] = useState({
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    role: data.role || "Customer",
    status: data.status || "Active",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUserAdmin({ fromData, userId: data._id })).then((data=>{
      if (data.payload.success) {
      
        toast.success("update successfully")
        onClose()
        
      }
    }))

    // Handle form submission logic here
    // Close the modal after submission
  };

  return (
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
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name :
                  </label>
                  <input
                    type="text"
                    value={fromData.firstName}
                    onChange={(e) =>
                      setFromData({ ...fromData, firstName: e.target.value })
                    }
                    className="mt-1 block w-full p-4 bg-gray-200 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name :
                  </label>
                  <input
                    type="text"
                    value={fromData.lastName}
                    onChange={(e) =>
                      setFromData({ ...fromData, lastName: e.target.value })
                    }
                    className="mt-1 block w-full p-4 bg-gray-300 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role :
                  </label>
                  <select
                    value={fromData.role}
                    onChange={(e) =>
                      setFromData({ ...fromData, role: e.target.value })
                    }
                    className="mt-1 block w-full p-4 bg-gray-300 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    <option value="Customer">Customer</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Staff">Chef</option>
                    <option value="Delivery">Delivery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status :
                  </label>
                  <select
                    value={fromData.status}
                    onChange={(e) =>
                      setFromData({ ...fromData, status: e.target.value })
                    }
                    className="mt-1 block w-full p-4 bg-gray-300 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 py-2 text-white font-semibold px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>{" "}
                    <p> place wait</p>{" "}
                  </div>
                ) : (
                  "Save Changes"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
