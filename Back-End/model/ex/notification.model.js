const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["like", "comment", "follow","comment-like"],
      required: true,
    },
    sender: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }],
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: false, // কিছু নোটিফিকেশন পোস্টের সাথে যুক্ত নাও হতে পারে
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false, // ডিফল্ট ভাবে Unread থাকবে
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification
