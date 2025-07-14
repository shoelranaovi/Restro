const User = require("../model/user.model");
const ErrorResponse = require("../utils/ErrorResponse");

/**
 * Middleware to verify the user's role from the database.
 * @param {string} requiredRole - The role required to access the resource. Default: "Admin".
 * @returns {Function} Middleware function.
 */
const RoleCheck =
  (requiredRole = "Admin") =>
  async (req, res, next) => {
    try {
      // Extract user ID from request (assume it's set by an authentication middleware)
      const userId = req.userId; // Ensure `userId` is set in a prior middleware (e.g., JWT auth)

      if (!userId) {
        return next(
          new ErrorResponse("Unauthorized access. User ID is missing.", 403)
        );
      }

      // Fetch user from the database
      const user = await User.findById(userId);

      if (!user) {
      }

      // Check the user's role
      if (user.role !== requiredRole) {
        return next(
          new ErrorResponse(
            `Access denied. Requires role: ${requiredRole}.`,
            403
          )
        );
      }

      // Proceed to the next middleware if the role matches
      next();
    } catch (error) {
      // Handle unexpected errors

      return next(
        new ErrorResponse("An error occurred during role verification.", 500)
      );
    }
  };

module.exports = RoleCheck;
