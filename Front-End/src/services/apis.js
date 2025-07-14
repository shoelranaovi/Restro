const BASE_URL = "http://localhost:3000/api";

// AUTH ENDPOINTS
export const authEndpoints = {
  SIGNUP_API: BASE_URL + "/auth/register",
  RESEDSIGNUPLINK_API: BASE_URL + "/auth/resendVerificationMail",
  LOGIN_API: BASE_URL + "/auth/login",
  CHECK_USER: BASE_URL + "/auth/checkuser",
  LOG_Out: BASE_URL + "/auth/logout",
  RESETPASSTOKEN_API: BASE_URL + "/auth/forget-password",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  CHENGE_PROFILE_PIC: BASE_URL + "/profile/update-avatar",
  UPDATE_USERINFO: BASE_URL + "/profile/updateUser",
  UPDATE_PASSWORD: BASE_URL + "/profile/changePassword",
  GOOGLE_ON_tAP: BASE_URL + "/auth/google/one-tap",
  Refresh_token: BASE_URL + "/auth/refresh-token",
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
  // GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  // GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  // GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
};
export const postEndpoints = {
  CREATE_POROUDCT_API: BASE_URL + "/product/create",
  GET_ALL_POROUDCT_ADMIN_API: BASE_URL + "/product/getAllProduct",
  DELETE_POROUDCT_ADMIN_API: BASE_URL + "/product/delete/",
  UPDATE_POROUDCT_ADMIN_API: BASE_URL + "/product/update/",
  GET_POPULAR_POROUDCT_ADMIN_API: BASE_URL + "/product/getPopularProduct",
  GET_Category_POROUDCT_ADMIN_API: BASE_URL + "/product/getCategoryProduct",
  // GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  // GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
};
export const cartEndpoints = {
  Add_TO_CART_API: BASE_URL + "/cart/add",
  REMOVE_FROM_CART_API: BASE_URL + "/cart/remove",
  UPDATE_QUNTITY_API: BASE_URL + "/cart/update",
  Get_Cart_API: BASE_URL + "/cart/",
};
export const addressEndpoints = {
  Add_ADDRESS_API: BASE_URL + "/address",
  GET_ALL_ADDRESS_API: BASE_URL + "/address",
  GET_DEFAULT_ADDRESS_API: BASE_URL + "/address/default",
  GET_SINGLE_ADDRESS_API: BASE_URL + "/address/",
  UPDATE_ADDRESS_API: BASE_URL + "/address/",
  DELETE_ADDRESS_API: BASE_URL + "/address/",
};
export const OrderEndpoints = {
  Add_Order_API: BASE_URL + "/order/create",
  GET_ALL_Order_API: BASE_URL + "/order",
  UPDATE_Order_STATUS_API: BASE_URL + "/order/status/",
  GET_DEFAULT_ADDRESS_API: BASE_URL + "/address/default",
  GET_SINGLE_ADDRESS_API: BASE_URL + "/address/",
  UPDATE_ADDRESS_API: BASE_URL + "/address/",
  DELETE_ADDRESS_API: BASE_URL + "/address/",
};

// PROFILE ENDPOINTS
export const AdminEndpoints = {
  GET_ALL_USER__API: BASE_URL + "/user/getAlluser",
  UPDATE_USER: BASE_URL + "/user/update/",
  DELETE_USER: BASE_URL + "/user/delete/",
  // GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  // GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  // GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
};
export const ReservationEndPoint = {
 CREATE_RESERVATION_API: BASE_URL + "/reservations",
GET_ALL_RESERVATION_API: BASE_URL + "/reservations",
DELETE_RESERVATION_API: BASE_URL + "/reservations/",
UPDATE_RESERVATION_API: BASE_URL + "/reservations/",
  // UPDATE_USER: BASE_URL + "/user/update/",
  // DELETE_USER: BASE_URL + "/user/delete/",
  // GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  // GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  // GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
};
export const ConnectEndPoint = {
  CREATE_Contact_API: BASE_URL + "/connect",
 GET_ALL_RESERVATION_API: BASE_URL + "/reservations",
 DELETE_RESERVATION_API: BASE_URL + "/reservations/",
 UPDATE_RESERVATION_API: BASE_URL + "/reservations/",

 };
 


