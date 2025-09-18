import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound";
import AboutPageLayout from "./components/About/AboutPageLayout";

import ChefLayout from "./components/Chefs/ChefLayout";
import ManuLayout from "./components/Menu.jsx/ManuLayout";
import BlogLayout from "./components/Blog/BlogLayout";
import ReservationLayout from "./components/Reservation/ReservationLayout";
import ServiceLayout from "./components/Service/ServiceLayout";
import ContactLayout from "./components/Contact/ContactLayout";
import SinglePostLayout from "./components/SinglePost/SinglePostLayout";
import QuoteLayout from "./components/Quote/QuoteLayout";

import Analytics from "./components/AdminDashboard";
import RestaurantLogin from "./components/UserAuth/Login";
import UserSignup from "./components/UserAuth/Signup";
import ForgotPass from "./components/UserAuth/ForgetPassword";
import ResetPass from "./components/UserAuth/ResetPass";
import AdminLogger from "./components/AdminDashboard/AdminLogger";
import RestaurantMenus from "./components/Menu.jsx/Restaurant-menu";
import RestaurantCart from "./components/Cart/restaurant-cart";
import RestaurantCheckout from "./components/restaurant-checkout";
import OrderTracker from "./components/restaurant-order-tracker";
import MyOrdersPage from "./components/UserProfile/MyOrdersPageComplete";
import ContactSupport from "./components/restaurant-contact-support";
import ReportIssuePage from "./components/restaurant-report-issue";
import OrderTable from "./components/AdminDashboard/restaurant-order-table";
import ReservationTable from "./components/AdminDashboard/restaurant-reservation-table";
import GlobalRestaurant404Page from "./components/advanced-404-page";
import RestaurantLoader from "./components/restaurant_loader";
import AuthLayout from "./components/UserAuth/AuthLayout";
import EmailVerifiedPage from "./components/UserAuth/MailVerify";
import AuthSuccess from "./components/UserAuth/Success";
import ProfilePage from "./components/UserProfile";
import AuthenticationRoute from "./PrivateRoute/privateRoute";
import AdminDashboard from "./components/AdminDashboard/AdminLayout/AdminDashboard";
import PrivateRoute from "./PrivateRoute/protectedRoute";


export const route = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [],
      },
      {
        path: "/about",
        element: <AboutPageLayout />,
        children: [],
      },
      {
        path: "/manu",
        element: <ManuLayout />,
        children: [],
      },
      {
        path: "/chefs",
        element: <ChefLayout />,
        children: [],
      },
      {
        path: "/Blog",
        element: <BlogLayout />,
        children: [],
      },
      {
        path: "/reservation",
        element: <ReservationLayout />,
        children: [],
      },
      {
        path: "/service",
        element: <ServiceLayout />,
        children: [],
      },
      {
        path: "/contact",
        element: <ContactLayout />,
        children: [],
      },
      {
        path: "/post",
        element: <SinglePostLayout />,
        children: [],
      },
      {
        path: "/quote",
        element: <QuoteLayout />,
        children: [],
      },
      {
        path: "/admin",
        element: <PrivateRoute> <AdminDashboard /> </PrivateRoute>  ,
        children: [],
      },
      {
        path: "/admin2",
        element: <Analytics />,
        children: [],
      },
      {
        path: "/auth",
        element: <AuthenticationRoute>
           <AuthLayout />
           </AuthenticationRoute> ,
        children: [
          {
            path: "login",
            element: <RestaurantLogin />,
          },
          {
            path: "signup",
            element: <UserSignup />,
          },
          {
            path: "forgetpass",
            element: <ForgotPass />,
          },
          {
            path: "resetpass/:resetToken",
            element: <ResetPass />,
          },
          {
            path: "verify",
            element: <EmailVerifiedPage />,
          },
          {
            path: "success",
            element: <AuthSuccess />,
          },
        ],
      },

      {
        path: "/adminLogger",
        element: <AdminLogger />,
        children: [],
      },
      {
        path: "/menus",
        element: <RestaurantMenus />,
        children: [],
      },
      {
        path: "/cart",
        element: <RestaurantCart />,
        children: [],
      },
      {
        path: "/checkout",
        element: <RestaurantCheckout />,
        children: [],
      },
      {
        path: "/trackorder",
        element: <OrderTracker />,
        children: [],
      },
      {
        path: "/myorder",
        element: <MyOrdersPage />,
        children: [],
      },
      {
        path: "/profile",
        element: <PrivateRoute> <ProfilePage /></PrivateRoute>  ,
        children: [],
      },
      {
        path: "/connect",
        element: <ContactSupport />,
        children: [],
      },
      {
        path: "/report",
        element: <ReportIssuePage />,
        children: [],
      },
      {
        path: "/addminorder",
        element: <OrderTable />,
        children: [],
      },
      {
        path: "/adminreser",
        element: <ReservationTable />,
        children: [],
      },
      {
        path: "/404",
        element: <GlobalRestaurant404Page />,
        children: [],
      },
      {
        path: "/loader",
        element: <RestaurantLoader />,
        children: [],
      },
    ],
  },
  {
    path: "*",
    element: <GlobalRestaurant404Page />,
  },
]);
