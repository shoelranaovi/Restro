import { apiConnector } from "@/services/apiConnector";
import { OrderEndpoints } from "@/services/apis";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ConnectEndPoint } from "../services/apis";

const initialState = {
  connects: [],
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
export const allOrderAdmin = createAsyncThunk(
  "/order/allOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        "GET",
        OrderEndpoints.GET_ALL_Order_API
      );
      console.log(response)
      console.log("All Order:", response.data);

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

export const updateOrderAdmin = createAsyncThunk(
  "/order/updateByAdmin",
  async ({ formData, orderId }, { rejectWithValue }) => {
    try {
      console.log(formData, orderId);

      const response = await apiConnector(
        "PUT",
        OrderEndpoints.UPDATE_Order_STATUS_API + orderId,
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


  

export const contactSlice = createSlice({
  name: "contact",
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
      .addCase(allOrderAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allOrderAdmin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(allOrderAdmin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateOrderAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderAdmin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateOrderAdmin.rejected, (state) => {
        state.isLoading = false;
      })
   
  },
});

export default contactSlice.reducer;
