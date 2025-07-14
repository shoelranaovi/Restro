const transporter = require("../../confiq/nodemailer");
const errorHandler = require("../../middleware/errorhandler");
const Mailverify = require("../../model/mailverify.model");
const User = require("../../model/user.model");
const {
  sendVerificationEmail,
  sendVerificationEmailForForgetpass,
} = require("../../utils/sendMail/sendmagiclink");
const { verifyEmailHTML } = require("../../utils/Tamplate/mailtamplate");
const generateJwtToken = require("../../utils/Token/generateToken");
const sendToken = require("../../utils/Token/sendToken");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");

const createUser = async (req, res, next) => {
  let publicId = null;
  let cloudinaryResponse; // ✅ Declare it before using

  try {
    const files = req.file;
    const { name, email, password, gender } = req.body;

    if (!files) return next(errorHandler(400, "Image is required"));

    // ✅ Optimize the image
    const optimizedImageBuffer = await sharp(files.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    // ✅ Convert to base64
    const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
      "base64"
    )}`;

    try {
      // ✅ Ensure Cloudinary creates the folder properly
      cloudinaryResponse = await cloudinary.uploader.upload(fileUri, {
        folder: "user_avatars", // Try adding "/" at the end
        use_filename: true,
        unique_filename: false,
      });

      publicId = cloudinaryResponse.public_id;
    } catch (cloudinaryError) {
      console.error("Cloudinary Upload Error:", cloudinaryError);
      return next(errorHandler(500, "Failed to upload image to Cloudinary"));
    }

    // ✅ Create user in the database
    const user = await User.create({
      name,
      email,
      gender,
      password,
      avatar: {
        public_id: publicId,
        url: cloudinaryResponse.secure_url,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      error: false,
      data: user,
    });
  } catch (error) {
    console.error("User Creation Error:", error.message);

    // ✅ If Cloudinary upload happened but user creation failed, delete the image
    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId);
        console.log("Image deleted from Cloudinary due to an error.");
      } catch (deleteError) {
        console.error(
          "Failed to delete image from Cloudinary:",
          deleteError.message
        );
      }
    }

    return next(errorHandler(400, error.message || "Error creating user"));
  }
};

const resendOpt = async (req, res, next) => {
  const { email } = req.body;

  console.log(email);
  const alreadyverify = await User.findOne({
    email: { $eq: email },
    isEmailVerified: true,
  });

  if (alreadyverify) {
    return res.status(400).json({ message: "Email is already verified" });
  }

  try {
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return next(errorHandler(400, "user not found"));
    }
    await Mailverify.deleteMany({ email: { $eq: email } }).exec();

    const data = { email: findUser.email, username: findUser.username };
    console.log(data);

    sendVerificationEmail(data, res);
  } catch (error) {
    console.log(error.message);
    next(errorHandler(401, "Internal Server Error"));
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return next(errorHandler(401, "Email is required"));
    }
    if (!password) {
      return next(errorHandler(401, "Password is required"));
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(errorHandler(401, "Invalid Email or Password"));
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return next(errorHandler(401, "Invalid  Password"));
    }
    sendToken(user, 202, res);
  } catch (error) {
    console.log(error);
    next(errorHandler(401, "Internal Server Error"));
  }
};
// const sendVerificationEmail = async (req, res, next) => {

//   const USER = process.env.EMAIL;
//   const PASS = process.env.PASSWORD;

//   const user = await User.findById(req.userId);

//   const { email, username } = user;

//   const verificationCode = Math.floor(10000 + Math.random() * 90000);
//   const tokendata = {
//     email,
//     verificationCode,
//   };

//   const token = generateJwtToken(tokendata);

//   const verificationLink = `http://localhost:3000/api/auth/user/verify?token=${token}`;

//   try {
//     let info = await transporter.sendMail({
//       from: `"Blogify" <${USER}>`,
//       to: email,
//       subject: "Verify your email address",
//       html: verifyEmailHTML(username, verificationLink, verificationCode),
//     });

//     const newVerification = new Mailverify({
//       email,
//       verificationCode,
//       messageId: info.messageId,
//       for: "signup",
//     });

//     await newVerification.save();

//     res.status(200).json({
//       message: `Verification email was successfully sent to ${email}`,
//     });
//   } catch (err) {
//     console.log(err);

//     console.log(
//       "Could not send verification email. There could be an issue with the provided credentials or the email service."
//     );
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };
const getinfo = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json({
      message: "User info retrieved successfully",
      data: rest,
      success: true,
      error: false,
    });
  } catch (error) {
    next(errorHandler(401, "error occoured"));
  }
};
const getsingleUserinfo = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json({
      message: "User info retrieved successfully",
      data: rest,
      success: true,
      error: false,
    });
  } catch (error) {
    next(errorHandler(401, "error occoured"));
  }
};
const verifyLink = async (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send("No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { email, verificationCode } = decoded;
    const [isVerified, verification] = await Promise.all([
      User.findOne({ email: { $eq: email }, isEmailVerified: true }),
      Mailverify.findOne({
        email: { $eq: email },
        verificationCode: { $eq: verificationCode },
      }),
    ]);

    if (isVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    if (!verification) {
      return res
        .status(400)
        .json({ message: "Verification code is invalid or has expired" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: { $eq: email } },
      { isEmailVerified: true },
      { new: true }
    )
      .select("-password")
      .exec();

    await Mailverify.deleteMany({ email: { $eq: email } }).exec();
    const tokendata = {
      userId: updatedUser._id,
    };

    res
      .status(200)
      .cookie("token", generateJwtToken(tokendata))
      .redirect(`http://localhost:5173/`);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};
const verifyotp = async (req, res, next) => {
  const { email, otp } = req.body;
  console.log(email, otp);

  try {
    const [isVerified, verification] = await Promise.all([
      User.findOne({ email: { $eq: email }, isEmailVerified: true }),
      Mailverify.findOne({
        email: { $eq: email },
        verificationCode: { $eq: otp },
      }),
    ]);

    if (isVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }
    console.log(verification);

    if (!verification) {
      return res
        .status(400)
        .json({ message: "Verification code is invalid or has expired" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: { $eq: email } },
      { isEmailVerified: true },
      { new: true }
    )
      .select("-password")
      .exec();

    await Mailverify.deleteMany({ email: { $eq: email } }).exec();
    sendToken(updatedUser, 202, res);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};
const forgetPass = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);

  try {
    const user = await User.findOne({ email: email });
    const data = { email: user.email, username: user.username };

    sendVerificationEmailForForgetpass(data, res);
  } catch (error) {
    console.log(error.message);
    next(errorHandler(401, "Internal Server Error"));
  }
};
const resetPassword = async (req, res, next) => {
  const { email, confirmPassword } = req.body;

  try {
    // Ensure both `oldPassword` and `password` are provided
    if (!confirmPassword) {
      return next(
        errorHandler(400, "Both old and new passwords are required.")
      );
    }

    // Fetch the user from the database
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found."));
    }

    // Update the password in the database
    user.password = confirmPassword;
    await user.save();

    // Respond with success
    return res.status(200).json({
      message: "Password updated successfully.",
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error updating password:", error.message);
    return next(errorHandler(500, "Internal server error."));
  }
};
const deleteUser = async (req, res, next) => {
  try {
    // Find the existing post
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(errorHandler(404, "user not found"));
    }

    // If the post already has images, delete the old ones
    if (user.avatar?.public_id) {
      // Delete previous images from Cloudinary

      await cloudinary.uploader.destroy(user.avatar?.public_id);
      console.log("image delete");
    }

    const deleteuser = await User.findByIdAndDelete(req.params.id);

    // Update the post with new data

    res.status(200).json({
      message: "user deleted successfully",
      data: deleteuser,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error delete post:", error.message);
    return next(errorHandler(500, "Internal server error"));
  }
};
const verifyLinkForgetPass = async (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send("No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email, verificationCode } = decoded;

    // todo remove isverifed
    const [isVerified, verification] = await Promise.all([
      User.findOne({ email: { $eq: email }, isEmailVerified: true }),
      Mailverify.findOne({
        email: { $eq: email },
        verificationCode: { $eq: verificationCode },
      }),
    ]);

    if (!verification) {
      return res
        .status(400)
        .json({ message: "Verification code is invalid or has expired" });
    }

    await Mailverify.deleteMany({ email: { $eq: email } }).exec();

    res
      .status(200)
      .redirect(
        `http://localhost:5173/password/reset?email=${encodeURIComponent(
          email
        )}`
      );
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res, next) => {
  try {
    // Log out the user using Passport's logout method

    // Clear the authentication cookie
    res.clearCookie("token", {
      path: "/", // Adjust path if needed
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure flag for production
      sameSite: "strict", // CSRF protection
    });

    // Respond with a success message
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createUser,
  resendOpt,
  verifyotp,
  getinfo,
  login,
  forgetPass,
  resetPassword,
  verifyLinkForgetPass,
  sendVerificationEmail,
  verifyLink,
  logout,
  getsingleUserinfo,
  deleteUser,
};
