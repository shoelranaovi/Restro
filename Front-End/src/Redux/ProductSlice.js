import { summaryApi } from "@/Common";
import { apiConnector } from "@/services/apiConnector";
import { postEndpoints } from "@/services/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  productDetails: null,
  reviews: null,
  isLoading: false,
  error: null,
};
///imprement
export const addProduct = createAsyncThunk(
  "/auth/addProduct",
  async (submitFormData, { rejectWithValue }) => {

    // for (let [key, value] of submitFormData.entries()) {
    //   console.log(`${key}:`, value);
    // }
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(postEndpoints.CREATE_POROUDCT_API, submitFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization : `Bearer ${accessToken}`
        },
        withCredentials: true,
      });
      console.log( response.data)
      return response.data;
    } catch (error) {
      console.log(error);

      // If there is an error, return the response data or the message via rejectWithValue
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Custom payload in case of error
      } else {
        return rejectWithValue(error.message); // Fallback message if no response data
      }
    }
  }
);

export const allProductAdmin = createAsyncThunk(
  "post/adminAllProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        "GET",
        postEndpoints.GET_ALL_POROUDCT_ADMIN_API
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
///imprement

export const getPopularProducts = createAsyncThunk(
  "product/getPopularProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const {
        limit = 8,
        category,
        minRating = 0,
        sortBy = 'totalSales',
        order = 'desc',
        includeDiscounted = false
      } = params;

      // Build query parameters
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        minRating: minRating.toString(),
        sortBy,
        order,
        includeDiscounted: includeDiscounted.toString()
      });

      // Add category if provided
      if (category && category !== 'all') {
        queryParams.append('category', category);
      }

      // const response = await apiConnector(
      //   "GET",
      //   `${postEndpoints.GET_POPULAR_PRODUCTS_API}?${queryParams.toString()}`
      // );
    const response=await axios.get(`${postEndpoints.GET_POPULAR_POROUDCT_ADMIN_API}?${queryParams.toString()}`)

      console.log("Popular Products Response:", response);
      console.log("Popular Products Data:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching popular products:", error);
      
      // Return proper error messages
      return rejectWithValue(
        error.response?.data || error.message || "Failed to fetch popular products"
      );
    }
  }
);

export const categoryProduct = createAsyncThunk(
  "product/categoryProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${postEndpoints.GET_Category_POROUDCT_ADMIN_API}`);
      console.log(response)

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

export const allproducts = createAsyncThunk(
  "post/allproducts",
  async (
    {
      keyword = "",
      category,
      price = [0, 200000],
      ratings = 0,
      currentPage = 1,
    },
    { rejectWithValue }
  ) => {
    try {
      console.log(keyword, category, price, ratings, currentPage);
      const response = await axios.get(
        `${summaryApi.allProducts.url}?keyword=${keyword}&category=${category}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&page=${currentPage}`,
        {
          withCredentials: true, // ✅ Moved to config
        }
      );
      console.log(response.data);
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

///imprement
export const singlepost = createAsyncThunk(
  "post/post",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${summaryApi.singlePost.url}${id}`, {
        withCredentials: true, // ✅ Moved to config
      });

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
///imprement

export const updateProductAdmin = createAsyncThunk(
  "/product/updatebyadmin",
  async ({ formData, ProductId }, { rejectWithValue }) => {
    try {
      console.log(formData, ProductId);

      const response = await apiConnector(
        "POST",
        postEndpoints.UPDATE_POROUDCT_ADMIN_API + ProductId,
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


export const deleteproduct = createAsyncThunk(
  "/product/delete",
  async ({ProductId}, { rejectWithValue }) => {
    try {
      console.log(ProductId );

      const response = await apiConnector(
        "DELETE",
        postEndpoints.DELETE_POROUDCT_ADMIN_API+ ProductId,
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


export const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(addProduct.fulfilled, (state,action) => {
        state.products=[...state.products,action.payload.data]
        state.isLoading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(updateProductAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(updateProductAdmin.fulfilled, (state,action) => {
        state.isLoading = false;
        const updatedProduct = action.payload.data.product;
        state.products = state.products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );

        state.isLoading = false;
      })
      .addCase(updateProductAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(allProductAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(allProductAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
        state.error = null;
      })
      .addCase(allProductAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(allproducts.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(allproducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.error = null;
      })
      .addCase(allproducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(singlepost.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(singlepost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
        state.error = null;
      })
      .addCase(singlepost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(deleteproduct.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(deleteproduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter(
          (item) => item._id !== action.payload.data._id
        );
        state.error = null;
      })
      .addCase(deleteproduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(getPopularProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(getPopularProducts.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getPopularProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(categoryProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(categoryProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(categoryProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })

   
  },
});

export default ProductSlice.reducer;
