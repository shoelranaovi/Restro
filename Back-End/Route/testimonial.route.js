const express = require('express');
const router = express.Router();
const {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  getAllTestimonialsAdmin,
  approveTestimonial,
  rejectTestimonial,
  deleteTestimonial,
  getTestimonialStats
} = require('../controllers/testimonialController');

// Import middlewares
const { protect, admin } = require('../middleware/authMiddleware');
const { validateTestimonial } = require('../middleware/validationMiddleware');
const rateLimitMiddleware = require('../middleware/rateLimitMiddleware');

// Public routes
router.route('/')
  .get(getTestimonials)
  .post(rateLimitMiddleware, validateTestimonial, createTestimonial);

router.get('/:id', getTestimonialById);

// Admin routes
router.get('/admin/all', protect, admin, getAllTestimonialsAdmin);
router.get('/admin/stats', protect, admin, getTestimonialStats);
router.put('/:id/approve', protect, admin, approveTestimonial);
router.put('/:id/reject', protect, admin, rejectTestimonial);
router.delete('/:id', protect, admin, deleteTestimonial);

module.exports = router;