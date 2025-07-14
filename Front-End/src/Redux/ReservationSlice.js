import { apiConnector } from "@/services/apiConnector";
import {  authEndpoints, ReservationEndPoint } from "@/services/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
 reservations:[],

  isLoading: false,
};

///complete
export const addReservation = createAsyncThunk(
  "/reservation/addreservation",
  async ( formData , { rejectWithValue }) => {
    try {
      console.log(formData );

      const response = await apiConnector(
        "POST",
        ReservationEndPoint.CREATE_RESERVATION_API,
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

export const allReservationAdmin = createAsyncThunk(
  "reservation/adminAllProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        "GET",
        ReservationEndPoint.GET_ALL_RESERVATION_API
      );
      console.log(response)
      console.log("All PRODUCT:", response.data);

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
export const updateReservationAdmin = createAsyncThunk(
  "/reservation/updatebyadmin",
  async ({ reservation, reservationID }, { rejectWithValue }) => {
    try {
      console.log(reservation, reservationID);

      const response = await apiConnector(
        "PUT",
        ReservationEndPoint.UPDATE_RESERVATION_API + reservationID,
        reservation
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

export const deleteReservation = createAsyncThunk(
  "/reservation/delete",
  async ({reservationId}, { rejectWithValue }) => {
    try {
      console.log(reservationId );

      const response = await apiConnector(
        "DELETE",
        ReservationEndPoint.DELETE_RESERVATION_API+ reservationId,
      );
      console.log("Delete RESERVATION:", response.data);

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


export const ReservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReservation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReservation.fulfilled, (state, action) => {
        
        state.isLoading = false;
        state.reservations=[...(state.reservations || []),action.payload.data]
       
      })
      .addCase(addReservation.rejected, (state) => {
        state.isLoading = false;

      })
      .addCase(allReservationAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allReservationAdmin.fulfilled, (state, action) => {
        
        state.isLoading = false;
        state.reservations=action.payload.data
       
      })
      .addCase(allReservationAdmin.rejected, (state) => {
        state.isLoading = false;

      })
      .addCase(deleteReservation.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reservations = state.reservations.filter(
          (item) => item._id !== action.payload.data._id
        );
        state.error = null;
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(updateReservationAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(updateReservationAdmin.fulfilled, (state,action) => {
        state.isLoading = false;
        const updatedReservation = action.payload.data;
        state.reservations = state.reservations.map((product) =>
          product._id === updatedReservation._id ? updatedReservation : product
        );

        state.isLoading = false;
      })
      .addCase(updateReservationAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
 
  },
});

export default ReservationSlice.reducer;
