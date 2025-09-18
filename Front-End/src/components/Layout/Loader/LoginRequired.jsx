import React, { useState } from 'react';
import { X, Lock, User, ShoppingCart, Heart, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginRequiredModal() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate=useNavigate()
 

  const handleLogin = () => {
    // Redirect to login page or open login modal
    navigate("/auth/login")
    setIsOpen(false);
  };

  const handleSignUp = () => {
    // Redirect to signup page
    navigate("/auth/singup")
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-60 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 px-8 py-5 text-center">
            <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
              <Lock className="h-6 w-6 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Login Required
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Please sign in to access this feature and enjoy a personalized dining experience
            </p>
          </div>

          {/* Benefits Section */}
          <div className="px-8 py-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Why create an account?
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Easy Ordering</h4>
                  <p className="text-sm text-gray-600">Save your favorite orders and reorder with one click</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Personalized Experience</h4>
                  <p className="text-sm text-gray-600">Get recommendations based on your preferences</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Order History</h4>
                  <p className="text-sm text-gray-600">Track your orders and view past purchases</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-4 pb-4 pt-5 space-y-3">
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-3 rounded-xl hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Sign In to Continue
            </button>
            
            <button
              onClick={handleSignUp}
              className="w-full bg-white text-gray-700 font-semibold py-2 px-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-200"
            >
              Create New Account
            </button>

            <div className="text-center pt-4">
              <button
                onClick={handleClose}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Continue browsing without account
              </button>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
}