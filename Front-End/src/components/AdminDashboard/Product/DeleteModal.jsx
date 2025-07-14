/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { X, AlertTriangle, Trash2, Package, DollarSign, Tag } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteproduct } from '@/Redux/ProductSlice';
import { toast } from 'react-toastify';

const DeleteProductModal = ({product,onClose}) => {

  // Sample product data
  const dispatch=useDispatch()
 

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(deleteproduct({  ProductId: product._id })).then((data)=>{
        console.log(data)
        if(data.payload.success){
            toast.success(data.payload.message || "product Delete successfull")
            onClose();
        }
    })

    // Handle form submission logic here
    // Close the modal after submission
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
   

      {/* Modal Overlay */}
   
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={onClose}
            />
            
            {/* Modal panel */}
            <div className="relative inline-block w-full max-w-lg p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
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
                    Delete Product
                  </h3>
                </div>
              </div>

              {/* Product info */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-4">
                  Are you sure you want to delete this product? This action cannot be undone.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={product.images[0].url} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                      <p className="text-sm text-gray-500 mb-2">ID: {product.id}</p>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span className="font-medium text-green-600">${product.price}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Package className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-600">{product.stock} in stock</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Tag className="w-4 h-4 text-purple-500" />
                          <span className="text-gray-600">{product.category}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-gray-600">{product.status}</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-2">SKU: {product.sku}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 font-medium mb-1">
                    ⚠️ Warning: This action will permanently delete:
                  </p>
                  <ul className="text-sm text-red-600 space-y-1">
                    <li>• Product information and description</li>
                    <li>• All product images and media</li>
                    <li>• Sales history and analytics data</li>
                    <li>• Customer reviews and ratings</li>
                    <li>• Inventory records</li>
                  </ul>
                </div>
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
        
                    <button className='flex'>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Product
                    </button>
        
                </button>
              </div>
            </div>
          </div>
        </div>
     
    </div>
  );
};

export default DeleteProductModal;