const express = require('express');
const { createAddress, updateAddress, deleteAddress,getAddresses } = require('../controller/address.controller');
const verifyUser = require('../middleware/verifyuser');
const router = express.Router();
router.use(verifyUser)


// Middleware (assuming you have auth middleware)
// const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all routes
// router.use(authMiddleware);

// GET /api/addresses - Get all addresses for user
router.get('/', getAddresses);

// GET /api/addresses/default - Get default address
// router.get('/default', getDefaultAddress);

// GET /api/addresses/:addressId - Get single address by ID
// router.get('/:addressId', getAddressById);

// POST /api/addresses - Create new address
router.post('/',  createAddress);

// PUT /api/addresses/:addressId - Update address
router.put('/:addressId', updateAddress);

// DELETE /api/addresses/:addressId - Delete address
router.delete('/:addressId', deleteAddress);

// PATCH /api/addresses/:addressId/default - Set as default address
// router.patch('/default/:addressId/', setDefaultAddress);

module.exports = router;