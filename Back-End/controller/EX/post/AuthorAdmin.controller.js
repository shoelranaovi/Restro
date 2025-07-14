const Post = require("../../model/post.model");
const fs = require("fs");
const sharp = require("sharp");
const path = require("path");
const errorHandler = require("../../middleware/errorhandler");
const mongoose = require("mongoose");
const Comment = require("../../model/comment.model");
const cloudinary = require("../../confiq/claudinary");
const formatComments = require("../../helpers/formatComments");
const { io, getReceiverSocketId } = require("../../socket/socket");
const User = require("../../model/user.model");
const Notification = require("../../model/notification.model");
const Product = require("../../model/post.model");
const SearchFeatures = require("../../utils/searchFeatures");
const formatLikeCommentMessage = (senders) => {
  if (!senders || senders.length === 0) return "No one has liked your comment.";

  if (senders.length === 1) {
    return `${senders[0].username} liked your comment.`;
  }

  if (senders.length === 2) {
    return `${senders[0].username} and ${senders[1].username} liked your comment.`;
  }

  const othersCount = senders.length - 2;
  return `${senders[0].username}, ${senders[1].username} and ${othersCount} others liked your comment.`;
};

const formatLikeMessage = (senders) => {
  if (senders.length === 1) {
    return `${senders[0].username} liked your post`;
  } else if (senders.length === 2) {
    return `${senders[0].username} and ${senders[1].username} liked your post`;
  } else {
    return `${senders[0].username}, ${senders[1].username}, and ${
      senders.length - 2
    } others liked your post`;
  }
};

const formatCommentMessage = (senders) => {
  if (!senders || senders.length === 0)
    return "No one has commented on your post.";

  // If only one sender
  if (senders.length === 1) {
    return `${senders[0].username} commented on your post.`;
  }

  // If two senders
  if (senders.length === 2) {
    return `${senders[0].username} and ${senders[1].username} commented on your post.`;
  }

  // If more than two senders
  if (senders.length > 2) {
    const othersCount = senders.length - 2;
    return `${senders[0].username}, ${senders[1].username} and ${othersCount} others commented on your post.`;
  }

  return "No one has commented on your post.";
};
const formatReplyMessage = (senders) => {
  if (!senders || senders.length === 0)
    return "No one has replied to your comment.";

  // If only one sender
  if (senders.length === 1) {
    return `${senders[0].username} replied to your comment.`;
  }

  // If two senders
  if (senders.length === 2) {
    return `${senders[0].username} and ${senders[1].username} replied to your comment.`;
  }

  // If more than two senders
  if (senders.length > 2) {
    const othersCount = senders.length - 2;
    return `${senders[0].username}, ${senders[1].username} and ${othersCount} others replied to your post.`;
  }

  return "No one has replied to your comment.";
};

const getUserNotifications = async (req, res, next) => {
  try {
    const userId = req.userId; // JWT Middleware থেকে পাওয়া Logged-in User ID

    // Fetch only notifications where the receiver is the logged-in user
    const notifications = await Notification.find({ receiver: userId })
      .populate("sender", "name profilePic") // Sender-এর নাম ও প্রোফাইল পিকচার দেখানো
      .populate("post", "title") // পোস্টের তথ্য দেখানো
      .sort({ createdAt: -1 }); // নতুন Notifications আগে দেখানো

    res.status(200).json({
      message: "User notifications retrieved successfully.",
      data: notifications, // শুধুমাত্র রিসিভার ইউজারের নোটিফিকেশন পাঠাবে
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error fetching user notifications:", error.message);
    next(errorHandler(500, "Internal Server Error"));
  }
};

/// todo for multiple file
// const createpost = async (req, res, next) => {
//   const image = req.files[0];
//   let publicId = null;

//   try {
//     if (!image) return next(errorHandler(400, "image is required"));
//     const optimizedImageBuffer = await sharp(image.buffer)
//       .resize({ width: 800, height: 800, fit: "inside" })
//       .toFormat("jpeg", { quality: 80 })
//       .toBuffer();
//     const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
//       "base64"
//     )}`;
//     const cloudinaryResponse = await cloudinary.uploader.upload(fileUri);
//     publicId = cloudinaryResponse.public_id;

//     const newPost = new Post({
//       author: req.userId,
//       Images: image ? cloudinaryResponse.secure_url : null,
//       privacy: req.body.privacy,
//       content: req.body.content,
//     });

//     const savedPost = await newPost.save();
//     const postId = savedPost._id;

//     const post = await Post.findById(postId).lean().populate("author");

//     res.status(200).json({
//       message: "Post created successfully",
//       data: post,
//       error: true,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error.message);

//     // যদি কোনো সমস্যা হয়, Cloudinary থেকে ইমেজ মুছে ফেলা হবে
//     if (publicId) {
//       try {
//         await cloudinary.uploader.destroy(publicId);
//         console.log("Image deleted from Cloudinary due to an error.");
//       } catch (deleteError) {
//         console.log(
//           "Failed to delete image from Cloudinary:",
//           deleteError.message
//         );
//       }
//     }

//     return res.status(500).json({
//       message: "Error creating post",
//     });
//   }
// };

//  done

///
const createpost = async (req, res, next) => {
  ///imprement
  const files = req.files; // ⬅️ ইমেজ এবং ভিডিও ফাইল

  let uploadedImages = [];
  const uploadedPublicIds = [];

  try {
    if (!files || Object.keys(files).length === 0) {
      return next(errorHandler(400, "At least one image or video is required"));
    }

    const Images = files["Images"] || [];

    const logo = files["logo"] || [];

    // 🔹 ইমেজ প্রসেসিং (Cloudinary + Sharp Optimization)
    for (const image of Images) {
      const optimizedImageBuffer = await sharp(image.buffer)
        .resize({ width: 800, height: 800, fit: "inside" })
        .toFormat("jpeg", { quality: 80 })
        .toBuffer();
      const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
        "base64"
      )}`;

      const cloudinaryResponse = await cloudinary.uploader.upload(fileUri, {
        resource_type: "image",
        folder: "product_image",
      });
      uploadedImages.push({
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      });
      uploadedPublicIds.push(cloudinaryResponse.public_id);
    }
    for (const Logo of logo) {
      const optimizedImageBuffer = await sharp(Logo.buffer)
        .resize({ width: 800, height: 800, fit: "inside" })
        .toFormat("jpeg", { quality: 80 })
        .toBuffer();
      const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
        "base64"
      )}`;

      const cloudinaryResponse = await cloudinary.uploader.upload(fileUri, {
        resource_type: "image",
        folder: "brand_logo",
      });
      uploadedPublicIds.push(cloudinaryResponse.public_id);
      const brandLogo = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };

      req.body.brand = {
        name: req.body.brandname,
        logo: brandLogo,
      };
    }
    req.body.images = uploadedImages;
    req.body.user = req.userId;

    let specs = [];
    if (typeof req.body.specifications === "string") {
      try {
        specs = JSON.parse(req.body.specifications);
      } catch (error) {
        return next(errorHandler(400, "Invalid specifications format"));
      }
    } else {
      specs = req.body.specifications || [];
    }

    req.body.specifications = specs;
    const product = await Product.create(req.body);

    res.status(200).json({
      message: "Post created successfully",
      data: product,
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);

    // 🔹 যদি কোনো সমস্যা হয়, Cloudinary থেকে সব ইমেজ ও ভিডিও মুছে ফেলা হবে
    if (uploadedPublicIds.length > 0) {
      try {
        for (const publicId of uploadedPublicIds) {
          await cloudinary.uploader.destroy(publicId);
        }
        console.log("Media deleted from Cloudinary due to an error.");
      } catch (deleteError) {
        console.log(
          "Failed to delete media from Cloudinary:",
          deleteError.message
        );
      }
    }

    return res.status(500).json({
      message: "Error creating post",
    });
  }
};

//complete
const getadminProduct = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    data: products,
  });
};
const getpostByid = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findProduct = await Post.findById(id);

    // .populate("author", "role username avatar")
    // .populate({
    //   path: "comment",
    //   options: { sort: { createdAt: -1 } },
    //   populate: {
    //     path: "userId", // Populate user details inside each comment
    //   },
    // })
    if (!findProduct) {
      return next(errorHandler(400, "product not found"));
    }
    // const comment = await Comment.find({ postId: id }).populate(
    //   "user",
    //   "username email "
    // );

    res.status(200).json({
      data: findProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log(error);
    return next(errorHandler(400, error.message));
  }
};

const update = async (req, res, next) => {
  let uploadedImages = [];
  const uploadedPublicIds = [];
  const files = req.files || {};
  const Id = req.params.id;

  if (!Id) return res.status(400).json({ message: "Product ID is required" });

  try {
    const prevPost = await Product.findById(Id);
    if (!prevPost)
      return res.status(404).json({ message: "Product not found" });

    const uploadToCloudinary = async (buffer, folder) => {
      const optimizedImageBuffer = await sharp(buffer)
        .resize({ width: 800, height: 800, fit: "inside" })
        .toFormat("jpeg", { quality: 80 })
        .toBuffer();
      const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
        "base64"
      )}`;
      return await cloudinary.uploader.upload(fileUri, {
        resource_type: "image",
        folder,
      });
    };

    // Handle Images
    const Images = files["Images"] || [];
    console.log("Images", Images);

    if (Images.length > 0) {
      // Delete previous images from Cloudinary
      for (const image of prevPost.images || []) {
        await cloudinary.uploader.destroy(image.public_id);
        console.log("image delete");
      }

      for (const image of Images) {
        const cloudinaryResponse = await uploadToCloudinary(
          image.buffer,
          "product_image"
        );
        uploadedImages.push({
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        });
        uploadedPublicIds.push(cloudinaryResponse.public_id);
        req.body.images = uploadedImages;
      }
    }

    // Handle Brand Logo
    const logo = files["logo"] || [];

    if (logo.length > 0) {
      if (prevPost.brand?.logo?.public_id) {
        await cloudinary.uploader.destroy(prevPost.brand.logo.public_id);
        console.log("image delete");
      }

      const cloudinaryResponse = await uploadToCloudinary(
        logo[0].buffer,
        "brand_logo"
      );
      req.body.brand = {
        name: req.body.brandname,
        logo: {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        },
      };
      uploadedPublicIds.push(cloudinaryResponse.public_id);
    }

    // Parse Specifications
    if (typeof req.body.specifications === "string") {
      try {
        req.body.specifications = JSON.parse(req.body.specifications);
      } catch (error) {
        return next(errorHandler(400, "Invalid specifications format"));
      }
    }

    const product = await Product.findByIdAndUpdate(Id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Post updated successfully",
      data: product,
      error: false,
      success: true,
    });
  } catch (error) {
    console.error(error);
    // Rollback Cloudinary Uploads if Error Occurs
    if (uploadedPublicIds.length > 0) {
      for (const publicId of uploadedPublicIds) {
        await cloudinary.uploader.destroy(publicId);
      }
      console.log("Media deleted from Cloudinary due to an error.");
    }

    return res.status(500).json({ message: "Error updating post" });
  }
};

const deletepost = async (req, res, next) => {
  try {
    // Find the existing post
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(errorHandler(404, "product not found"));
    }

    // If the post already has images, delete the old ones
    if (product.images?.length > 0) {
      // Delete previous images from Cloudinary
      for (const image of product.images || []) {
        await cloudinary.uploader.destroy(image.public_id);
        console.log("image delete");
      }
    }

    if (product.brand?.logo?.public_id) {
      await cloudinary.uploader.destroy(product.brand.logo.public_id);
      console.log("logo delete");
    }

    const deletedprduct = await Product.findByIdAndDelete(req.params.id);

    // Update the post with new data

    res.status(200).json({
      message: "product deleted successfully",
      data: deletedprduct,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error delete post:", error.message);
    return next(errorHandler(500, "Internal server error"));
  }
};
const getAllPost = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = "-createdAt" } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const posts = await Post.find({})
      .sort(sort)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .populate("author") // ✅ Populate author details
      .populate("like") // ✅ Populate likes
      .populate({
        path: "comment", // ✅ Populate comments
        populate: { path: "userId", select: "username avatar" }, // ✅ Populate user details inside comments
      });

    const totalPosts = await Post.countDocuments();

    // ✅ Ensure comments are formatted with nested replies
    const formattedPosts = posts.map((post) => ({
      ...post.toObject(), // Convert Mongoose document to plain JS object
      comment: formatComments(post.comment), // Apply formatting
    }));

    res.status(200).json({
      message: "Posts retrieved successfully",
      data: formattedPosts,
      pagination: {
        totalPosts,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalPosts / limitNumber),
        limit: limitNumber,
      },
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error retrieving posts:", error.message);
    next(errorHandler(500, "Internal Server Error"));
  }
};
const getAllProducts = async (req, res, next) => {
  const resultPerPage = 3;
  const productsCount = await Product.countDocuments();

  const searchFeature = new SearchFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await searchFeature.query;
  let filteredProductsCount = products.length;

  searchFeature.pagination(resultPerPage);

  products = await searchFeature.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
};
// const getPosts = async (req, res, next) => {
//   try {
//     const startIndex = parseInt(req.query.startIndex) || 0;
//     const limit = parseInt(req.query.limit) || 9;
//     const sortDirection = req.query.order === "asc" ? 1 : -1;
//     const posts = await Post.find({
//       ...(req.query.userId && { userId: req.query.userId }),
//       ...(req.query.category && { category: req.query.category }),
//       ...(req.query.slug && { slug: req.query.slug }),
//       ...(req.query.postId && { _id: req.query.postId }),
//       ...(req.query.searchTerm && {
//         $or: [
//           { title: { $regex: req.query.searchTerm, $options: "i" } },
//           { content: { $regex: req.query.searchTerm, $options: "i" } },
//         ],
//       }),
//     })
//       .populate("author")
//       .populate("like")
//       .populate("comment")
//       .sort({ updatedAt: sortDirection })
//       .skip(startIndex)
//       .limit(limit);

//     const totalPosts = await Post.countDocuments();

//     const now = new Date();

//     const oneMonthAgo = new Date(
//       now.getFullYear(),
//       now.getMonth() - 1,
//       now.getDate()
//     );

//     const lastMonthPosts = await Post.countDocuments({
//       createdAt: { $gte: oneMonthAgo },
//     });

//     res.status(200).json({
//       posts,
//       totalPosts,
//       lastMonthPosts,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const releatedpost = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Validate the blog post ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid post ID.",
      });
    }
    // Find the original post
    const blogPost = await Post.findById(id).select("title");
    if (!blogPost) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Post not found.",
      });
    }

    // Create a regex pattern for the title (escaping special characters)
    const titleRegex = new RegExp(
      blogPost.title
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .split(" ")
        .join("|"),
      "i"
    );

    // Query to find related posts (excluding the current one)
    const relatedQuery = {
      _id: { $ne: id },
      title: { $regex: titleRegex },
    };

    // Fetch related posts with a limit and projection
    const relatedPosts = await Post.find(relatedQuery)
      .select("title description createdAt") // Return only necessary fields
      .limit(5); // Limit the number of related posts

    // Response with related posts
    res.status(200).json({
      success: true,
      error: false,
      data: relatedPosts,
    });
  } catch (error) {
    console.error(error);
    next(errorHandler(400, "error occoured")); // Pass the error to the error handler middleware
  }
};
const likeOrUnlikePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.userId; // User ID from JWT Middleware

    // Find post with author details
    const post = await Post.findById(postId).populate("author");
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found.", success: false, error: true });
    }

    const postOwnerId = post.author._id.toString();

    // Find the user who is liking/unliking
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false, error: true });
    }

    const isAlreadyLiked = post.like.includes(userId);

    if (isAlreadyLiked) {
      // ✅ Unlike the post
      await Post.findByIdAndUpdate(postId, { $pull: { like: userId } });

      // ✅ Remove the user from the notification sender list
      const existingNotification = await Notification.findOne({
        type: "like",
        receiver: postOwnerId,
        post: postId,
      });

      if (existingNotification) {
        existingNotification.sender = existingNotification.sender.filter(
          (id) => id.toString() !== userId
        );

        if (existingNotification.sender.length === 0) {
          await Notification.findByIdAndDelete(existingNotification._id); // Delete if no likers left
        } else {
          // ✅ Update the message after removing a user
          await existingNotification.populate("sender", "username");
          existingNotification.message = formatLikeMessage(
            existingNotification.sender
          );
          await existingNotification.save();
        }
      }
    } else {
      // ✅ Like the post
      await Post.findByIdAndUpdate(postId, { $addToSet: { like: userId } });

      // ✅ Save or Update Notification
      let notification = await Notification.findOne({
        type: "like",
        receiver: postOwnerId,
        post: postId,
      }).populate("sender", "username");

      if (notification) {
        if (!notification.sender.some((s) => s._id.toString() === userId)) {
          notification.sender.push(user._id);
        }
      } else {
        notification = new Notification({
          type: "like",
          sender: [user._id], // Store as an array
          receiver: postOwnerId,
          post: postId,
        });
      }

      // ✅ Ensure notification is populated before saving
      await notification.populate("sender", "username");
      console.log(notification); // Corrected logging

      // ✅ Generate the formatted like message
      notification.message = formatLikeMessage(notification.sender);

      // ✅ Save notification before emitting real-time event
      await notification.save();

      // ✅ Prevent notifying the post owner if they liked their own post
      if (postOwnerId !== userId) {
        const postOwnerSocketId = getReceiverSocketId(postOwnerId);
        if (postOwnerSocketId) {
          io.to(postOwnerSocketId).emit("notification", {
            postId,
            notificationId: notification._id,
            message: notification.message,
          });
        }
      }
    }

    // ✅ Get the updated post with the latest likes
    const updatedPost = await Post.findById(postId).populate("like");

    return res.status(200).json({
      message: isAlreadyLiked
        ? "Post unliked successfully."
        : "Post liked successfully.",
      data: updatedPost,
      success: true,
    });
  } catch (error) {
    console.error("Error in like/unlike:", error.message);
    next(errorHandler(500, "Internal server error."));
  }
};

const addcomment = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const authorId = req.userId; // User ID from JWT Middleware
    const { comment } = req.body;

    if (!comment) return next(errorHandler(400, "Comment is required"));

    const post = await Post.findById(postId);
    if (!post) return next(errorHandler(404, "Post not found"));

    // Create a new comment
    const newComment = await Comment.create({
      comment,
      userId: authorId,
      postId,
    });

    // Add the new comment to the post's comment array
    await Post.findByIdAndUpdate(postId, {
      $push: { comment: newComment._id },
    });

    // Populate the updated post with the new comments
    const updatedPost = await Post.findById(postId).populate({
      path: "comment",
      populate: { path: "userId" },
    });

    const postOwnerId = post.author._id.toString();

    // Prevent the post owner from receiving a notification about their own comment
    if (postOwnerId !== authorId) {
      // Create and save the notification
      let notification = await Notification.findOne({
        type: "comment",
        sender: authorId,
        receiver: postOwnerId,
        post: postId,
      }).populate("sender", "username");

      if (!notification) {
        notification = new Notification({
          type: "comment",
          sender: [authorId], // Store as an array
          receiver: postOwnerId,
          post: postId,
        });
      } else {
        if (!notification.sender.some((s) => s._id.toString() === authorId)) {
          notification.sender.push(authorId);
        }
      }

      // Repopulate the sender list and format the comment message
      notification = await notification.populate("sender", "username");

      // Generate the formatted comment message
      notification.message = formatCommentMessage(notification.sender);

      // Save notification
      await notification.save();

      // Send real-time notification
      const postOwnerSocketId = getReceiverSocketId(postOwnerId);
      if (postOwnerSocketId) {
        io.to(postOwnerSocketId).emit("notification", {
          postId,
          notificationId: notification._id,
          message: notification.message,
        });
      }
    }

    res.status(200).json({
      message: "Comment added successfully",
      comments: formatComments(updatedPost.comment),
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error in adding comment:", error.message);
    next(errorHandler(500, "Internal Server Error"));
  }
};

// const addreplycomment = async (req, res, next) => {
//   try {
//     const postId = req.params.id;
//     const authorId = req.userId;
//     const { comment,parentId  } = req.body;
//     console.log(req.body);

//     const post = await Post.findById(postId);
//     if (!comment) return next(errorHandler(400, "comment is required"));

//     const newcomment = new Comment({
//       comment,
//       userId: authorId,
//       postId: postId,
//       parentId: parentId || null
//     });
//     const savecomment = await newcomment.save();

//     post.comment.push(savecomment._id);
//     const savepost = await post.save();
//     const populatedPost = await savepost.populate({
//       path: "comment", // Ensure the correct reference
//       options: { sort: { createdAt: -1 } }, // ✅ Sorting comments by newest first
//       populate: {
//         path: "userId", // ✅ Populate user details inside each comment
//       },
//     });
//     const structuredComments = populatedPost.comment.filter(c => !c.parentId).map(parent => ({
//       ...parent.toObject(),
//       replies: populatedPost.comment.filter(c => String(c.parentId) === String(parent._id)),
//     }));

//     res.status(200).json({
//       message: "comment done",
//       comments: structuredComments,
//       success: true,
//       error: false,
//     });
//   } catch (error) {
//     console.log(error);
//     return next(errorHandler(400, "internal server error"));
//   }
// };
const addReplyComment = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const { comment, parentId } = req.body;
    const authorId = req.userId;

    if (!comment) return next(errorHandler(400, "Comment is required"));

    const post = await Post.findById(postId);
    if (!post) return next(errorHandler(404, "Post not found"));

    // Check if the parent comment exists if parentId is provided
    if (parentId) {
      const parentComment = await Comment.findById(parentId);
      if (!parentComment)
        return next(errorHandler(404, "Parent comment not found"));
    }

    // Create the new reply comment
    const newComment = await Comment.create({
      comment,
      userId: authorId,
      postId,
      parentId,
    });

    // Add the new comment to the post's comment array
    await Post.findByIdAndUpdate(postId, {
      $push: { comment: newComment._id },
    });

    // Get the updated post with populated comments
    const updatedPost = await Post.findById(postId).populate({
      path: "comment",
      populate: { path: "userId" },
    });

    const postOwnerId = post.author._id.toString();

    // Prevent the post owner from receiving a notification about their own comment/reply
    if (postOwnerId !== authorId) {
      let notification = await Notification.findOne({
        type: "comment",
        sender: authorId,
        receiver: postOwnerId,
        post: postId,
      }).populate("sender", "username");

      if (!notification) {
        notification = new Notification({
          type: "comment",
          sender: [authorId], // Store as an array
          receiver: postOwnerId,
          post: postId,
        });
      } else {
        if (!notification.sender.some((s) => s._id.toString() === authorId)) {
          notification.sender.push(authorId);
        }
      }

      // Repopulate the sender list and format the reply message
      notification = await notification.populate("sender", "username");

      // Generate the formatted reply message
      notification.message = formatReplyMessage(notification.sender);

      // Save the notification
      await notification.save();

      // Send real-time notification
      const postOwnerSocketId = getReceiverSocketId(postOwnerId);
      if (postOwnerSocketId) {
        io.to(postOwnerSocketId).emit("notification", {
          postId,
          notificationId: notification._id,
          message: notification.message,
        });
      }
    }

    res.status(200).json({
      message: "Reply added successfully",
      comments: formatComments(updatedPost.comment),
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error in adding reply:", error.message);
    next(errorHandler(500, "Internal Server Error"));
  }
};

const addlikeComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const userId = req.userId;

    const comment = await Comment.findById(commentId).populate(
      "userId",
      "username"
    );
    if (!comment) return next(errorHandler(404, "Comment not found"));

    const commentOwnerId = comment.userId._id.toString();
    const isLiked = comment.likes.includes(userId);

    if (isLiked) {
      // ✅ Unlike the comment
      comment.likes.pull(userId);

      // ✅ Find notification for this comment owner
      const existingNotification = await Notification.findOne({
        type: "comment-like",
        receiver: commentOwnerId,
      }).populate("sender", "username");

      if (existingNotification) {
        existingNotification.sender = existingNotification.sender.filter(
          (sender) => sender._id.toString() !== userId
        );

        if (existingNotification.sender.length === 0) {
          await Notification.findByIdAndDelete(existingNotification._id); // Delete if no likers left
        } else {
          console.log("ffff", existingNotification.sender);

          existingNotification.message = formatLikeCommentMessage(
            existingNotification.sender
          );
          await existingNotification.save();
        }
      }
    } else {
      // ✅ Like the comment
      comment.likes.push(userId);

      // ✅ Find existing notification for this comment owner
      let notification = await Notification.findOne({
        type: "comment-like",
        receiver: commentOwnerId,
      }).populate("sender", "username");

      if (notification) {
        // ✅ Check if the user is already in the sender list
        const alreadyLiked = notification.sender.some(
          (s) => s._id.toString() === userId
        );
        if (!alreadyLiked) {
          notification.sender.push(userId);
        }
      } else {
        // ✅ Create a new notification
        notification = new Notification({
          type: "comment-like",
          sender: [userId],
          receiver: commentOwnerId,
        });
      }

      // ✅ Repopulate sender list
      notification = await notification.populate("sender", "username");

      console.log("hhhhh", notification.sender);

      // ✅ Generate formatted message
      notification.message = formatLikeCommentMessage(notification.sender);

      // ✅ Save notification
      await notification.save();

      // ✅ Send real-time notification only if the liker is not the owner
      if (commentOwnerId !== userId) {
        const commentOwnerSocketId = getReceiverSocketId(commentOwnerId);
        if (commentOwnerSocketId) {
          io.to(commentOwnerSocketId).emit("notification", {
            notificationId: notification._id,
            message: notification.message,
          });
        }
      }
    }

    await comment.save(); // ✅ Save updated comment likes

    res.status(200).json({
      message: isLiked
        ? "Comment unliked successfully."
        : "Comment liked successfully.",
      likes: comment.likes,
      success: true,
    });
  } catch (error) {
    console.error("Error in like/unlike comment:", error.message);
    next(errorHandler(500, "Internal Server Error"));
  }
};
const createReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  console.log(req.body);
  const user = await User.findById(req.userId);

  const review = {
    user: req.userId,
    name: user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(errorHandler(404, "Product Not Found"));
  }

  const isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.userId.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.userId.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    data: product,
  });
};
const getAllReview = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(errorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};

const deleteReview = async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  console.log(req.params.id);

  if (!product) {
    return next(errorHandler("Product Not Found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.params.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings: Number(ratings),
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    data: {
      _id: req.params.id,
    },
  });
};

module.exports = {
  createpost,
  update,
  deletepost,
  getAllPost,
  getAllProducts,
  getpostByid,
  releatedpost,
  likeOrUnlikePost,
  addcomment,
  addReplyComment,
  addlikeComment,
  getUserNotifications,
  getadminProduct,
  createReview,
  getAllReview,
  deleteReview,
};
