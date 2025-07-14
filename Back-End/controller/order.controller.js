// const Order = require('../model/Order.model');
// const Cart = require('../model/Cart.model');
// const Address = require('../model/Address.model');
// const User = require('../model/User.model');
// const ErrorResponse = require('../utils/ErrorResponse');
// const sendResponse = require('../utils/response/sendResponse');

const Address = require("../model/Address.model");
const Cart = require("../model/cart.model");
const Order = require("../model/Order.model");
const User = require("../model/user.model");
const ErrorResponse = require("../utils/ErrorResponse");
const sendResponse = require("../utils/response/sendResponse");

// Create new order from cart
const createOrder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { 
      deliveryAddressId, 
      orderType = 'delivery', 
      paymentMethod, 
      specialInstructions,
      estimatedDeliveryTime
    } = req.body;

    // Validate required fields
    if (!paymentMethod) {
      return sendResponse(res, 400, "Payment method is required");
    }

    if (orderType === 'delivery' && !deliveryAddressId) {
      return sendResponse(res, 400, "Delivery address is required for delivery orders");
    }

    // Get user's cart
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return sendResponse(res, 400, "Cart is empty");
    }

    // Validate delivery address if provided
    let deliveryAddress = null;
    if (orderType === 'delivery') {
      deliveryAddress = await Address.findOne({ _id: deliveryAddressId, user: userId });
      if (!deliveryAddress) {
        return sendResponse(res, 404, "Delivery address not found");
      }
    }

    // Calculate pricing
    const subtotal = cart.totalAmount;
    const deliveryFee = orderType === 'delivery' ? 5.00 : 0; // Fixed delivery fee
    const tax = subtotal * 0.1; // 10% tax
    const discount = 0; // Could be calculated based on coupons, loyalty points, etc.
    const totalAmount = subtotal + deliveryFee + tax - discount;

    // Create order items from cart items
    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.price,
      totalPrice: item.totalPrice
    }));

    // Create order
    const order = new Order({
      user: userId,
      items: orderItems,
      deliveryAddress: deliveryAddress ? deliveryAddress._id : null,
      orderType,
      paymentMethod,
      subtotal,
      deliveryFee,
      tax,
      discount,
      totalAmount,
      specialInstructions,
      estimatedDeliveryTime: estimatedDeliveryTime || new Date(Date.now() + 45 * 60 * 1000) // Default 45 minutes
    });

    await order.save();

    // Clear user's cart after successful order
    await Cart.findOneAndUpdate({ user: userId }, { items: [], totalAmount: 0, totalItems: 0 });

    // Update user's order statistics
    await User.findByIdAndUpdate(userId, {
      $inc: { totalOrders: 1, totalSpent: totalAmount },
      lastOrder: new Date()
    });

    // Populate the order for response
    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'firstName lastName email phone')
      .populate('deliveryAddress')
      .populate('items.product', 'name images');

    return sendResponse(res, 201, "Order created successfully", populatedOrder);
  } catch (error) {
    console.error("Error creating order:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Get all orders for a user
const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 10, status } = req.query;

    const filter = { user: userId };
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .populate('deliveryAddress')
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const totalOrders = await Order.countDocuments(filter);

    const result = {
      orders,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page,
      hasNext: page < Math.ceil(totalOrders / limit),
      hasPrev: page > 1
    };

    return sendResponse(res, 200, "Orders retrieved successfully", result);
  } catch (error) {
    console.error("Error fetching user orders:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Get all orders (Admin/Manager)
const getAllOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, orderType, dateFrom, dateTo } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (orderType) filter.orderType = orderType;
    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
      if (dateTo) filter.createdAt.$lte = new Date(dateTo);
    }

    const orders = await Order.find(filter)
      .populate('user', 'firstName lastName email phone')
      .populate('deliveryAddress')
      .populate('items.product', 'name images')
      .populate('assignedTo.chef', 'firstName lastName')
      .populate('assignedTo.deliveryPerson', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const totalOrders = await Order.countDocuments(filter);

    const result = {
      orders,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page,
      hasNext: page < Math.ceil(totalOrders / limit),
      hasPrev: page > 1
    };

    return sendResponse(res, 200, "Orders retrieved successfully", result);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Get single order by ID
const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const userId = req.userId;
    const userRole = req.user.role;

    if (!orderId) {
      return sendResponse(res, 400, "Order ID is required");
    }

    // Build query based on user role
    let query = { _id: orderId };
    if (!['Admin', 'Manager'].includes(userRole)) {
      query.user = userId;
    }

    const order = await Order.findOne(query)
      .populate('user', 'firstName lastName email phone')
      .populate('deliveryAddress')
      .populate('items.product', 'name images category')
      .populate('assignedTo.chef', 'firstName lastName')
      .populate('assignedTo.deliveryPerson', 'firstName lastName')
      .lean();

    if (!order) {
      return sendResponse(res, 404, "Order not found");
    }

    return sendResponse(res, 200, "Order retrieved successfully", order);
  } catch (error) {
    console.error("Error fetching order:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Update order status
const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status, note } = req.body;
    const userId = req.userId;
    console.log(status)

    if (!orderId || !status) {
      return sendResponse(res, 400, "Order ID and status are required");
    }

    const validStatuses = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return sendResponse(res, 400, "Invalid status");
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return sendResponse(res, 404, "Order not found");
    }

    // Update status
    order.status = status;
    
    // Add to order history
    order.orderHistory.push({
      status,
      note,
      updatedBy: userId,
      timestamp: new Date()
    });

    // Set actual delivery time if delivered
    if (status === 'Delivered') {
      order.actualDeliveryTime = new Date();
    }

    await order.save();

    const updatedOrder = await Order.findById(orderId)
      .populate('user', 'firstName lastName email phone')
      .populate('deliveryAddress')
      .populate('items.product', 'name images');

    return sendResponse(res, 200, "Order status updated successfully", updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Cancel order
const cancelOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { reason } = req.body;
    const userId = req.userId;

    if (!orderId) {
      return sendResponse(res, 400, "Order ID is required");
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return sendResponse(res, 404, "Order not found");
    }

    // Check if order can be cancelled
    if (['Delivered', 'Cancelled'].includes(order.status)) {
      return sendResponse(res, 400, "Order cannot be cancelled");
    }

    // Update order
    order.status = 'Cancelled';
    order.cancellationReason = reason;
    order.cancelledBy = userId;

    await order.save();

    const updatedOrder = await Order.findById(orderId)
      .populate('user', 'firstName lastName email phone')
      .populate('deliveryAddress')
      .populate('items.product', 'name images');

    return sendResponse(res, 200, "Order cancelled successfully", updatedOrder);
  } catch (error) {
    console.error("Error cancelling order:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Assign order to chef/delivery person
const assignOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { chefId, deliveryPersonId } = req.body;

    if (!orderId) {
      return sendResponse(res, 400, "Order ID is required");
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return sendResponse(res, 404, "Order not found");
    }

    // Update assignments
    if (chefId) {
      const chef = await User.findById(chefId);
      if (!chef || chef.role !== 'Chef') {
        return sendResponse(res, 400, "Invalid chef ID");
      }
      order.assignedTo.chef = chefId;
    }

    if (deliveryPersonId) {
      const deliveryPerson = await User.findById(deliveryPersonId);
      if (!deliveryPerson || deliveryPerson.role !== 'Delivery') {
        return sendResponse(res, 400, "Invalid delivery person ID");
      }
      order.assignedTo.deliveryPerson = deliveryPersonId;
    }

    await order.save();

    const updatedOrder = await Order.findById(orderId)
      .populate('assignedTo.chef', 'firstName lastName')
      .populate('assignedTo.deliveryPerson', 'firstName lastName');

    return sendResponse(res, 200, "Order assigned successfully", updatedOrder);
  } catch (error) {
    console.error("Error assigning order:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Add order rating/review
const addOrderReview = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { rating, review } = req.body;
    const userId = req.userId;

    if (!orderId || !rating) {
      return sendResponse(res, 400, "Order ID and rating are required");
    }

    if (rating < 1 || rating > 5) {
      return sendResponse(res, 400, "Rating must be between 1 and 5");
    }

    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
      return sendResponse(res, 404, "Order not found");
    }

    if (order.status !== 'Delivered') {
      return sendResponse(res, 400, "Can only review delivered orders");
    }

    if (order.rating) {
      return sendResponse(res, 400, "Order already reviewed");
    }

    order.rating = rating;
    order.review = review;
    await order.save();

    return sendResponse(res, 200, "Review added successfully", order);
  } catch (error) {
    console.error("Error adding order review:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Get order statistics (Admin/Manager)
const getOrderStatistics = async (req, res, next) => {
  try {
    const { dateFrom, dateTo } = req.query;
    
    const matchStage = {};
    if (dateFrom || dateTo) {
      matchStage.createdAt = {};
      if (dateFrom) matchStage.createdAt.$gte = new Date(dateFrom);
      if (dateTo) matchStage.createdAt.$lte = new Date(dateTo);
    }

    const stats = await Order.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' },
          avgOrderValue: { $avg: '$totalAmount' },
          deliveryOrders: { $sum: { $cond: [{ $eq: ['$orderType', 'delivery'] }, 1, 0] } },
          pickupOrders: { $sum: { $cond: [{ $eq: ['$orderType', 'pickup'] }, 1, 0] } },
          pendingOrders: { $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] } },
          confirmedOrders: { $sum: { $cond: [{ $eq: ['$status', 'Confirmed'] }, 1, 0] } },
          preparingOrders: { $sum: { $cond: [{ $eq: ['$status', 'Preparing'] }, 1, 0] } },
          readyOrders: { $sum: { $cond: [{ $eq: ['$status', 'Ready'] }, 1, 0] } },
          outForDeliveryOrders: { $sum: { $cond: [{ $eq: ['$status', 'Out for Delivery'] }, 1, 0] } },
          deliveredOrders: { $sum: { $cond: [{ $eq: ['$status', 'Delivered'] }, 1, 0] } },
          cancelledOrders: { $sum: { $cond: [{ $eq: ['$status', 'Cancelled'] }, 1, 0] } },
          avgRating: { $avg: '$rating' }
        }
      }
    ]);

    const result = stats.length > 0 ? stats[0] : {
      totalOrders: 0,
      totalRevenue: 0,
      avgOrderValue: 0,
      deliveryOrders: 0,
      pickupOrders: 0,
      pendingOrders: 0,
      confirmedOrders: 0,
      preparingOrders: 0,
      readyOrders: 0,
      outForDeliveryOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0,
      avgRating: 0
    };

    return sendResponse(res, 200, "Order statistics retrieved successfully", result);
  } catch (error) {
    console.error("Error fetching order statistics:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  assignOrder,
  addOrderReview,
  getOrderStatistics
};