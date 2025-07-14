import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [authData, setAuthData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(authData);

  useEffect(() => {
    const processAuth = () => {
      try {
        // Simulate extracting from URL (in real app, use window.location.search)
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get("token");
        const userString = urlParams.get("user");

        if (token) {
          // In your real app, you would do:
          // localStorage.setItem('access-token', token);

          // Store in component state for demo
          const authInfo = { token };

          if (userString) {
            try {
              const user = JSON.parse(decodeURIComponent(userString));
              authInfo.user = user;
              localStorage.setItem("accessToken", token);
            } catch (e) {
              console.error("Failed to parse user data:", e);
            }
          }

          setAuthData(authInfo);

          // Simulate processing delay then redirect
          setTimeout(() => {
            setIsProcessing(false);
            navigate("/");
          }, 2000);
        } else {
          console.error("No token found in URL");
          setIsProcessing(false);
        }
      } catch (error) {
        console.error("Error processing authentication:", error);
        setIsProcessing(false);
      }
    };

    processAuth();
  }, []);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <svg
              className="animate-spin h-16 w-16 text-green-500 mx-auto"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Authentication Successful!
          </h1>
          <p className="text-gray-600 mb-2">Processing your login...</p>
          <p className="text-sm text-gray-500">
            Storing access token and user data...
          </p>
          <div className="mt-6 text-xs text-gray-400">
            <p>✓ Token extracted from URL</p>
            <p>✓ Parsing user information</p>
            <p>→ Preparing redirect to home page</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Login Successful!
            </h1>
            <p className="text-gray-600">
              Welcome back, {authData?.user?.firstName || "User"}!
            </p>
          </div>

          {authData?.user && (
            <div className="bg-gray-50 rounded-md p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-700 mb-2">
                User Information:
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {authData.user.firstName} {authData.user.lastName}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {authData.user.email}
                </p>
                <p>
                  <span className="font-medium">Role:</span>{" "}
                  {authData.user.role}
                </p>
                <p>
                  <span className="font-medium">Provider:</span>{" "}
                  {authData.user.authProvider}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => alert("In real app: navigate to home page")}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
              Continue to Dashboard
            </button>

            <div className="text-xs text-gray-500">
              <p>✓ Access token stored successfully</p>
              <p>✓ User session initialized</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccess;
