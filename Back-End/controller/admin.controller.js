const User = require("../model/user.model");
const ErrorResponse = require("../utils/ErrorResponse");
const sendResponse = require("../utils/response/sendResponse");

const getAlluser = async (req, res, next) => {
  try {
    // Fetch all users with selected fields
    const allUsers = await User.find({}).select("-password").lean();

    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({
        message: "No users found",
        data: [],
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "Users retrieved successfully",
      data: allUsers,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};
const deleteuser = async (req, res, next) => {
  const { id } = req.params;
  console.log(id)

  try {
    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      
      return next(new ErrorResponse(401,"Invalid user ID format"))
    }

    // Check if the user exists
    const userToDelete = await User.findById(id);
    if (!userToDelete) {
    
      return next(new ErrorResponse(401,"User not found"))
    }

    // Perform deletion
    await userToDelete.deleteOne();

    

    return sendResponse(res,200,"User deleted successfully",{_id:userToDelete._id})
  } catch (error) {
    console.error("Error deleting user:", error.message);

    return next(error)
  }
};

const updateUserbyadmin = async (req, res, next) => {
  const { role, firstName, lastName, status } = req.body;


  try {
    // Check if the user is authenticated (assumes `req.userId` is set by  middleware)
    const userId = req.params.id;

    if (!userId) {
      return next(n(401, "User not found."));
    }

    // Find the user by ID
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return next(new ErrorResponse(500, "User not found"));
    }

    // Update the fields provided in the request

    if (role) user.role = role;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (status) user.status = status;

    // Save the updated user to the database
    await user.save();

    // Respond with the updated user info
    return sendResponse(res, 200, "User information updated successfully.", {
      user,
    });
  } catch (error) {
    console.error("Error updating user info:", error.message);
    return next(new ErrorResponse(500, "Internal server error."));
  }
};

module.exports = { getAlluser, deleteuser, updateUserbyadmin };
