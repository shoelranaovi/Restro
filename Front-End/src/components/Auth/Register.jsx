import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "manager",
    agreeToTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const validateForm = () => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address";
    }
    
    // Validate password
    if (formData.password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    
    if (!/[A-Z]/.test(formData.password)) {
      return "Password must include at least one uppercase letter";
    }
    
    if (!/[a-z]/.test(formData.password)) {
      return "Password must include at least one lowercase letter";
    }
    
    if (!/[0-9]/.test(formData.password)) {
      return "Password must include at least one number";
    }
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }
    
    // Check if terms are agreed to
    if (!formData.agreeToTerms) {
      return "You must agree to the terms and conditions";
    }
    
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // This is where you would typically register the user
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
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
                  <User className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">
                Create Admin Account
              </h2>
              
              <p className="text-center text-gray-600 mb-8">
                Register to get access to the restaurant management system
              </p>
              
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 text-sm text-center font-medium">
                  {error}
                </div>
              )}
              
              <div className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                
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
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="admin@rasoi.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Admin Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="manager">Restaurant Manager</option>
                    <option value="chef">Head Chef</option>
                    <option value="inventory">Inventory Manager</option>
                    <option value="support">Customer Support</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="••••••••"
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Password must be at least 8 characters with uppercase, lowercase and numbers.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="••••••••"
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeToTerms" className="text-gray-600">
                      I agree to the <span className="text-amber-600 cursor-pointer">Terms of Service</span> and <span className="text-amber-600 cursor-pointer">Privacy Policy</span>
                    </label>
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
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
                
                <div className="text-center mt-2">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <a className="text-amber-600 hover:text-amber-500 font-medium cursor-pointer">
                      Log in
                    </a>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900">Registration Successful</h3>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Your admin account has been created successfully.
                </p>
                <p className="text-sm text-gray-600 font-medium mt-2">
                  {formData.email}
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  You can now log in with your credentials.
                </p>
              </div>
              <div className="mt-8">
                <button 
                  onClick={() => window.location.href = "/admin-login"}
                  className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                >
                  Go to Login
                </button>
              </div>
            </div>
          )}
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
