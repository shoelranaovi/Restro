const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const sendResponse = require("../utils/response/sendResponse");
const ErrorResponse = require("../utils/ErrorResponse");
const {
  sendVerificationEmailSignup,
  sendVerificationEmailforgetpass,
} = require("../utils/sendMail/sendMail");

// const { sendEmail } = require('../utils/sendEmail');
// const { sendSMS } = require('../utils/sendSMS');
// const asyncHandler = require('../middleware/asyncHandler');
// const ErrorResponse = require('../utils/errorResponse');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors
        .array()
        .map((err) => err.msg)
        .join(", ");
      return sendResponse(res, 400, message, null);
    }

    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      role = "Customer",
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { phone }],
    });

    if (existingUser) {
      return sendResponse(
        res,
        400,
        "User with this email or phone already exists",
        null
      );
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email: email,
      password,
      phone,
      address,
      role: role === "admin" ? "user" : role, // Prevent admin registration via API
      metadata: {
        createdIP: req.ip,
        userAgent: req.get("User-Agent"),
      },
    });

    // Generate email verification token
    const emailVerificationToken = user.generateEmailVerificationToken();
    await user.save();

    // Send verification email
    try {
      const verificationUrl = `${req.protocol}://${req.get(
        "host"
      )}/api/auth/verify-email/${emailVerificationToken}`;
      sendVerificationEmailSignup({ verificationUrl, email, firstName }, res);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      user.emailVerificationToken = undefined;
      user.emailVerificationExpire = undefined;
      await user.save();
    }

    // // Generate tokens
    // const accessToken = user.generateAuthToken();
    // const refreshToken = user.generateRefreshToken();

    // // Save refresh token
    // user.refreshTokens.push({ token: refreshToken });
    // await user.save();

    // Set secure HTTP-only cookie for refresh token
    // const cookieOptions = {
    //   expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    // };

    // res.cookie("refreshToken", refreshToken, cookieOptions);
    // const data = {
    //   user: {
    //     id: user._id,
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     fullName: user.fullName,
    //     email: user.email,
    //     phone: user.phone,
    //     role: user.role,
    //     isEmailVerified: user.isEmailVerified,
    //     isPhoneVerified: user.isPhoneVerified,
    //   },
    // };

  } catch (err) {
    next(err); // Pass any error to the global error handler
  }
};


const resendVerificationEmail = async (req, res, next) => {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors
        .array()
        .map((err) => err.msg)
        .join(", ");
      return sendResponse(res, 400, message, null);
    }

    const { email } = req.body;
 

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return sendResponse(
        res,
        404,
        "User not found with this email address",
        null
      );
    }

    // Check if user is already verified
    if (user.isEmailVerified) {
      return sendResponse(
        res,
        400,
        "Email is already verified",
        null
      );
    }

    // Check if there's a recent verification email sent (rate limiting)
    // const lastVerificationTime = user.emailVerificationExpire;
    // console.log(lastVerificationTime)
    // const now = Date.now();
    // const cooldownPeriod = 3 * 60 * 1000; // 1 minutes cooldown
    // console.log(lastVerificationTime && (now - lastVerificationTime) < cooldownPeriod)

    // if (lastVerificationTime && (now - lastVerificationTime) < cooldownPeriod) {
    //   const remainingTime = Math.ceil((cooldownPeriod - (now - lastVerificationTime)) / 1000);
    //   return sendResponse(
    //     res,
    //     429,
    //     `Please wait ${remainingTime} seconds before requesting another verification email`,
    //     null
    //   );
    // }

    // Generate new email verification token
    const emailVerificationToken = user.generateEmailVerificationToken();
    await user.save();

    // Send verification email
    try {
      const verificationUrl = `${req.protocol}://${req.get(
        "host"
      )}/api/auth/verify-email/${emailVerificationToken}`;
      
      await sendVerificationEmailSignup({ 
        verificationUrl, 
        email: user.email, 
        firstName: user.firstName 
      }, res);

      // return sendResponse(
      //   res,
      //   200,
      //   "Verification email sent successfully. Please check your email.",
      //   {
      //     email: user.email,
      //     message: "Please check your email for verification instructions"
      //   }
      // );
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      
      // Clean up verification token if email fails
      user.emailVerificationToken = undefined;
      user.emailVerificationExpire = undefined;
      await user.save();

      return sendResponse(
        res,
        500,
        "Failed to send verification email. Please try again later.",
        null
      );
    }

  } catch (err) {
    next(err);
  }
};


// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map((err) => err.msg)
      .join(", ");
    return sendResponse(res, 400, message, null);
  }

  const { email, password, rememberMe = false } = req.body;

  try {
    // Find user and check credentials
    const user = await User.findByCredentials(email, password);

    // Update metadata
    user.metadata.lastLoginIP = req.ip;
    user.metadata.userAgent = req.get("User-Agent");
    await user.save();

    // Generate tokens
    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    // Clean old refresh tokens and add new one
    user.refreshTokens = user.refreshTokens.filter(
      (tokenObj) =>
        tokenObj.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );
    user.refreshTokens.push({ token: refreshToken });

    await user.save();

    // Set cookie with appropriate expiry
    const cookieExpiry = rememberMe
      ? 7 * 24 * 60 * 60 * 1000
      : 24 * 60 * 60 * 1000;
    const cookieOptions = {
      expires: new Date(Date.now() + cookieExpiry),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);
    const data = {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
        lastLogin: user.lastLogin,
        preferences: user.preferences,
      },
      accessToken,
    };

    return sendResponse(res, 200, "Login successfully", data);
  } catch (error) {
    return next(error);
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;


  if (refreshToken) {
    // Remove refresh token from user's tokens array

    await User.findByIdAndUpdate(
      req.userId,
      {
        $pull: { refreshTokens: { token: refreshToken } },
      },
      { new: true } // যেন আপডেট হওয়া ডেটা return করে
    );
   
  }
 
  const user=await User.findById(req.userId)
  user.cleanExpiredRefreshTokens()



  // Clear cookie
  res.clearCookie("refreshToken");

  res.json({
    success: true,
    message: "Logout successful",
  });
};
const checkUser = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorResponse( "User not found",400));
    }
    const { password, ...rest } = user._doc;
    const data = {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
        lastLogin: user.lastLogin,
        preferences: user.preferences,
      },
    };

    return sendResponse(res, 200, "user Reactive", data);
  } catch (error) {
   
    return next(error)
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh-token
// @access  Public
const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return next(new ErrorResponse("Refresh token not provided", 401));
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (
      !user ||
      !user.refreshTokens.some((tokenObj) => tokenObj.token === refreshToken)
    ) {
      return next(new ErrorResponse("Invalid refresh token", 401));
    }

    // Generate new access token
    const accessToken = user.generateAuthToken();

    res.json({
      success: true,
      data: { accessToken },
    });
  } catch (error) {
    return next(new ErrorResponse("Invalid refresh token", 401));
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map((err) => err.msg)
      .join(", ");
    return next(new ErrorResponse(message, 400, errors.array()));
  }

  const { email } = req.body;

  const user = await User.findOne({
    email: email.toLowerCase(),
    isActive: true,
  });

  if (!user) {
    // Don't reveal if user exists or not
    return res.json({
      success: true,
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  }

  // Generate reset token
  const resetToken = user.generatePasswordResetToken();
  await user.save();

  // Send reset email

  try {
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/auth/reset-password-link/${resetToken}`;

    sendVerificationEmailforgetpass(
      { resetUrl, email, firstName: user.firstName },
      res
    )

    // await sendEmail({
    //   email: user.email,
    //   subject: 'Password Reset Request',
    //   template: 'passwordReset',
    //   data: {
    //     name: user.fullName,
    //     resetUrl,
    //     expiryTime: '10 minutes'
    //   }
    // });

    
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save();
    console.log(error)

    return next(new ErrorResponse("Email could not be sent", 500));
  }
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resettoken
// @access  Public
const resetPasswordLinkverify = async (req, res, next) => {
  const resetToken = req.params.resettoken;
  console.log(resetToken);

  // Hash the token to compare with stored hash
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedResetToken,
    passwordResetExpire: { $gt: Date.now() },
    isActive: true,
  });

  if (!user) {
    return next(new ErrorResponse("Invalid or expired reset token", 400));
  }
  res
    .status(200)
    .redirect(`${process.env.FRONTEND_URL}/auth/resetpass/${resetToken}`);
};
const resetPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorResponse("Validation errors", 400, errors.array()));
  }

  const { password, resetToken } = req.body;

  // Hash the token to compare with stored hash
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedResetToken,
    passwordResetExpire: { $gt: Date.now() },
    isActive: true,
  });

  if (!user) {
    return next(new ErrorResponse("Invalid or expired reset token", 400));
  }

  // Set new password
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;

  // Clear all refresh tokens for security
  user.refreshTokens = [];

  await user.save();

  // Generate new tokens
  const accessToken = user.generateAuthToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshTokens.push({ token: refreshToken });
  await user.save();

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  res.json({
    success: true,
    message: "Password reset successful",
    data: {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      accessToken,
    },
  });
};

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
const verifyEmail = async (req, res, next) => {
  const verificationToken = req.params.token;

  const hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.redirect(`${process.env.FRONTEND_URL}/auth/verify/404/token Expaire`);
    return next(
      new ErrorResponse("Invalid or expired verification token", 400)
    );
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpire = undefined;
  await user.save();

  // ✅ Redirect using env variable
  res.redirect(`${process.env.FRONTEND_URL}/auth/verify?email=${user.email}`);
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  const user = await User.findById(req.userId).select("-refreshTokens");

  res.json({
    success: true,
    data: { user },
  });
};

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
const updateProfile = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorResponse("Validation errors", 400, errors.array()));
  }

  const fieldsToUpdate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    address: req.body.address,
    preferences: req.body.preferences,
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(
    (key) => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
  );

  const user = await User.findByIdAndUpdate(req.userId, fieldsToUpdate, {
    new: true,
    runValidators: true,
  }).select("-refreshTokens");

  res.json({
    success: true,
    message: "Profile updated successfully",
    data: { user },
  });
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorResponse("Validation errors", 400, errors.array()));
  }

  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.userId).select("+password");

  const isCurrentPasswordCorrect = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordCorrect) {
    return next(new ErrorResponse("Current password is incorrect", 400));
  }

  user.password = newPassword;
  // Clear all refresh tokens for security
  user.refreshTokens = [];
  await user.save();

  res.json({
    success: true,
    message: "Password changed successfully. Please login again.",
  });
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPasswordLinkverify,
  resetPassword,
  verifyEmail,
  getMe,
  updateProfile,
  changePassword,
  checkUser,
  resendVerificationEmail
};
