import React, { useState, useEffect } from "react";
import { CheckCircle, Mail, X, ChefHat } from "lucide-react";
import LoadingBtn from "@/components/Layout/Loader/LoadingBtn";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { resendRegisterLink } from "@/Redux/AuthSlice";

export default function SignupConfirmationModal({
  email,
  setIsSubmitted,
  setSuccessMail,
}) {
  const{isLoading}=useSelector((state)=>state.auth)
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  useEffect(() => {
    setTimer(120);
    setCanResend(false);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleClose = () => {
    setIsSubmitted(false);
  };

  const naigateToLogin = () => {
    navigate("/auth/login");
    handleClose();
    setSuccessMail("");
  };

  const handleResendEmail = async () => {
    if (!canResend) return;

 


    try {
      const formData = { email:email };
      // Simulate API call
      dispatch(resendRegisterLink(formData)).then((data) => {
        console.log(data);
        try {
          if (data.payload.success) {
            setTimer(120);
            setCanResend(false);
            toast.success(data.payload.message);
          } else {
            toast.error(data.payload.message);
          }
          console.log(data);
        } catch (error) {
          console.log(error);
          toast.error("some went Wrong ......");
        }
      });

      // Start 2-minute timer (120 seconds)
      setTimer(120);
    } catch (error) {
      console.error("Error resending email:", error);
      setCanResend(true);
    } 
  };

  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-h-[95vh] max-w-md w-full mx-4 relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
        >
          <X size={24} />
        </button>

        {/* Main content */}
        <div className="px-8 py-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Account Created Successfully!
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We've sent a verification email to confirm your account and get
              you started.
            </p>
          </div>

          {/* Email display */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Verification email sent to:
                </p>
                <p className="font-medium text-gray-800">{email}</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-3">What's next?</h4>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-orange-600 text-xs font-bold">1</span>
                </div>
                <p className="text-sm text-gray-600">
                  Check your email inbox and spam folder
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-orange-600 text-xs font-bold">2</span>
                </div>
                <p className="text-sm text-gray-600">
                  Click the verification link in the email
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-orange-600 text-xs font-bold">3</span>
                </div>
                <p className="text-sm text-gray-600">
                  Start exploring amazing recipes and restaurants
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={naigateToLogin}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105"
            >
              Continue to LogIn page
            </button>

            <button
              onClick={handleResendEmail}
              disabled={!canResend || isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium transition-all duration-200 transform ${
                canResend && !isLoading
                  ? "bg-gradient-to-r from-orange-300 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <LoadingBtn text=" Resend mail wait..." />
              ) : !canResend ? (
                `Resend available in ${formatTime(timer)}`
              ) : (
                "Resend Verification Email"
              )}
            </button>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-gray-500 mt-4">
            Didn't receive the email? Check your spam folder or contact support.
          </p>
        </div>
      </div>
    </div>
  );
}
