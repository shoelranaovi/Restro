const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ConnectDb = require("./confiq/ConnectDb");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");

const { app, server } = require("./socket/socket");
const sendResponse = require("./utils/response/sendResponse");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(helmet());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// CORS Configuration
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000",process.env.CLIENT_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log(origin)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy violation"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

// Static File Serving
app.use("/assets", express.static(path.join(__dirname, "./assets")));

// test server

app.use("/testServer", (req, res) => {
  return sendResponse(res, 200, "serverTest", null);
});

// Mount routes
app.use("/api/reservations", require("./Route/reservation.Route"));
app.use("/api/auth", require("./Route/auth.route"));
app.use("/api/product", require("./Route/product.route"));
app.use("/api/user", require("./Route/user.route"));
app.use("/api/cart", require("./Route/cart.route"));
app.use("/api/address", require("./Route/address.route"));
app.use("/api/order", require("./Route/order.route"));
app.use("/api/connect", require("./Route/contact.route"));
app.use("/api/admin", require("./Route/admin.route"));

// Error handler middleware
app.use(errorHandler);

// Passport Configuration
require("./confiq/passport")(app);

//uncatch Route
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
// Database Connection & Server Start
ConnectDb()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1);
  });
