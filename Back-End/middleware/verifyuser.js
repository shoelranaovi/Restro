const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/ErrorResponse");

async function verifyUser(req, res, next) {
  try {
    // Header থেকে token নেয়া
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ErrorResponse("Unauthorized: No token provided", 401));
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 400));
  }
}

module.exports = verifyUser;
