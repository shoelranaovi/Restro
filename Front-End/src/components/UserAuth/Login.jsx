import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ChefHat, Utensils } from 'lucide-react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginwithPassword } from '@/Redux/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import SignInConfirmationModal from './Layout/SignInConformationModal';
import MetaData from '../Layout/MetaData/MetaData';
import LoadingBtn from '../Layout/Loader/LoadingBtn';


const initialData={
  email: '',
  password: ''
}

export default function RestaurantLogin() {
  const [formData, setFormData] = useState(initialData);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [IsSubmitted,setIsSubmitted]=useState(false)
  const {isLoading}=useSelector((state)=>state.auth)
  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch()



  const handleGoogleLogin = () => {
    setLoading(true)
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`; // Your backend Google route
  };
  const handleFacebookLogin = () => {
    setLoading(true)
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/facebook`; // Your backend Google route
  };
 
  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password)
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field on blur
    let error = '';
    if (name === 'email') {
      error = validateEmail(value);
    } else if (name === 'password') {
      error = validatePassword(value);
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async () => {
    // Mark all fields as touched
    setTouched({ email: true, password: true });
    
    if (!validateForm()) {
      return;
    }


    
    // Simulate API call
    dispatch(loginwithPassword(formData)).then((data)=>{
      console.log(data)
      try {
        
        if(data.payload.success){
      
          setFormData(initialData)
          setIsSubmitted(true)
  
  
        }else{
  
          toast.error(data.payload.message)
        }
        console.log(data)
      } catch (error) {
        console.log(error)
        toast.error("some went Wrong ......")
        
      }
    
    })
    
  
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
       <MetaData title ="Welcome Back | Log In to"/>
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
      </div>

      <div className="w-full max-w-md relative">
        {/* Main Login Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.02] transition-all duration-500">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4 shadow-lg transform hover:rotate-12 transition-transform duration-300">
              <ChefHat className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600 mt-2">Sign in to your restaurant dashboard</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-200" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70 ${
                    errors.email && touched.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                  placeholder="jhon@restaurant.com"
                />
              </div>
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-200" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70 ${
                    errors.password && touched.password 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-orange-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-orange-500" />
                  )}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded transition-colors duration-200"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link
              to={"/auth/forgetpass"}
                type="button"
                className="text-sm text-orange-600 hover:text-orange-800 font-medium transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                 <LoadingBtn/>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>

           {/* Social Signup */}
           <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {
                loading ? <LoadingBtn /> :   <span className="ml-2">Google</span>
              }
            
            </button>
            <button
            onClick={handleFacebookLogin}
            disabled={loading}
              type="button"
              className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02]"
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              
                 {
                  loading ? <LoadingBtn /> :  <span className="ml-2">Facebook</span>
                }
              
              
            </button>
          </div>

     

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
            <Link to="/auth/signup">
            <button className="font-medium text-orange-600 hover:text-orange-800 transition-colors duration-200">
                Sign up for free
              </button>
            </Link>
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-40 animate-bounce"></div>
      </div>

   {
   IsSubmitted && <SignInConfirmationModal setIsSubmitted={setIsSubmitted} />
   }
       
    </div>
  );
}