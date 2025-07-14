import { google_on_Tap } from "@/Redux/AuthSlice";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export const handleOneTapResponse = async (response, dispatch, navigate) => {
  if (!response?.credential) {
    toast.error("Invalid authentication response");
    return;
  }
  const formData = {
    credential: response.credential,
  };

  try {
    // Simulate API call
    dispatch(google_on_Tap(formData)).then((data) => {
      console.log(data);
      try {
        if (data.payload.success) {
          toast.success(data.payload.message);

          navigate("/");
        } else {
          toast.error(data.payload.message);
        }
        console.log(data);
      } catch (error) {
        console.log(error);
        toast.error("some went Wrong ......");
      }
    });
  } catch (error) {
    console.error("One-tap authentication error:", error);
    toast.error("Authentication failed. Please try again.", {
      position: "top-right",
      autoClose: 5000,
    });
  }
};

// Custom wrapper to use One Tap Login inside the Provider
export function GoogleOneTapLoginWrapper() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user}=useSelector((state)=>state.auth)
 

  const handleSuccess = useCallback(
    (credentialResponse) => {
      console.log("One Tap Success:", credentialResponse);
      handleOneTapResponse(credentialResponse, dispatch, navigate);
    },
    [dispatch]
  );

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


// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { google_on_Tap } from "@/Redux/AuthSlice";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// export function GoogleOneTapManual() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);
//   console.log(user);
//   console.log( import.meta.env.VITE_GOOGLE_CLIENT_ID)
  

//   useEffect(() => {
//     // Don't initialize if user already exists
//     if (user) return;

//     /* Load Google One Tap */
//     window.google?.accounts.id.initialize({
//       client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
//       callback: async (response) => {
//         if (!response?.credential) {
//           toast.error("No credential received from Google");
//           return;
//         }

//         const formData = {
//           credential: response.credential,
//         };

//         try {
//           const data = await dispatch(google_on_Tap(formData));

//           if (data?.payload?.success) {
//             toast.success(data.payload.message);
//             navigate("/");
//           } else {
//             toast.error(data?.payload?.message || "Authentication failed");
//           }
//         } catch (error) {
//           console.error("One Tap Auth Error:", error);
//           toast.error("Authentication failed. Please try again.");
//         }
//       },
//       cancel_on_tap_outside: false,
//     });

//     // Show prompt + listen to user interaction
//     window.google?.accounts.id.prompt((notification) => {
//       if (notification.isNotDisplayed()) {
//         console.log("Not Displayed Reason:", notification.getNotDisplayedReason());
//         toast.info(`Google One Tap not displayed: ${notification.getNotDisplayedReason()}`);
//       } else if (notification.isSkippedMoment()) {
//         console.log("Skipped Reason:", notification.getSkippedReason());
//         toast.info(`Google One Tap skipped: ${notification.getSkippedReason()}`);
//       } else if (notification.isDismissedMoment()) {
//         console.log("User dismissed the One Tap prompt");
//         toast.info("User dismissed the One Tap prompt");
//       }
//     });
//   }, [dispatch, navigate, user]);

//   return null;
// }
