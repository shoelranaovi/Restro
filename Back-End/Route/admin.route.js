
// routes/cart.js
const express = require('express');
const verifyUser = require('../middleware/verifyuser');
const {  getDashboardData } = require('../controller/admin.controller');
const router = express.Router();




// All cart routes require authentication
// router.use(verifyUser);

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard/stats
// @access  Private (Admin only)
router.get('/stats', getDashboardData);

// @desc    Get sales overview data
// @route   GET /api/admin/dashboard/sales-overview
// @access  Private (Admin only)
// router.get('/sales-overview', getSalesOverview);

// @desc    Get traffic source data
// @route   GET /api/admin/dashboard/traffic-source
// @access  Private (Admin only)
// router.get('/traffic-source', getTrafficSource);

// @desc    Generate dashboard report
// @route   GET /api/admin/dashboard/report
// @access  Private (Admin only)
// router.get('/report', generateDashboardReport);





module.exports = router;