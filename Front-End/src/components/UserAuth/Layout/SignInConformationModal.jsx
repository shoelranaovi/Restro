import React, { useState, useEffect } from "react";
import { CheckCircle, X, ChefHat, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignupConfirmationModal({ setIsSubmitted }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate=useNavigate()

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);
    // Trigger success animation
    setTimeout(() => setShowSuccess(true), 600);
  }, []);

//   const handleClose = () => {
//     setIsVisible(false);
//     setTimeout(() => setIsSubmitted(false), 300);
//   };

  const navigateToHome = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsSubmitted(false);
      navigate("/")
      console.log("Navigating to home page...");
    }, 300);
  };

  return (
    <div className={`fixed inset-0 bg-black transition-all duration-500 flex items-center justify-center p-4 z-50 ${
      isVisible ? 'bg-opacity-60' : 'bg-opacity-0'
    }`}>
      <div className={`bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden transform transition-all duration-500 ${
        isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
      }`}>
        
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 opacity-50"></div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-orange-300 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-8 w-1 h-1 bg-red-300 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse delay-700"></div>

        {/* Close button */}

        {/* Main content */}
        <div className="px-8 py-8 relative z-10">
          <div className="text-center mb-8">
            {/* Animated success icon */}
            <div className={`relative w-24 h-24 mx-auto mb-6 transform transition-all duration-700 ${
              showSuccess ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
            }`}>
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center relative overflow-hidden">
                {/* Ripple effect */}
                <div className={`absolute inset-0 bg-green-200 rounded-full transform transition-all duration-1000 ${
                  showSuccess ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
                }`}></div>
                <CheckCircle className={`w-12 h-12 text-green-500 relative z-10 transform transition-all duration-500 delay-300 ${
                  showSuccess ? 'scale-100' : 'scale-0'
                }`} />
              </div>
              
              {/* Sparkle effects */}
              <Sparkles className={`absolute -top-2 -right-2 w-6 h-6 text-yellow-400 transform transition-all duration-700 delay-500 ${
                showSuccess ? 'scale-100 opacity-100 rotate-12' : 'scale-0 opacity-0 rotate-0'
              }`} />
              <Sparkles className={`absolute -bottom-1 -left-1 w-4 h-4 text-pink-400 transform transition-all duration-700 delay-700 ${
                showSuccess ? 'scale-100 opacity-100 rotate-45' : 'scale-0 opacity-0 rotate-0'
              }`} />
            </div>

            <h3 className={`text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3 transform transition-all duration-500 delay-400 ${
              showSuccess ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              Account Login Successfully!
            </h3>
            <p className={`text-gray-600 text-base leading-relaxed transform transition-all duration-500 delay-500 ${
              showSuccess ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              Welcome Back! 🎉
            </p>
          </div>

          {/* Action button */}
          <div className={`transform transition-all duration-500 delay-600 ${
            showSuccess ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <button
              onClick={navigateToHome}
              className="group w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-4 px-6 rounded-xl font-semibold relative overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-200"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Button content */}
              <div className="relative flex items-center justify-center gap-2">
                <ChefHat className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Continue to Home Page</span>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom decorative wave */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-orange-100 via-red-100 to-pink-100 opacity-50">
          <svg viewBox="0 0 400 20" className="w-full h-full">
            <path
              d="M0,10 Q100,0 200,10 T400,10 L400,20 L0,20 Z"
              fill="currentColor"
              className="text-orange-200 animate-pulse"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}