const Cart = require("../model/cart.model");
const Product = require("../model/product.model");
const ErrorResponse = require("../utils/ErrorResponse");
const sendResponse = require("../utils/response/sendResponse");


// Get user's cart
const getCart = async (req, res, next) => {
  try {
    const userId = req.userId; // Assuming user ID comes from auth middleware

    const cart = await Cart.findOne({ user: userId })
      .populate('items.product', 'name price images category')
      .lean();

    if (!cart) {
      return sendResponse(res, 200, "Cart is empty", {
        items: [],
        totalAmount: 0,
        totalItems: 0
      });
    }

    return sendResponse(res, 200, "Cart retrieved successfully", cart);
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Add item to cart
const addToCart = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return sendResponse(res, 400, "Product ID is required");
    }

    if (quantity < 1) {
      return sendResponse(res, 400, "Quantity must be at least 1");
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return sendResponse(res, 404, "Product not found");
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update existing item
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].totalPrice = 
        cart.items[existingItemIndex].quantity * product.price;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity: quantity,
        price: product.price,
        totalPrice: quantity * product.price
      });
    }

    await cart.save();

    // Populate and return updated cart
    const updatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'name price images category')
      .lean();

    return sendResponse(res, 200, "Item added to cart successfully", updatedCart);
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Remove item from cart
const removeFromCart = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    if (!productId) {
      return sendResponse(res, 400, "Product ID is required");
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return sendResponse(res, 404, "Cart not found");
    }

    // Remove item from cart
    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    await cart.save();

    // Populate and return updated cart
    const updatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'name price images category')
      .lean();

    return sendResponse(res, 200, "Item removed from cart successfully", updatedCart);
  } catch (error) {
    console.error("Error removing from cart:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Update item quantity in cart
const updateCartQuantity = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;
    const { quantity } = req.body;
  

    if (!productId) {
      return sendResponse(res, 400, "Product ID is required");
    }

    if (!quantity || quantity < 1) {
      return sendResponse(res, 400, "Valid quantity is required (minimum 1)");
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return sendResponse(res, 404, "Cart not found");
    }


    // Find the item in cart
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return sendResponse(res, 404, "Item not found in cart");
    }

    // Update quantity and total price
    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].totalPrice = quantity * cart.items[itemIndex].price;

    await cart.save();

    // Populate and return updated cart
    const updatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'name price images category')
      .lean();

    return sendResponse(res, 200, "Cart quantity updated successfully", updatedCart);
  } catch (error) {
    console.error("Error updating cart quantity:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Clear entire cart
const clearCart = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return sendResponse(res, 404, "Cart not found");
    }

    cart.items = [];
    await cart.save();

    return sendResponse(res, 200, "Cart cleared successfully", {
      items: [],
      totalAmount: 0,
      totalItems: 0
    });
  } catch (error) {
    console.error("Error clearing cart:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Get cart item count
const getCartCount = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).lean();
    
    const count = cart ? cart.totalItems : 0;

    return sendResponse(res, 200, "Cart count retrieved successfully", { count });
  } catch (error) {
    console.error("Error getting cart count:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  getCartCount
};
