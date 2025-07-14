// routes/products.js
const express = require("express")
const { createProduct,getAllProduct, deleteProduct,updateProductbyadmin, popularDish, getCategoryRepresentativeDishes } = require('../controller/product.contoller');
const { productValidation } = require('../utils/validator/productValidator');
const verifyUser = require("../middleware/verifyuser");
const RoleCheck = require("../middleware/isAdmin");
const upload = require("../middleware/multer");
const router = express.Router();


// Validation middleware


// Routes
// router.get('/', productController.getProducts);
// router.get('/featured', productController.getFeaturedProducts);
// router.get('/category/:category', productController.getProductsByCategory);
// router.get('/:id', productController.getProduct);
router.post('/create',verifyUser, RoleCheck("Admin"), upload.fields([
    { name: "Images", maxCount: 5 },
  ]), productValidation, createProduct);
  router.post("/update/:id", updateProductbyadmin);
  router.get("/getAllProduct", verifyUser, RoleCheck("Admin"),getAllProduct );
  router.get("/getPopularProduct",popularDish );
  router.get("/getCategoryProduct",getCategoryRepresentativeDishes );
  router.delete("/delete/:id", verifyUser, RoleCheck("Admin"), deleteProduct);
  // router.post('/create', upload.fields([
  //   { name: "Images", maxCount: 5 },
  // ]), productValidation, createProduct);

// router.put('/:id', productValidation, productController.updateProduct);
// router.delete('/:id', productController.deleteProduct);
// router.patch('/:id/toggle-availability', productController.toggleAvailability);
// router.patch('/:id/rating', productController.updateRating);

module.exports = router;