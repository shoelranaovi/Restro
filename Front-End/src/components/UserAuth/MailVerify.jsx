import React from 'react';
import { CheckCircle, Mail } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function EmailVerifiedPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  
  const navigate=useNavigate()
  const handleContinue = () => {
    navigate("/auth/login")
    // Handle navigation to dashboard or login
    console.log('Continue to dashboard');
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
      {/* Background decorative circles */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-orange-200 rounded-full opacity-60"></div>
      <div className="absolute top-32 left-16 w-12 h-12 bg-red-200 rounded-full opacity-40"></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 bg-pink-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-32 right-32 w-8 h-8 bg-orange-300 rounded-full opacity-30"></div>
      
      {/* Main card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative z-10">
        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            {/* Small decorative circle */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-300 rounded-full opacity-80"></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Email Verified!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          Your email has been successfully verified. You can now access your restaurant dashboard.
        </p>

        {/* Email display */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center gap-3">
          <Mail className="w-5 h-5 text-gray-500" />
          <span className="text-gray-700 text-sm">{email} </span>
          <div className="ml-auto">
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-4"
        >
          Continue to Log in page
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Need help?</span>
          </div>
        </div>

        {/* Footer links */}
        <div className="text-center space-y-2">

          <div className="text-gray-500 text-xs">
            Having trouble? <a href="#" className="text-orange-600 hover:text-orange-700">Contact support</a>
          </div>
        </div>
      </div>
    </div>
  );
}