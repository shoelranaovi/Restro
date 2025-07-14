const errorHandler = require("../../middleware/errorhandler");
const Order = require("../../model/orderModel");
const Product = require("../../model/post.model");

// Create New Order
const newOrder = async (req, res, next) => {
  const { shippingInfo, orderItems, paymentInfo, totalPrice } = req.body;

  try {
    const orderExist = await Order.findOne({ paymentInfo });

    if (orderExist) {
      return next(errorHandler(400, "Order Already Placed"));
    }

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      totalPrice,
      paidAt: Date.now(),
      user: req.userId,
    });

    //   await sendEmail({
    //     email: req.user.email,
    //     templateId: process.env.SENDGRID_ORDER_TEMPLATEID,
    //     data: {
    //       name: req.user.name,
    //       shippingInfo,
    //       orderItems,
    //       totalPrice,
    //       oid: order._id,
    //     },
    //   });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error, "error");
    return next(errorHandler(500, "Internal Server Error"));
  }
};

// Get Single Order Details
const getSingleOrderDetails = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(errorHandler("Order Not Found", 404));
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error, "error");
    return next(errorHandler(500, "Internal Server Error"));
  }
};

// Get Logged In User Orders
const myOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.userId });

    if (!orders) {
      return next(errorHandler(404, "Order Not Found"));
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error, "error");
    return next(errorHandler(500, "Internal Server Error"));
  }
};

// Get All Orders ---ADMIN
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    if (!orders) {
      return next(errorHandler("Order Not Found", 404));
    }

    let totalAmount = 0;
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      orders,
      totalAmount,
    });
  } catch (error) {
    console.log(error, "error");
    return next(errorHandler(500, "Internal Server Error"));
  }
};

// Update Order Status ---ADMIN
const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(errorHandler(404, "Order Not Found"));
    }

    if (order.orderStatus === "Delivered") {
      return next(errorHandler(400, "Already Delivered"));
    }

    if (req.body.status === "Shipped") {
      order.shippedAt = Date.now();
      order.orderItems.forEach(async (i) => {
        await updateStock(i._id, i.quantity);
      });
    }

    order.orderStatus = req.body.status;
    console.log(order.orderStatus, "orderStatus");
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error, "error");
    return next(errorHandler(500, "Internal Server Error"));
  }
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete Order ---ADMIN
const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(errorHandler(404, "Order Not Found"));
    }

    const orderDelete = await Order.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      data: {
        _id: order._id,
      },
    });
  } catch (error) {
    console.log(error, "error");
    return next(errorHandler(500, "Internal Server Error"));
  }
};

module.exports = {
  newOrder,
  getSingleOrderDetails,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
