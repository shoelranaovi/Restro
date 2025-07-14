import React, { useState } from "react";
import {
  Lock,
  ArrowLeft,
  ChefHat,
  Utensils,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPass } from "@/Redux/AuthSlice";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

export default function ResetPass() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { resetToken } = useParams();
  const dispatch = useDispatch();
  const {isLoading}=useSelector((state)=>state.auth)
  const navigate=useNavigate()

  const validatePassword = (password) => {
    if (!password.trim()) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/(?=.*[a-z])/.test(password))
      return "Password must contain at least one lowercase letter";
    if (!/(?=.*[A-Z])/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/(?=.*\d)/.test(password))
      return "Password must contain at least one number";
    return "";
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword.trim()) return "Please confirm your password";
    if (confirmPassword !== formData.password) return "Passwords do not match";
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const errorMsg =
        name === "password"
          ? validatePassword(value)
          : validateConfirmPassword(value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }

    // Also validate confirm password when password changes
    if (name === "password" && touched.confirmPassword) {
      const confirmError =
        formData.confirmPassword !== value ? "Passwords do not match" : "";
      setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg =
      field === "password"
        ? validatePassword(formData[field])
        : validateConfirmPassword(formData[field]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };



  const handleBackToLogin = () => {
    setIsSubmitted(false);
    setFormData({ password: "", confirmPassword: "" });
    setErrors({});
    setTouched({});
    navigate("/")
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-emerald-500",
  ];
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword
    );

    setTouched({ password: true, confirmPassword: true });
    setErrors({
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (passwordError || confirmPasswordError) return;

    const formData2 = {
      resetToken,
      password: formData.password,
    };

    dispatch(resetPass(formData2)).then((data) => {
      console.log(data);
      try {
        if (data.payload.success) {
          toast.success(data.payload.message);

          setIsSubmitted(true);
        } else {
          toast.error(data.payload.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("some went Wrong ......");
      }
    });
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
                  <Lock className="text-white" size={32} />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Reset Password
                </h1>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Choose a strong password to secure your restaurant account.
                </p>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-200" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("password")}
                      className={`block w-full pl-10 pr-12 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70 text-lg ${
                        errors.password && touched.password
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-orange-500"
                      }`}
                      placeholder="Enter your new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex space-x-1 mb-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`h-2 flex-1 rounded ${
                              i <= getPasswordStrength(formData.password)
                                ? strengthColors[
                                    getPasswordStrength(formData.password) - 1
                                  ]
                                : "bg-gray-200"
                            } transition-colors duration-200`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">
                        Password strength:{" "}
                        {strengthLabels[
                          getPasswordStrength(formData.password) - 1
                        ] || "Very Weak"}
                      </p>
                    </div>
                  )}

                  {errors.password && touched.password && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-200" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("confirmPassword")}
                      className={`block w-full pl-10 pr-12 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70 text-lg ${
                        errors.confirmPassword && touched.confirmPassword
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-orange-500"
                      }`}
                      placeholder="Confirm your new password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Password must contain:
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          formData.password.length >= 8
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      ></span>
                      At least 8 characters
                    </li>
                    <li className="flex items-center">
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          /[a-z]/.test(formData.password)
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      ></span>
                      One lowercase letter
                    </li>
                    <li className="flex items-center">
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          /[A-Z]/.test(formData.password)
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      ></span>
                      One uppercase letter
                    </li>
                    <li className="flex items-center">
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          /\d/.test(formData.password)
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      ></span>
                      One number
                    </li>
                  </ul>
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
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Updating Password...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Lock size={18} />
                      <span>Update Password</span>
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
                  Password Updated!
                </h1>

                <div className="space-y-4 mb-8">
                  <p className="text-gray-600 leading-relaxed">
                    Your password has been successfully updated. You can now use
                    your new password to access your restaurant account.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-700">
                      For security, you've been logged out of all devices.
                      Please log in again with your new password.
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="space-y-3">
                  <button
                    onClick={handleBackToLogin}
                    className="w-full flex items-center justify-center space-x-2 py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transform hover:scale-[1.02] transition-all duration-200"
                  >
                    <span>Continue to Login</span>
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
