// models/Visitor.js
const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  device: {
    type: {
      type: String,
      enum: ['desktop', 'mobile', 'tablet'],
      default: 'desktop'
    },
    browser: { type: String },
    os: { type: String },
    isMobile: { type: Boolean, default: false }
  },
  location: {
    country: { type: String },
    city: { type: String },
    region: { type: String },
    timezone: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  firstVisit: {
    type: Date,
    required: true,
    default: Date.now
  },
  lastSeen: {
    type: Date,
    required: true,
    default: Date.now
  },
  visitCount: {
    type: Number,
    default: 1
  },
  isReturning: {
    type: Boolean,
    default: false
  },
  sessionIds: [{
    type: String
  }],
  referrer: {
    type: String,
    default: 'direct'
  },
  lastReferrer: {
    type: String
  },
  utmSource: { type: String },
  utmMedium: { type: String },
  utmCampaign: { type: String },
  isBot: {
    type: Boolean,
    default: false
  },
  fingerprint: { type: String } // Browser fingerprint for better tracking
}, {
  timestamps: true,
  collection: 'visitors'
});

// Indexes for efficient querying
visitorSchema.index({ user: 1, ipAddress: 1 });
visitorSchema.index({ user: 1, lastSeen: -1 });
visitorSchema.index({ lastSeen: -1 });
visitorSchema.index({ firstVisit: -1 });
visitorSchema.index({ isReturning: 1 });

// Pre-save middleware to determine if visitor is returning
visitorSchema.pre('save', function(next) {
  if (this.visitCount > 1) {
    this.isReturning = true;
  }
  next();
});

const Visitor = mongoose.model('Visitor', visitorSchema);
module.exports = Visitor