const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
testimonialSchema.index({ isApproved: 1, isActive: 1, createdAt: -1 });

// Pre-save middleware to update updatedAt
testimonialSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for formatted date
testimonialSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString();
});

// Method to get public testimonial data
testimonialSchema.methods.toPublicJSON = function() {
  return {
    _id: this._id,
    name: this.name,
    rating: this.rating,
    message: this.message,
    createdAt: this.createdAt,
    formattedDate: this.formattedDate
  };
};

module.exports = mongoose.model('Testimonial', testimonialSchema);