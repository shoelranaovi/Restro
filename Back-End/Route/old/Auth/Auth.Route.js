const {
  createUser,
  login,
  sendVerificationEmail,
  verifyLink,
  logout,
  resendOpt,
  verifyotp,
  getinfo,
  forgetPass,
  updatePassword,
  verifyLinkForgetPass,
  getsingleUserinfo,
  deleteUser,
  resetPassword,
} = require("../../controllerRoute/Auth/user.controller");
const {
  updateUserbyadmin,
} = require("../../controllerRoute/user/admin.controller");

const rateLimiters = require("../../middleware/limit/limit-rate");
const upload = require("../../middleware/multer");
const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../../middleware/validators/adduserValidator");
const verifyToken = require("../../middleware/verifyuser");

const Router = require("express").Router();

// Router.use(rateLimiters.signUpSignInLimiter);
Router.get("/logout", logout);
Router.post("/register", upload.single("avatar"), createUser);
// Router.get("/verify", verifyLink);
// Router.post("/verifyotp", verifyotp);
// Router.post("/resendOtp", resendOpt);
Router.post("/login", login);

Router.post("/forgetpass", forgetPass);
Router.get("/changepass", verifyLinkForgetPass);
Router.post("/resetPass", resetPassword);
Router.use(verifyToken);
Router.get("/userinfo", getinfo);
Router.get("/singleuser/:id", getsingleUserinfo);
Router.post("/updateByAdmin/:id", updateUserbyadmin);
Router.delete("/deleteuser/:id", deleteUser);

module.exports = Router;

//api/auth/add
//api/auth/resendOtp
//api/auth/verify
//api/auth/verifyotp
//api/auth/userinfo
//api/auth/logout
//api/auth/login
//api/auth/forgetPass
