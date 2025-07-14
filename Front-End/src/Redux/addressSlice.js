import { apiConnector } from "@/services/apiConnector";
import {
  addressEndpoints,
  authEndpoints,
  ReservationEndPoint,
} from "@/services/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  address: [],
  isLoading: false,
};

///complete
export const addAddress = createAsyncThunk(
  "/address/add",
  async (formData, { rejectWithValue }) => {
    try {
      console.log(formData);

      const response = await apiConnector(
        "POST",
        addressEndpoints.Add_ADDRESS_API,
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
export const getAllAddress = createAsyncThunk(
    "/address/get",
    async (_, { rejectWithValue }) => {
      try {
    
  
        const response = await apiConnector(
          "GET",
          addressEndpoints.GET_ALL_ADDRESS_API
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

  export const updateAddress = createAsyncThunk(
    "/address/update",
    async ({ formData, AddressId }, { rejectWithValue }) => {
      try {
        console.log(formData,AddressId);
  
        const response = await apiConnector(
          "PUT",
          addressEndpoints.UPDATE_ADDRESS_API +AddressId,
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

  export const deleteAddress = createAsyncThunk(
    "/address/delete",
    async (addressId, { rejectWithValue }) => {
      try {
        console.log(addressId );
  
        const response = await apiConnector(
          "DELETE",
          addressEndpoints.DELETE_ADDRESS_API+ addressId,
        );
        console.log("Delete USER:", response.data);
  
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
  

export const AdddressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.address = [...(state.address || []), action.payload.data];
      })
      .addCase(addAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.address =  action.payload.data
      })
      .addCase(getAllAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(updateAddress.fulfilled, (state,action) => {
        state.isLoading = false;
        const updatedAddress = action.payload.data;
        state.address = state.address.map((address) =>
          address._id === updatedAddress._id ? updatedAddress : address
        );
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.address = state.address.filter(
          (item) => item._id !== action.payload.data._id
        );
      
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
  },
});

export default AdddressSlice.reducer;
