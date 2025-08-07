const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      // SOLUTION 1: Make password conditionally required
      required: function () {
        return this.authProvider === "local" || this.authProvider === "hybrid";
      },
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    phone: {
      type: String,
      required: function () {
        return (
          this.authProvider === "local" ||
          (this.authProvider === "hybrid" && this.isPhoneRequired)
        );
      },
    },
    isPhoneRequired: {
      type: Boolean,
      default: false,
    },
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      zipCode: {
        type: String,
        match: [/^\d{5}(-\d{4})?$/, "Please provide a valid zip code"],
      },
      country: {
        type: String,
        trim: true,
        default: "USA",
      },
      // New: Full address string for display purposes
      full: {
        type: String,
        trim: true,
      },
    },
    role: {
      type: String,
      enum: ["Customer", "Admin", "Manager", "Chef", "Delivery"], // Added customer roles
      default: "Customer",
    },

    // NEW CUSTOMER-SPECIFIC FIELDS
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended", "Pending"],
      default: "Active",
    },
    totalOrders: {
      type: Number,
      default: 0,
      min: [0, "Total orders cannot be negative"],
    },
    totalSpent: {
      type: Number,
      default: 0,
      min: [0, "Total spent cannot be negative"],
    },
    lastOrder: {
      type: Date,
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    rating: {
      type: Number,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be more than 5"],
      default: 0,
    },
    loyaltyPoints: {
      type: Number,
      default: 0,
      min: [0, "Loyalty points cannot be negative"],
    },
    favoriteItems: [
      {
        type: String,
        trim: true,
      },
    ],
    orderFrequency: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly", "Quarterly", "Rarely", "First-time"],
      default: "First-time",
    },
    tags: [
      {
        type: String,
        trim: true,
        enum: [
          "VIP",
          "Regular",
          "New",
          "Premium",
          "Loyal",
          "Inactive",
          "High-Value",
          "Frequent",
        ],
      },
    ],

    avatar: {
      public_id: String,
      url: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    emailVerificationToken: String,
    emailVerificationExpire: Date,
    passwordResetToken: String,
    passwordResetExpire: Date,
    phoneVerificationToken: String,
    phoneVerificationExpire: Date,
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: Date,
    lastLogin: Date,
    refreshTokens: [
      {
        token: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    socialAuth: {
      google: {
        id: String,
        email: String,
        verified: { type: Boolean, default: false },
      },
      facebook: {
        id: String,
        email: String,
        verified: { type: Boolean, default: false },
      },
    },
    authProvider: {
      type: String,
      enum: ["local", "google", "facebook", "hybrid"],
      default: "local",
    },

    preferences: {
      notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
        push: { type: Boolean, default: true },
      },
      theme: {
        type: String,
        enum: ["light", "dark", "auto"],
        default: "auto",
      },
      language: {
        type: String,
        default: "en",
      },
    },
    metadata: {
      createdIP: String,
      lastLoginIP: String,
      userAgent: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ status: 1 });
userSchema.index({ totalOrders: -1 });
userSchema.index({ totalSpent: -1 });
userSchema.index({ rating: -1 });
userSchema.index({ loyaltyPoints: -1 });
userSchema.index({ tags: 1 });
userSchema.index({ orderFrequency: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ lastOrder: -1 });

// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for account lock status
userSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Virtual for customer tier based on total spent
userSchema.virtual("customerTier").get(function () {
  if (this.totalSpent >= 5000) return "Platinum";
  if (this.totalSpent >= 2000) return "Gold";
  if (this.totalSpent >= 500) return "Silver";
  return "Bronze";
});

// Virtual for customer lifetime value score
userSchema.virtual("lifetimeValueScore").get(function () {
  const spentWeight = this.totalSpent * 0.4;
  const ordersWeight = this.totalOrders * 10;
  const ratingWeight = this.rating * 20;
  const loyaltyWeight = this.loyaltyPoints * 0.1;

  return Math.round(spentWeight + ordersWeight + ratingWeight + loyaltyWeight);
});

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save middleware to update customer metrics
userSchema.pre("save", function (next) {
  // Auto-assign tags based on customer behavior
  if (
    this.isModified("totalSpent") ||
    this.isModified("totalOrders") ||
    this.isNew
  ) {
    const tags = [];

    // VIP customers
    if (this.totalSpent >= 1000 || this.totalOrders >= 20) {
      tags.push("VIP");
    }

    // Regular customers
    if (this.totalOrders >= 5 && this.totalOrders < 20) {
      tags.push("Regular");
    }

    // New customers
    if (this.totalOrders === 0) {
      tags.push("New");
    }

    // High-value customers
    if (this.totalSpent >= 2000) {
      tags.push("High-Value");
    }

    // Frequent customers
    if (["Daily", "Weekly"].includes(this.orderFrequency)) {
      tags.push("Frequent");
    }

    // Loyal customers (high rating and multiple orders)
    if (this.rating >= 4.5 && this.totalOrders >= 10) {
      tags.push("Loyal");
    }

    this.tags = [...new Set(tags)]; // Remove duplicates
  }

  // Set full address
  if (this.address && (this.isModified("address") || this.isNew)) {
    const addressParts = [this.address.city, this.address.state].filter(
      Boolean
    );

    this.address.full = addressParts.join(", ") || "Address not provided";
  }

  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "15m" }
  );
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || "7d",
  });
};

// Method to generate password reset token
userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// Method to generate email verification token
userSchema.methods.generateEmailVerificationToken = function () {
  const verificationToken = crypto.randomBytes(32).toString("hex");

  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  return verificationToken;
};

// Method to handle failed login attempts
userSchema.methods.incLoginAttempts = function () {
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 },
    });
  }

  const updates = { $inc: { loginAttempts: 1 } };
  const MAX_LOGIN_ATTEMPTS = 5;
  const LOCK_TIME = 2 * 60 * 60 * 1000; // 2 hours

  if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + LOCK_TIME };
  }

  return this.updateOne(updates);
};

// Method to reset login attempts
userSchema.methods.resetLoginAttempts = function () {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 },
  });
};

// NEW: Method to update customer metrics after order
userSchema.methods.updateOrderMetrics = function (orderAmount) {
  this.totalOrders += 1;
  this.totalSpent += orderAmount;
  this.lastOrder = new Date();
  this.loyaltyPoints += Math.floor(orderAmount / 10); // 1 point per $10 spent

  return this.save();
};

// NEW: Method to add favorite item
userSchema.methods.addFavoriteItem = function (item) {
  if (!this.favoriteItems.includes(item)) {
    this.favoriteItems.push(item);
    return this.save();
  }
  return Promise.resolve(this);
};

// NEW: Method to remove favorite item
userSchema.methods.removeFavoriteItem = function (item) {
  this.favoriteItems = this.favoriteItems.filter((fav) => fav !== item);
  return this.save();
};

// Static method to find by credentials
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({
    email: email.toLowerCase(),
    isActive: true,
  }).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (user.isLocked) {
    throw new Error(
      "Account temporarily locked due to too many failed login attempts"
    );
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    await user.incLoginAttempts();
    throw new Error("Invalid credentials");
  }

  if (user.loginAttempts > 0) {
    await user.resetLoginAttempts();
  }

  user.lastLogin = new Date();
  await user.save();

  return user;
};

// NEW: Static method to get customer analytics
userSchema.statics.getCustomerAnalytics = async function () {
  return await this.aggregate([
    {
      $match: { role: { $in: ["customer", "Customer"] } },
    },
    {
      $group: {
        _id: null,
        totalCustomers: { $sum: 1 },
        averageOrderCount: { $avg: "$totalOrders" },
        averageSpending: { $avg: "$totalSpent" },
        averageRating: { $avg: "$rating" },
        totalRevenue: { $sum: "$totalSpent" },
        totalOrders: { $sum: "$totalOrders" },
      },
    },
  ]);
};

// NEW: Static method to find top customers
userSchema.statics.findTopCustomers = async function (
  limit = 10,
  sortBy = "totalSpent"
) {
  const sortOptions = {};
  sortOptions[sortBy] = -1;

  return await this.find({
    role: { $in: ["customer", "Customer"] },
    isActive: true,
  })
    .sort(sortOptions)
    .limit(limit)
    .select(
      "-password -refreshTokens -emailVerificationToken -passwordResetToken"
    );
};

// Static method to find or create social user
userSchema.statics.findOrCreateSocialUser = async function (profile, provider) {
  const email =
    profile.emails && profile.emails[0] ? profile.emails[0].value : null;

  let user = await this.findOne({
    [`socialAuth.${provider}.id`]: profile.id,
  });
 
  if (user) {
    user.lastLogin = new Date();
    user.isActive = true;

    if (email && user.email === email.toLowerCase()) {
      user.isEmailVerified = true;
      user[`socialAuth.${provider}.verified`] = true;
    }

    await user.save();
    return user;
  }

  if (email) {
    user = await this.findOne({ email: email.toLowerCase() });

    if (user) {
      user.socialAuth[provider] = {
        id: profile.id,
        email: email,
        verified: true,
      };
      user.authProvider =
        user.authProvider === "local" ? "hybrid" : user.authProvider;
      user.isEmailVerified = true;
      user.lastLogin = new Date();
      await user.save();
      return user;
    }
  }

  const newUser = new this({
    firstName:
      profile.name?.givenName || profile.displayName?.split(" ")[0] || "User",
    lastName:
      profile.name?.familyName ||
      profile.displayName?.split(" ").slice(1).join(" ") ||
      "",
    email: email ? email.toLowerCase() : `${provider}_${profile.id}@temp.local`,
    address: {
      street: "Not provided",
      city: "Not provided",
      state: "Not provided",
      zipCode: "00000",
      country: "USA",
    },
    socialAuth: {
      [provider]: {
        id: profile.id,
        email: email,
        verified: true,
      },
    },
    authProvider: provider,
    isEmailVerified: email ? true : false,
    isPhoneRequired: false,
    avatar: {
      url: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
    },
    lastLogin: new Date(),
  });

  await newUser.save();
  return newUser;
};

const TOKEN_LIFETIME = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
// Method to remove expired refresh tokens
userSchema.methods.cleanExpiredRefreshTokens = function () {
  const now = Date.now();

  

  this.refreshTokens = this.refreshTokens.filter((rt) => {
    return now - new Date(rt.createdAt).getTime() <= TOKEN_LIFETIME;
  });
  

  return this.save(); // Save updated user doc
};


const User = mongoose.model("User", userSchema);

module.exports = User;
