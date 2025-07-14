import { apiConnector } from "@/services/apiConnector";
import { cartEndpoints } from "@/services/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {},

  error: null,
  isLoading: false,
};

// Add to Cart
export const addToCart = createAsyncThunk(
  "/cart/addToCart",
  async (formData, { rejectWithValue }) => {
    try {
      console.log(formData);

      const response = await apiConnector(
        "POST",
        cartEndpoints.Add_TO_CART_API,
        formData
      );
      console.log("Data:", response.data);

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Get Cart Items
export const getCartItems = createAsyncThunk(
  "/cart/getCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        "GET",
        cartEndpoints.Get_Cart_API
      );
      console.log("Cart Items:", response.data);

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Update Cart Item Quantity
export const updateCartItem = createAsyncThunk(
  "/cart/updateCartItem",
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      console.log(itemId, quantity)
      const response = await apiConnector(
        "PUT",
       `${cartEndpoints.UPDATE_QUNTITY_API}/${itemId}`,
        { itemId, quantity }
      );
      console.log("Updated Cart Item:", response.data);

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Remove from Cart
export const removeFromCart = createAsyncThunk(
  "/cart/removeFromCart",
  async (itemId, { rejectWithValue }) => {
    console.log("itemId",itemId)
    try {
      const response = await apiConnector(
        "DELETE",
        `${cartEndpoints.REMOVE_FROM_CART_API}/${itemId}`
      );
      console.log("Removed from Cart:", response.data);

      return { itemId, ...response.data };
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Clear Cart
export const clearCart = createAsyncThunk(
  "/cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        "DELETE",
        cartEndpoints.clearCart
      );
      console.log("Cart Cleared:", response.data);

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Local state reducers for immediate UI updates
    increaseQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
    
      }
    },
    
    decreaseQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
     
      }
    },
    
    removeItemLocally: (state, action) => {
      const itemToRemove = state.cart.find(item => item.id === action.payload);
      if (itemToRemove) {
        state.cart = state.cart.filter(item => item.id !== action.payload);
      }
    },
    
    clearCartLocally: (state) => {
      state.cart = [];
    
    },
    
 
    
    clearError: (state) => {
      state.error = null;
    }
  },
  
  extraReducers: (builder) => {
    builder
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        // Check if item already exists
     state.cart=action.payload.data
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add item to cart";
      })
      
      // Get Cart Items
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data 
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch cart items";
      })
      
      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart=action.payload.data
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to update cart item";
      })
      
      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
       
        state.cart =action.payload.data ;
        state.error=null })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to remove item from cart";
      })
      
      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.isLoading = false;
        state.cart = [];
        state.totalItems = 0;
        state.totalAmount = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to clear cart";
      });
  },
});

export const {
  increaseQuantity,
  decreaseQuantity,
  removeItemLocally,
  clearCartLocally,
  clearError
} = CartSlice.actions;

export default CartSlice.reducer;