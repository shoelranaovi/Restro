const express = require('express');
const router = express.Router();

const verifyUser = require('../middleware/verifyuser');
const { createOrder, getAllOrders, updateOrderStatus } = require('../controller/order.controller');
const RoleCheck = require('../middleware/isAdmin');

router.use(verifyUser)



// Customer routes
router.post('/create', createOrder);
// router.get('/my-orders', authenticateUser, getUserOrders);
// router.get('/:orderId', authenticateUser, getOrderById);
// router.put('/:orderId/cancel', authenticateUser, cancelOrder);
// router.post('/:orderId/review', authenticateUser, addOrderReview);

// Admin/Manager routes
router.get('/',RoleCheck("Admin"), getAllOrders);
router.put('/status/:orderId', updateOrderStatus);
// router.put('/:orderId/assign', authenticateUser, authorizeRoles('Admin', 'Manager'), assignOrder);
// router.get('/statistics/overview', authenticateUser, authorizeRoles('Admin', 'Manager'), getOrderStatistics);

module.exports = router;