// utils/tokenManager.js
import axios from "axios";

import { authEndpoints } from "@/services/apis";
import { useDispatch } from "react-redux";

// Create axios instance for API calls

const apiClient = axios.create({
  withCredentials: true, // Important for refresh token cookies
});


// Main function to check and refresh token if needed
export const checkAndRefreshToken = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
 

    // If no access token exists, return null (user needs to login)
    if (!accessToken) {
      console.log("No access token found");
      return await refreshAccessToken();
    }

    // Check if access token is expired
    if (!isTokenExpired(accessToken)) {
      console.log("Access token is still valid");
      return accessToken; // Token is still valid, return it
    }

    // Access token is expired, request new one
    console.log("Access token expired, requesting new token...");
    return await refreshAccessToken();
  } catch (error) {
    console.error("Token check failed:", error);
    return null;
  }
};


// Token refresh function (only called when needed)
export const refreshAccessToken = async () => {
  
  try {
    const response = await axios.post(
      authEndpoints.Refresh_token,
      {}, // Empty body since refresh token is in httpOnly cookie
      { withCredentials: true }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;


    // Update tokens in localStorage
    localStorage.setItem("accessToken", accessToken);
    if (newRefreshToken) {
      localStorage.setItem("refreshToken", newRefreshToken);
    }

    console.log("New access token obtained successfully");
    return accessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);

    // Clear tokens and redirect if refresh fails
    localStorage.removeItem("accessToken");

    // Redirect to login
    throw error;
  }
};

// Check if token is expired (decode JWT and check exp)
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;

    // Check if token expires in next 5 minutes (300 seconds)
    return payload.exp < currentTime + 300;
  } catch (error) {
    console.log(error);

    return true;
  }
};

// Axios request interceptor - Updated to use checkAndRefreshToken
apiClient.interceptors.request.use(
  async (config) => {
    // Check and refresh token if needed
    const validToken = await checkAndRefreshToken();

    if (validToken) {
      config.headers.Authorization = `Bearer ${validToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Axios response interceptor for handling 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { apiClient };
