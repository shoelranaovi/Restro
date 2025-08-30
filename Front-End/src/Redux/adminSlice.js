import { apiConnector } from "@/services/apiConnector";
import { AdminEndpoints, OrderEndpoints } from "@/services/apis";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ConnectEndPoint } from "../services/apis";

const initialState = {
    dashboardData:{},
  isLoading: false,
};

///complete
export const addContact = createAsyncThunk(
  "/contact/add",
  async (formData, { rejectWithValue }) => {
    try {
      console.log(formData);

      const response = await apiConnector(
        "POST",
        ConnectEndPoint.CREATE_Contact_API,
        formData
      );
      console.log("Data:", response.data);

      return response.data;
    } catch (error) {
      // If there is an error, return the response data or the message via rejectWithValue
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Custom payload in case of error
      } else {
        return rejectWithValue(error.message); // Fallback message if no response data
      }
    }
  }
);
export const getDashboardData = createAsyncThunk(
  "/admin/getDashboadData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        "GET",
        AdminEndpoints.GET_DASHBOARD_DATA
      );
      console.log(response)
      console.log("DashboardData:", response.data);

      return response.data;
    } catch (error) {
      console.log(error);

      // Return proper error messages
      return rejectWithValue(
        error.response?.data || error.message || "An error occurred"
      );
    }
  }
);




  

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.connects = [...(state.connects || []), action.payload.data];
      })
      .addCase(addContact.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getDashboardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardData.fulfilled, (state,action) => {
        state.dashboardData=action.payload.data
        state.isLoading = false;
      })
      .addCase(getDashboardData.rejected, (state) => {
        state.isLoading = false;
        
      })
   
   
  },
});

export default adminSlice.reducer;
