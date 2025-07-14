const {
  newOrder,
  getAllOrders,
  getSingleOrderDetails,
  updateOrder,
  deleteOrder,
  myOrders,
} = require("../../controllerRoute/order/orderController");
const verifyToken = require("../../middleware/verifyuser");

///api/post/
const Router = require("express").Router();
Router.use(verifyToken);
Router.post("/createOrder", newOrder);
Router.post("/updateOrder/:id", updateOrder);
Router.get("/getAllOrder", getAllOrders);myOrders
Router.get("/myOrders", myOrders);
Router.get("/oderDetail/:id", getSingleOrderDetails);
Router.delete("/deleteOrder/:id", deleteOrder);

// Router.get("/posts", getPosts);

// Router.get("/adminAllPost", getadminProduct);

// Router.delete("/delete/:id", deletepost);
// Router.get("/products", getAllProducts);

// Router.get("/getbyId/:id", getpostByid);
// Router.get("/getReview/:id", getAllReview);
// Router.post("/createReview", createReview);
// Router.delete("/deleteReview/:id", deleteReview);

module.exports = Router;
