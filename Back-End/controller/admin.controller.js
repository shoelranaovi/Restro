const Notification = require("../model/Notification.model");
const Order = require("../model/order.model");
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

  try {
    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return next(new ErrorResponse(401, "Invalid user ID format"));
    }

    // Check if the user exists
    const userToDelete = await User.findById(id);
    if (!userToDelete) {
      return next(new ErrorResponse(401, "User not found"));
    }

    // Perform deletion
    await userToDelete.deleteOne();

    return sendResponse(res, 200, "User deleted successfully", {
      _id: userToDelete._id,
    });
  } catch (error) {
    console.error("Error deleting user:", error.message);

    return next(error);
  }
};

const updateUserbyadmin = async (req, res, next) => {
  const { role, firstName, lastName, status } = req.body;

  try {
    // Check if the user is authenticated (assumes `req.userId` is set by  middleware)
    const userId = req.params.id;

    if (!userId) {
      return next(new ErrorResponse(401, "User not found."));
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

// Get dashboard statistics
// Get all dashboard data in one controller
const getDashboardData2 = async (req, res, next) => {
  try {
    // Calculate Total Revenue and growth (weekly data)
    const currentWeek = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const revenueData = await Order.aggregate([
      { $match: { status: "Delivered" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = revenueData[0]?.total || 0;

    const prevRevenueData = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
          createdAt: { $lt: lastWeek },
        },
      },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const prevRevenue = prevRevenueData[0]?.total;
    const revenueGrowth = (
      ((totalRevenue - prevRevenue) / prevRevenue) *
      100
    ).toFixed(1);

    // Calculate Total Orders and growth (weekly)
    const totalOrders = (await Order.countDocuments()) || 0;
    const prevOrders =
      (await Order.countDocuments({ createdAt: { $lt: lastWeek } })) || 0;
    const ordersGrowth = (
      ((totalOrders - prevOrders) / (prevOrders || 1)) *
      100
    ).toFixed(1);

    // Calculate New Customers (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newCustomers =
      (await User.countDocuments({
        createdAt: { $gte: sevenDaysAgo },
      })) || 0;
    const prevNewCustomers =
      (await User.countDocuments({
        createdAt: {
          $gte: new Date(sevenDaysAgo.getTime() - 7 * 24 * 60 * 60 * 1000),
          $lt: sevenDaysAgo,
        },
      })) || 0;
    const customersGrowth = (
      ((newCustomers - prevNewCustomers) / (prevNewCustomers || 1)) *
      100
    ).toFixed(1);

    // Calculate Conversion Rate
    const totalUsers = (await User.countDocuments()) || 10000;
    const usersWithOrders = (await Order.distinct("user")) || [];
    const conversionRate = (
      (usersWithOrders.length / (totalUsers || 1)) *
      100
    ).toFixed(2);

    // Get Sales Overview (daily data for last 7 days)
    const salesOverview = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
          createdAt: {
            $gte: sevenDaysAgo,
          },
        },
      },
      {
        $group: {
          _id: {
            $dayOfWeek: "$createdAt",
          },
          value: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Format sales data (last 7 days)
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const sales = days.map((name, index) => {
      const dayData = salesOverview.find((item) => item._id === index + 2); // dayOfWeek: 1=Sunday, 2=Monday
      const fallbackValues = [0, 0, 0, 0, 0, 0, 0];
      return {
        name,
        value: Math.round(dayData?.value) || fallbackValues[index],
      };
    });

    // Get Traffic Source data (daily for last 7 days)
    const trafficSourceData = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: sevenDaysAgo,
          },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          organic: {
            $sum: {
              $cond: [
                { $in: ["$referralSource", ["organic", "search"]] },
                1,
                0,
              ],
            },
          },
          paid: {
            $sum: {
              $cond: [{ $in: ["$referralSource", ["paid", "ads"]] }, 1, 0],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Format traffic data (last 7 days)
    const traffic = days.map((name, index) => {
      const dayData = trafficSourceData.find((item) => item._id === index + 2);
      const fallbackData = [
        { organic: 450, paid: 240 },
        { organic: 520, paid: 180 },
        { organic: 480, paid: 320 },
        { organic: 390, paid: 280 },
        { organic: 610, paid: 350 },
        { organic: 540, paid: 290 },
        { organic: 470, paid: 260 },
      ];
      return {
        name,
        organic: dayData?.organic || fallbackData[index].organic,
        paid: dayData?.paid || fallbackData[index].paid,
      };
    });

    // Get User Sources (pie chart data)
    const userSourcesData = await User.aggregate([
      {
        $group: {
          _id: "$referralSource",
          count: { $sum: 1 },
        },
      },
    ]);

    const userSources = [
      { name: "Direct", value: 400 },
      { name: "Social", value: 300 },
      { name: "Email", value: 300 },
      { name: "Organic", value: 200 },
      { name: "Referral", value: 100 },
    ];

    // Get Recent Orders
    const recentOrders = await Order.find()
      .populate("user", "firstName lastName")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const orders =
      recentOrders.length > 0
        ? recentOrders.map((order, index) => ({
            id:
              order.orderNumber || `ORD-${String(index + 1).padStart(3, "0")}`,
            customer: order.user
              ? `${order.user.firstName} ${order.user.lastName}`
              : "Unknown Customer",
            status:
              order.status.charAt(0).toUpperCase() + order.status.slice(1),
            amount: `$${order.totalAmount.toFixed(2)}`,
            date: new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
          }))
        : [
            {
              id: "ORD-001",
              customer: "John Doe",
              status: "Delivered",
              amount: "$352.00",
              date: "May 20, 2025",
            },
            {
              id: "ORD-002",
              customer: "Jane Smith",
              status: "Processing",
              amount: "$120.99",
              date: "May 19, 2025",
            },
            {
              id: "ORD-003",
              customer: "Mike Johnson",
              status: "Pending",
              amount: "$75.50",
              date: "May 19, 2025",
            },
            {
              id: "ORD-004",
              customer: "Sara Wilson",
              status: "Delivered",
              amount: "$214.30",
              date: "May 18, 2025",
            },
            {
              id: "ORD-005",
              customer: "Robert Brown",
              status: "Cancelled",
              amount: "$42.75",
              date: "May 17, 2025",
            },
          ];

    // Get Recent Notifications
    const recentNotifications = await Notification.find({ isAdmin: true })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean();

    const notifications =
      recentNotifications.length > 0
        ? recentNotifications.map((notif) => ({
            title: notif.title,
            description: notif.description,
            time: notif.timeAgo || "Just now",
            isNew: notif.isRead === false,
          }))
        : [
            {
              title: "New Order Received",
              description: "You have received a new order #ORD-7892",
              time: "Just now",
              isNew: true,
            },
            {
              title: "Product Update",
              description: "Inventory running low on SKU-3842",
              time: "1 hour ago",
              isNew: true,
            },
            {
              title: "System Update",
              description: "System update scheduled for tonight 12 AM",
              time: "3 hours ago",
              isNew: false,
            },
            {
              title: "New User Registration",
              description: "5 new users registered today",
              time: "5 hours ago",
              isNew: false,
            },
          ];

    // Compile all dashboard data
    const dashboardData = {
      sales,
      traffic,
      userSources,
      orders,
      stats: [
        {
          title: "Total Revenue",
          value: `$${totalRevenue.toLocaleString()}`,
          change: `${
            parseFloat(revenueGrowth) > 0
              ? `+${revenueGrowth}%`
              : `-${Math.abs(revenueGrowth)}%`
          }`,
          isPositive: parseFloat(revenueGrowth) > 0,
        },
        {
          title: "Total Orders",
          value: totalOrders.toLocaleString(),
          change: `+${ordersGrowth}%`,
          isPositive: parseFloat(ordersGrowth) > 0,
        },
        {
          title: "New Customers",
          value: newCustomers.toString(),
          change: `+${customersGrowth}%`,
          isPositive: parseFloat(customersGrowth) > 0,
        },
        {
          title: "Conversion Rate",
          value: `${conversionRate}%`,
          change: "-0.5%",
          isPositive: false,
        },
      ],
      notifications,
    };

    return sendResponse(
      res,
      200,
      "Dashboard data retrieved successfully",
      dashboardData
    );
  } catch (error) {
    console.error("Error fetching dashboard data:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

const getDashboardData = async (req, res, next) => {
  try {
    // Dates
    const currentWeek = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Helper function for growth calculation
    const calculateGrowth = (current, prev) => {
      if (prev > 0) {
        // Normal case: calculate percentage change
        return (((current - prev) / prev) * 100).toFixed(1);
      } else if (current > 0) {
        return (100).toFixed(1);
      } else {
        return (0).toFixed(1);
      }
    };

    const formatChange = (growth) => {
      const value = parseFloat(growth);
      return value > 0 ? `+${value}%` : `-${Math.abs(value)}%`;
    };

    // -------------------- Revenue --------------------
    const revenueData = await Order.aggregate([
      { $match: { status: "Delivered" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue = revenueData[0]?.total || 0;

    const prevRevenueData = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
          createdAt: { $lt: lastWeek },
        },
      },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const prevRevenue = prevRevenueData[0]?.total || 0;

    const revenueGrowth = calculateGrowth(totalRevenue, prevRevenue);

    // -------------------- Orders (last 7 days) --------------------
    const totalOrders =
      (await Order.countDocuments({ createdAt: { $gte: sevenDaysAgo } })) || 0;

    const prevOrders =
      (await Order.countDocuments({
        createdAt: {
          $gte: new Date(sevenDaysAgo.getTime() - 7 * 24 * 60 * 60 * 1000),
          $lt: sevenDaysAgo,
        },
      })) || 0;

    const ordersGrowth = calculateGrowth(totalOrders, prevOrders);

    // -------------------- Customers --------------------
    const newCustomers =
      (await User.countDocuments({ createdAt: { $gte: sevenDaysAgo } })) || 0;
    const prevNewCustomers =
      (await User.countDocuments({
        createdAt: {
          $gte: new Date(sevenDaysAgo.getTime() - 7 * 24 * 60 * 60 * 1000),
          $lt: sevenDaysAgo,
        },
      })) || 0;

    const customersGrowth = calculateGrowth(newCustomers, prevNewCustomers);

    // -------------------- Conversion Rate --------------------
    const totalUsers = (await User.countDocuments()) || 10000;
    const usersWithOrders = (await Order.distinct("user")) || [];
    const conversionRate = (
      (usersWithOrders.length / (totalUsers || 1)) *
      100
    ).toFixed(2);

    // -------------------- Sales Overview --------------------
    const salesOverview = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
          createdAt: {
            $gte: sevenDaysAgo,
          },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          value: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const sales = days.map((name, index) => {
      const dayData = salesOverview.find((item) => item._id === index + 2);
      return {
        name,
        value: Math.round(dayData?.value) || 0,
      };
    });

    // -------------------- Traffic Source --------------------
    const trafficSourceData = await User.aggregate([
      {
        $match: { createdAt: { $gte: sevenDaysAgo } },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          organic: {
            $sum: {
              $cond: [
                { $in: ["$referralSource", ["organic", "search"]] },
                1,
                0,
              ],
            },
          },
          paid: {
            $sum: {
              $cond: [{ $in: ["$referralSource", ["paid", "ads"]] }, 1, 0],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const traffic = days.map((name, index) => {
      const dayData = trafficSourceData.find((item) => item._id === index + 2);
      return {
        name,
        organic: dayData?.organic || 0,
        paid: dayData?.paid || 0,
      };
    });

    // -------------------- User Sources --------------------
    const userSources = [
      { name: "Direct", value: 400 },
      { name: "Social", value: 300 },
      { name: "Email", value: 300 },
      { name: "Organic", value: 200 },
      { name: "Referral", value: 100 },
    ];

    // -------------------- Recent Orders --------------------
    const recentOrders = await Order.find()
      .populate("user", "firstName lastName")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const orders =
      recentOrders.length > 0
        ? recentOrders.map((order, index) => ({
            id:
              order.orderNumber || `ORD-${String(index + 1).padStart(3, "0")}`,
            customer: order.user
              ? `${order.user.firstName} ${order.user.lastName}`
              : "Unknown Customer",
            status:
              order.status.charAt(0).toUpperCase() + order.status.slice(1),
            amount: `$${order.totalAmount.toFixed(2)}`,
            date: new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
          }))
        : [];

    // -------------------- Notifications --------------------
    const recentNotifications = await Notification.find({ isAdmin: true })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean();

    const notifications =
      recentNotifications.length > 0
        ? recentNotifications.map((notif) => ({
            title: notif.title,
            description: notif.description,
            time: notif.timeAgo || "Just now",
            isNew: notif.isRead === false,
          }))
        : [
            {
              id: "ORD-001",
              customer: "John Doe",
              status: "Delivered",
              amount: "$352.00",
              date: "May 20, 2025",
            },
            {
              id: "ORD-002",
              customer: "Jane Smith",
              status: "Processing",
              amount: "$120.99",
              date: "May 19, 2025",
            },
            {
              id: "ORD-003",
              customer: "Mike Johnson",
              status: "Pending",
              amount: "$75.50",
              date: "May 19, 2025",
            },
            {
              id: "ORD-004",
              customer: "Sara Wilson",
              status: "Delivered",
              amount: "$214.30",
              date: "May 18, 2025",
            },
            {
              id: "ORD-005",
              customer: "Robert Brown",
              status: "Cancelled",
              amount: "$42.75",
              date: "May 17, 2025",
            },
          ];

    // -------------------- Final Dashboard Data --------------------
    const dashboardData = {
      sales,
      traffic,
      userSources,
      orders,
      stats: [
        {
          title: "Total Revenue",
          value: `$${totalRevenue.toLocaleString()}`,
          change: formatChange(revenueGrowth),
          isPositive: parseFloat(revenueGrowth) > 0,
        },
        {
          title: "Total Orders",
          value: totalOrders.toLocaleString(),
          change: formatChange(ordersGrowth),
          isPositive: parseFloat(ordersGrowth) > 0,
        },
        {
          title: "New Customers",
          value: newCustomers.toString(),
          change: formatChange(customersGrowth),
          isPositive: parseFloat(customersGrowth) > 0,
        },
        {
          title: "Conversion Rate",
          value: `${conversionRate}%`,
          change: "-0.5%",
          isPositive: false,
        },
      ],
      notifications,
    };

    return sendResponse(
      res,
      200,
      "Dashboard data retrieved successfully",
      dashboardData
    );
  } catch (error) {
    console.error("Error fetching dashboard data:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

module.exports = {
  getAlluser,
  deleteuser,
  updateUserbyadmin,
  getDashboardData,
};
