/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

function AuthenticationRoute({ children }) {
  const { isAuthenticate,user } = useSelector((state) => state.auth);
  const location = useLocation();


  if (!isAuthenticate && !user && !location.pathname.startsWith("/auth")) {
    console.log("Redirecting to login page");

    return <Navigate to="/auth/login" replace />;
  }


  if (isAuthenticate && location.pathname.includes("auth")) {
    console.log("Redirecting to home page");
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AuthenticationRoute;
