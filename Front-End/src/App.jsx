import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "./Redux/AuthSlice";
import AOS from "aos";
import "aos/dist/aos.css";

import { checkAndRefreshToken } from "./utils/tokenManger";

import { getCartItems } from "./Redux/cartSlice";

function App() {
  const dispatch = useDispatch();
  const {isAuthenticate,user}=useSelector((state)=>state.auth)
  useEffect(() => {
    if (!isAuthenticate&& !user) return
    dispatch(getCartItems());
  }, []);

  useEffect(() => {
    AOS.init({ duration: 2000 });
    AOS.refresh();
  }, []);

  useEffect(() => {
    // This will only refresh if the token is expired
    const handaler = async () => {
     
      const validToken = await checkAndRefreshToken();
      if (validToken) {
        // Token is valid (either existing or newly refreshed)
      } else {
        // No token or refresh failed - user needs to login
        console.log("User needs to login");
      }
      dispatch(checkUser());
    };
    handaler();
  }, []);

  return (
    <GoogleOAuthProvider clientId="299868435799-b9qvbefu5fgn6330vst53snkk1p90jfk.apps.googleusercontent.com">
     
      <div className="w-full h-full bg-gray-100">
        <ToastContainer />
        <Outlet />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
