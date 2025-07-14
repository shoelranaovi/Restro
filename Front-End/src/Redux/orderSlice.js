import { apiConnector } from "@/services/apiConnector";
import { OrderEndpoints } from "@/services/apis";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  isLoading: false,
};

///complete
export const addOrder = createAsyncThunk(
  "/order/add",
  async (formData, { rejectWithValue }) => {
    try {
      console.log(formData);

      const response = await apiConnector(
        "POST",
        OrderEndpoints.Add_Order_API,
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


  

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = [...(state.orders || []), action.payload.data];
      })
      .addCase(addOrder.rejected, (state) => {
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

export default OrderSlice.reducer;
