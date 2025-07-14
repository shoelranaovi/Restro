// import axios from "axios"

// export const axiosInstance = axios.create({});

// export const apiConnector = (method, url, bodyData, headers, params) => {
//     return axiosInstance({
//         method: `${method}`,
//         url: `${url}`,
//         data: bodyData ? bodyData : null,
//         headers: headers ? headers : null,
//         params: params ? params : null,
//     });
// }

import axios from "axios";

// Create axios instance
export const axiosInstance = axios.create({
  withCredentials: true, // if you need cookies/session in cross-origin requests
});

// Automatically attach access token to all requests (if present)
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export const apiConnector = (
  method,
  url,
  bodyData = null,
  headers = {},
  params = {}
) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers: {
      ...headers, // merge any custom headers
    },
    params,
  });
};
