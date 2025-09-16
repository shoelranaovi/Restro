
// models/Analytics.js
const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  visitors: {
    total: { type: Number, default: 0 },
    unique: { type: Number, default: 0 },
    returning: { type: Number, default: 0 }
  },
  pageViews: {
    total: { type: Number, default: 0 },
    unique: { type: Number, default: 0 }
  },
  sessions: {
    total: { type: Number, default: 0 },
    averageDuration: { type: Number, default: 0 }, // in seconds
    bounceRate: { type: Number, default: 0 } // percentage
  },
  performance: {
    averageLoadTime: { type: Number, default: 0 }, // in seconds
    slowestPage: { type: String },
    fastestPage: { type: String }
  },
  topPages: [{
    page: { type: String },
    views: { type: Number }
  }],
  topReferrers: [{
    referrer: { type: String },
    visits: { type: Number }
  }],
  deviceBreakdown: {
    desktop: { type: Number, default: 0 },
    mobile: { type: Number, default: 0 },
    tablet: { type: Number, default: 0 }
  },
  browserBreakdown: [{
    browser: { type: String },
    count: { type: Number }
  }],
  locationBreakdown: [{
    country: { type: String },
    city: { type: String },
    count: { type: Number }
  }]
}, {
  timestamps: true,
  collection: 'analytics'
});

// Create index for efficient querying
analyticsSchema.index({ user: 1, date: -1 });
analyticsSchema.index({ date: -1 });

const Analytics  = mongoose.model('Analytics', analyticsSchema);
module.exports = Analytics