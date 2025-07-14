import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider, useGoogleOneTapLogin, googleLogout } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUser, clearUser } from "./Redux/AuthSlice";
import AOS from "aos";
import "aos/dist/aos.css";

// Environment variable for client ID (recommended for security)
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "299868435799-b9qvbefu5fgn6330vst53snkk1p90jfk.apps.googleusercontent.com";

// ✅ Improved one-tap response handler with better error handling
const handleOneTapResponse = async (response, dispatch) => {
  if (!response?.credential) {
    toast.error("Invalid authentication response");
    return;
  }

  try {
    const result = await fetch("/api/auth/google/one-tap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        credential: response.credential,
      }),
    });

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    const data = await result.json();

    if (data.success) {
      dispatch(checkUser(data.user));
      toast.success(data.message || "Logged in successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error(data.message || "Login failed.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  } catch (error) {
    console.error("One-tap authentication error:", error);
    toast.error("Authentication failed. Please try again.", {
      position: "top-right",
      autoClose: 5000,
    });
  }
};

// ✅ Logout handler
const handleLogout = async (dispatch) => {
  try {
    // Call backend logout endpoint
    const result = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    const data = await result.json();

    if (data.success) {
      // Google logout
      googleLogout();
      
      // Clear Redux state
      dispatch(clearUser());
      
      toast.success("Logged out successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error(data.message || "Logout failed.");
    }
  } catch (error) {
    console.error("Logout error:", error);
    // Still clear local state even if server logout fails
    googleLogout();
    dispatch(clearUser());
    toast.warning("Logged out locally. Please clear your browser cache if needed.");
  }
};

// ✅ Component to handle Google One Tap login
function GoogleOneTapLoginWrapper() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);

  const handleSuccess = useCallback((credentialResponse) => {
    console.log("One Tap Success:", credentialResponse);
    handleOneTapResponse(credentialResponse, dispatch);
  }, [dispatch]);

  const handleError = useCallback(() => {
    console.log("One Tap Login Failed");
    toast.error("One Tap Login Failed", {
      position: "top-right",
      autoClose: 5000,
    });
  }, []);

  useGoogleOneTapLogin({
    onSuccess: handleSuccess,
    onError: handleError,
    // Only show one-tap if user is not already logged in
    disabled: !!user,
  });

  return null;
}

// ✅ Custom hook for logout functionality
export const useLogout = () => {
  const dispatch = useDispatch();
  
  return useCallback(() => {
    handleLogout(dispatch);
  }, [dispatch]);
};

// ✅ Main App component
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize AOS animations
    AOS.init({ 
      duration: 1000,
      once: true, // Animation happens only once
      offset: 100,
    });
    
    // Check if user is already authenticated on app load
    const checkAuthStatus = async () => {
      try {
        const result = await fetch("/api/auth/check", {
          credentials: "include",
        });
        
        if (result.ok) {
          const data = await result.json();
          if (data.success && data.user) {
            dispatch(checkUser(data.user));
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleOneTapLoginWrapper />
      <div className="w-full min-h-screen bg-gray-100">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Outlet />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;