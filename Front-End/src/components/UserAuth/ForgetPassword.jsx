import React, { useState, useEffect } from 'react';
import { Mail, ArrowLeft, ChefHat, Utensils, Send, CheckCircle, Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { forgetpass } from '@/Redux/AuthSlice';
import { useNavigate } from 'react-router-dom';
import LoadingBtn from '../Layout/Loader/LoadingBtn';

export default function ForgotPass() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);
  
  const {isLoading} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Timer effect
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (touched) {
      const errorMsg = validateEmail(value);
      setError(errorMsg);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    const errorMsg = validateEmail(email);
    setError(errorMsg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email
    };
    
    const errorMsg = validateEmail(email);
    setTouched(true);
    setError(errorMsg);
    
    if (errorMsg) return;

    // Dispatch the forget password action
    dispatch(forgetpass(formData)).then((data) => {
      console.log(data);
      try {
        if (data.payload.success) {
          toast.success(data.payload.message);
          setIsSubmitted(true);
          // Start the resend timer
          setResendTimer(180);
          setCanResend(false);
        } else {
          toast.error(data.payload.message);
        }
        console.log(data);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong......");
      }
    });
  };

  const handleResendEmail = async () => {
    if (!canResend) return;
    
    const formData = {
      email
    };

    // Dispatch the forget password action again
    dispatch(forgetpass(formData)).then((data) => {
      try {
        if (data.payload.success) {
          toast.success("Reset link sent again!");
          // Restart the timer
          setResendTimer(180);
          setCanResend(false);
        } else {
          toast.error(data.payload.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong......");
      }
    });
  };

  const handleBackToLogin = () => {
    setIsSubmitted(false);
    setEmail('');
    setError('');
    setTouched(false);
    setResendTimer(0);
    setCanResend(true);
    navigate("/auth/login");
  };

  // Format timer display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-orange-500">
          <Utensils size={120} />
        </div>
        <div className="absolute top-1/4 right-20 text-red-500">
          <ChefHat size={80} />
        </div>
        <div className="absolute bottom-20 left-1/4 text-pink-500">
          <Utensils size={100} />
        </div>
        <div className="absolute bottom-10 right-10 text-orange-500">
          <ChefHat size={60} />
        </div>
        <div className="absolute top-1/2 left-1/3 text-red-400">
          <Utensils size={90} />
        </div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.01] transition-all duration-500">
          
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4 shadow-lg transform hover:rotate-12 transition-transform duration-300">
                  <Mail className="text-white" size={32} />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Forgot Password?
                </h1>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  No worries! Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-800 group-focus-within:text-orange-500 transition-colors duration-200" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`block w-full pl-10 pr-3 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70 text-lg ${
                        error && touched 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-orange-500'
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {error && touched && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {error}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <LoadingBtn />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send size={18} />
                      <span>Send Reset Link</span>
                    </div>
                  )}
                </button>
              </div>

              {/* Back to Login */}
              <div className="mt-8">
                <button
                  onClick={handleBackToLogin}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white/70 text-sm font-medium text-gray-700 hover:bg-white/90 hover:border-gray-400 transition-all duration-200 hover:scale-[1.01]"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Login</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6 shadow-lg">
                  <CheckCircle className="text-white" size={32} />
                </div>
                
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                  Check Your Email!
                </h1>
                
                <div className="space-y-4 mb-8">
                  <p className="text-gray-600 leading-relaxed">
                    We've sent a password reset link to:
                  </p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <p className="font-medium text-gray-800 break-all">{email}</p>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Didn't receive the email? Check your spam folder or try again with a different email address.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* Resend Button with Timer */}
                  <button
                    onClick={handleResendEmail}
                    disabled={!canResend || isLoading}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                      canResend && !isLoading
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <LoadingBtn />
                      </div>
                    ) : !canResend ? (
                      <div className="flex items-center space-x-2">
                        <Clock size={16} />
                        <span>Resend in {formatTime(resendTimer)}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send size={16} />
                        <span>Resend Email</span>
                      </div>
                    )}
                  </button>
                  
                  {/* Timer Display */}
                  {!canResend && (
                    <div className="text-center">
                      <p className="text-xs text-gray-500">
                        You can request a new reset link in {formatTime(resendTimer)}
                      </p>
                    </div>
                  )}
                  
                  <button
                    onClick={handleBackToLogin}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white/70 text-sm font-medium text-gray-700 hover:bg-white/90 hover:border-gray-400 transition-all duration-200 hover:scale-[1.01]"
                  >
                    <ArrowLeft size={16} />
                    <span>Back to Login</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute top-1/3 -left-3 w-4 h-4 bg-gradient-to-r from-red-400 to-pink-400 rounded-full opacity-30 animate-pulse"></div>
        
        {/* Success Confetti Effect (only when submitted) */}
        {isSubmitted && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <div className="absolute top-20 right-16 w-1 h-1 bg-emerald-400 rounded-full animate-bounce"></div>
            <div className="absolute bottom-16 left-20 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-8 w-1 h-1 bg-emerald-500 rounded-full animate-ping"></div>
          </div>
        )}
      </div>
    </div>
  );
}