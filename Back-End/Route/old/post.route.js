const {
  createpost,
  update,
  deletepost,
  getAllPost,
  getpostByid,
  getPosts,
  releatedpost,
  likeOrUnlikePost,
  addcomment,
  addReplyComment,
  addlikeComment,
  getUserNotifications,
  getadminProduct,
  getAllProducts,
  createReview,
  getAllReview,
  deleteReview,
} = require("../controllerRoute/post/AuthorAdmin.controller");
const fileUpload = require("../middleware/file upload/fileupload");
const upload = require("../middleware/multer");
const verifyToken = require("../middleware/verifyuser");
///api/post/
const Router = require("express").Router();
// Router.get("/posts", getPosts);
Router.use(verifyToken);
Router.post(
  "/add",
  upload.fields([
    { name: "Images", maxCount: 5 }, // ✅ সর্বোচ্চ ৫টি ইমেজ
    { name: "logo", maxCount: 3 }, // ✅ সর্বোচ্চ ৩টি ভিডিও
  ]),
  createpost
);
Router.get("/adminAllPost", getadminProduct);
Router.post(
  "/update/:id",
  upload.fields([
    { name: "Images", maxCount: 5 }, // ✅ সর্বোচ্চ ৫টি ইমেজ
    { name: "logo", maxCount: 3 }, // ✅ সর্বোচ্চ ৩টি ভিডিও
  ]),
  update
);
Router.delete("/delete/:id", deletepost);
Router.get("/products", getAllProducts);
// Router.get("/notification", getUserNotifications);
Router.get("/getbyId/:id", getpostByid);
Router.get("/getReview/:id", getAllReview);
Router.post("/createReview", createReview);
Router.delete("/deleteReview/:id", deleteReview);

// Router.get("/getrelated/:id", releatedpost);
// Router.get("/likeunlike/:id", likeOrUnlikePost);
// Router.post("/addcomment/:id", addcomment);
// Router.post("/addreply/:id", addReplyComment);
// Router.post("/addlikecommnet/:id", addlikeComment);

module.exports = Router;
