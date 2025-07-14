
// routes/cart.js
const express = require('express');
const verifyUser = require('../middleware/verifyuser');
const { addToCart, updateCartQuantity, getCart, removeFromCart } = require('../controller/cart.controller');
const router = express.Router();


// All cart routes require authentication
router.use(verifyUser);

router.get('/', getCart);
// router.get('/count', getCartCount);
router.post('/add', addToCart);
router.put('/update/:productId', updateCartQuantity);
router.delete('/remove/:productId', removeFromCart);
// router.delete('/clear', clearCart);





module.exports = router;