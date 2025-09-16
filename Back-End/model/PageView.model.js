/ models/PageView.js
const mongoose = require('mongoose');

const pageViewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  visitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visitor'
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session'
  },
  page: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  fullUrl: { type: String },
  queryParams: { type: Map, of: String },
  referrer: {
    type: String,
    default: 'direct'
  },
  loadTime: {
    type: Number, // in seconds
    min: 0
  },
  timeOnPage: {
    type: Number, // in seconds
    min: 0
  },
  scrollDepth: {
    type: Number, // percentage (0-100)
    min: 0,
    max: 100
  },
  exitPage: {
    type: Boolean,
    default: false
  },
  bounced: {
    type: Boolean,
    default: false
  },
  ipAddress: { type: String },
  userAgent: { type: String },
  device: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet']
  },
  browser: { type: String },
  screenResolution: {
    width: { type: Number },
    height: { type: Number }
  },
  viewportSize: {
    width: { type: Number },
    height: { type: Number }
  },
  interactions: {
    clicks: { type: Number, default: 0 },
    formSubmissions: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 }
  },
  performance: {
    domContentLoaded: { type: Number }, // in milliseconds
    firstContentfulPaint: { type: Number },
    largestContentfulPaint: { type: Number },
    cumulativeLayoutShift: { type: Number }
  }
}, {
  timestamps: true,
  collection: 'pageviews'
});

// Indexes for efficient querying
pageViewSchema.index({ user: 1, createdAt: -1 });
pageViewSchema.index({ page: 1, createdAt: -1 });
pageViewSchema.index({ visitor: 1, createdAt: -1 });
pageViewSchema.index({ session: 1, createdAt: -1 });
pageViewSchema.index({ referrer: 1 });
pageViewSchema.index({ loadTime: 1 });

const PageView = mongoose.model('PageView', pageViewSchema);
module.exports = PageView