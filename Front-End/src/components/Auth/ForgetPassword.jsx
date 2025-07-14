import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // This is where you would typically send a reset email
      if (email && email.includes("@")) {
        setIsSubmitted(true);
      } else {
        setError("Please enter a valid email address");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-amber-500 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Rasoi Reverie</h1>
          <p className="text-white/80 mt-1">Admin Portal</p>
        </div>
        
        <div className="p-6 sm:p-8">
          {!isSubmitted ? (
            <>
              <div className="flex justify-center mb-6">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">
                Forgot Password
              </h2>
              
              <p className="text-center text-gray-600 mb-8">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 text-sm text-center font-medium">
                  {error}
                </div>
              )}
              
              <div>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="admin@rasoi.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        "Send Reset Link"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Check your email</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  We've sent a password reset link to
                </p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {email}
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  If you don't see it, please check your spam folder.
                </p>
              </div>
            </div>
          )}
          
          <div className="mt-6">
            <div className="flex items-center justify-center">
              <ArrowLeft className="h-4 w-4 text-amber-600 mr-2" />
              <a className="text-amber-600 hover:text-amber-500 text-sm font-medium cursor-pointer">
                Back to Login
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="hidden lg:block fixed bottom-0 right-0 -z-10">
        <div className="w-64 h-64 bg-amber-400 rounded-full opacity-10 transform translate-x-1/4 translate-y-1/4"></div>
      </div>
      <div className="hidden lg:block fixed top-0 left-0 -z-10">
        <div className="w-96 h-96 bg-green-400 rounded-full opacity-10 transform -translate-x-1/3 -translate-y-1/3"></div>
      </div>
    </div>
  );
}