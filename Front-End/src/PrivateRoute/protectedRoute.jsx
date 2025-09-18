/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { isAuthenticate, user } = useSelector((state) => state.auth);
  const location = useLocation();

  // যদি login না করা থাকে এবং path admin বা profile হয়
  if (
    !isAuthenticate &&
    (location.pathname.startsWith("/admin") ||
      location.pathname.startsWith("/profile"))
  ) {
    console.log("Redirecting to login page");
    return <Navigate to="/auth/login" replace />;
  }

  // যদি admin route এ যায় কিন্তু role Admin না হয়
  if (isAuthenticate && location.pathname.startsWith("/admin")) {
    if (user?.role !== "Admin") {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

export default PrivateRoute;
