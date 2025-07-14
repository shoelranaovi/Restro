const Testimonial = require('../models/Testimonial');
const asyncHandler = require('express-async-handler');

// @desc    Create new testimonial
// @route   POST /api/testimonials
// @access  Public
const createTestimonial = asyncHandler(async (req, res) => {
  const { name, email, rating, message } = req.body;

  // Check if testimonial already exists from this email
  const existingTestimonial = await Testimonial.findOne({ 
    email, 
    isActive: true 
  });

  if (existingTestimonial) {
    return res.status(400).json({
      success: false,
      message: 'You have already submitted a testimonial'
    });
  }

  const testimonial = await Testimonial.create({
    name,
    email,
    rating,
    message
  });

  res.status(201).json({
    success: true,
    message: 'Testimonial submitted successfully! It will be reviewed before publishing.',
    data: testimonial.toPublicJSON()
  });
});

// @desc    Get all approved testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {
    isApproved: true,
    isActive: true
  };

  const testimonials = await Testimonial.find(filter)
    .select('name rating message createdAt')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Testimonial.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: testimonials.length,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    data: testimonials
  });
});

// @desc    Get testimonial by ID
// @route   GET /api/testimonials/:id
// @access  Public
const getTestimonialById = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findOne({
    _id: req.params.id,
    isApproved: true,
    isActive: true
  }).select('name rating message createdAt');

  if (!testimonial) {
    return res.status(404).json({
      success: false,
      message: 'Testimonial not found'
    });
  }

  res.status(200).json({
    success: true,
    data: testimonial
  });
});

// @desc    Get all testimonials (Admin only)
// @route   GET /api/testimonials/admin/all
// @access  Private/Admin
const getAllTestimonialsAdmin = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = req.query.approved ? 
    { isApproved: req.query.approved === 'true' } : 
    {};

  const testimonials = await Testimonial.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Testimonial.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: testimonials.length,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    data: testimonials
  });
});

// @desc    Approve testimonial
// @route   PUT /api/testimonials/:id/approve
// @access  Private/Admin
const approveTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return res.status(404).json({
      success: false,
      message: 'Testimonial not found'
    });
  }

  testimonial.isApproved = true;
  await testimonial.save();

  res.status(200).json({
    success: true,
    message: 'Testimonial approved successfully',
    data: testimonial
  });
});

// @desc    Reject/Unapprove testimonial
// @route   PUT /api/testimonials/:id/reject
// @access  Private/Admin
const rejectTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return res.status(404).json({
      success: false,
      message: 'Testimonial not found'
    });
  }

  testimonial.isApproved = false;
  await testimonial.save();

  res.status(200).json({
    success: true,
    message: 'Testimonial rejected successfully',
    data: testimonial
  });
});

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return res.status(404).json({
      success: false,
      message: 'Testimonial not found'
    });
  }

  // Soft delete
  testimonial.isActive = false;
  await testimonial.save();

  res.status(200).json({
    success: true,
    message: 'Testimonial deleted successfully'
  });
});

// @desc    Get testimonial statistics
// @route   GET /api/testimonials/stats
// @access  Private/Admin
const getTestimonialStats = asyncHandler(async (req, res) => {
  const stats = await Testimonial.aggregate([
    {
      $match: { isActive: true }
    },
    {
      $group: {
        _id: null,
        totalTestimonials: { $sum: 1 },
        approvedTestimonials: {
          $sum: { $cond: ['$isApproved', 1, 0] }
        },
        pendingTestimonials: {
          $sum: { $cond: ['$isApproved', 0, 1] }
        },
        averageRating: { $avg: '$rating' },
        ratingDistribution: {
          $push: '$rating'
        }
      }
    }
  ]);

  const ratingCounts = await Testimonial.aggregate([
    { $match: { isActive: true, isApproved: true } },
    { $group: { _id: '$rating', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);

  res.status(200).json({
    success: true,
    data: {
      ...stats[0],
      ratingCounts
    }
  });
});

module.exports = {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  getAllTestimonialsAdmin,
  approveTestimonial,
  rejectTestimonial,
  deleteTestimonial,
  getTestimonialStats
};