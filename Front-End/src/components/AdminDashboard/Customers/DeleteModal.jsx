import React, { useState } from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '@/Redux/AuthSlice';

const DeleteUserModal = ({ data, onClose }) => {

    const isLoading=false
    const dispatch=useDispatch()

  


    const handleSubmit = (e) => {
        e.preventDefault();
    
        dispatch(deleteUser({  userId: data._id }));
    
        // Handle form submission logic here
        // Close the modal after submission
        onClose();
      };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
      {/* Background overlay */}
      <div 
        className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
        onClick={onClose}
      />
      
      {/* Modal panel */}
      <div className="relative inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
       
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal content */}
        <div className="flex items-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Delete User Account
            </h3>
          </div>
        </div>

        {/* User info */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to delete this user account? This action cannot be undone.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {data.firstName.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{data.firstName} {data.lastName}</p>
                <p className="text-sm text-gray-500">{data.email}</p>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full mt-1">
                  {data.role}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-red-600 mt-3 font-medium">
            ⚠️ This will permanently delete all user data, including their profile, activity history, and associated records.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
       
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
          onClick={handleSubmit}
        
        
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
                 {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete User
                    </>
                  )}
          </button>
        </div>
      </div>
    </div>
  </div>
   
  );
};

export default DeleteUserModal;