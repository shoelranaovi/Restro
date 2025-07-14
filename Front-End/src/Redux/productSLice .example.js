import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiConnector } from '../path/to/your/apiConnector'; // Adjust path as needed
import { postEndpoints } from '../path/to/your/endpoints'; // Adjust path as needed

// Get popular products with filtering options
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

      const response = await apiConnector(
        "GET",
        `${postEndpoints.GET_POPULAR_PRODUCTS_API}?${queryParams.toString()}`
      );

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

// Get popular products by categories
export const getPopularProductsByCategory = createAsyncThunk(
  "product/getPopularProductsByCategory",
  async (limit = 4, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        "GET",
        `${postEndpoints.GET_POPULAR_PRODUCTS_BY_CATEGORY_API}?limit=${limit}`
      );

      console.log("Popular Products by Category Response:", response);
      console.log("Popular Products by Category Data:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching popular products by category:", error);
      
      return rejectWithValue(
        error.response?.data || error.message || "Failed to fetch popular products by category"
      );
    }
  }
);

// Get trending products
export const getTrendingProducts = createAsyncThunk(
  "product/getTrendingProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { limit = 6, days = 7 } = params;

      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        days: days.toString()
      });

      const response = await apiConnector(
        "GET",
        `${postEndpoints.GET_TRENDING_PRODUCTS_API}?${queryParams.toString()}`
      );

      console.log("Trending Products Response:", response);
      console.log("Trending Products Data:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching trending products:", error);
      
      return rejectWithValue(
        error.response?.data || error.message || "Failed to fetch trending products"
      );
    }
  }
);

// Get featured products
export const getFeaturedProducts = createAsyncThunk(
  "product/getFeaturedProducts",
  async (limit = 4, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        "GET",
        `${postEndpoints.GET_FEATURED_PRODUCTS_API}?limit=${limit}`
      );

      console.log("Featured Products Response:", response);
      console.log("Featured Products Data:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching featured products:", error);
      
      return rejectWithValue(
        error.response?.data || error.message || "Failed to fetch featured products"
      );
    }
  }
);

// Get popular products statistics
export const getPopularProductsStats = createAsyncThunk(
  "product/getPopularProductsStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        "GET",
        postEndpoints.GET_POPULAR_PRODUCTS_STATS_API
      );

      console.log("Popular Products Stats Response:", response);
      console.log("Popular Products Stats Data:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching popular products stats:", error);
      
      return rejectWithValue(
        error.response?.data || error.message || "Failed to fetch popular products statistics"
      );
    }
  }
);

// Alternative simplified version matching your original pattern exactly
export const popularProduct = createAsyncThunk(
  "post/popularProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        "GET",
        postEndpoints.GET_POPULAR_PRODUCTS_API
      );
      
      console.log(response);
      console.log("Popular PRODUCT:", response.data);
      
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