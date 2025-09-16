// models/Session.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  visitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visitor',
    required: true
  },
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  startTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  duration: {
    type: Number, // in milliseconds
    min: 0
  },
  pageViews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PageView'
  }],
  totalPageViews: {
    type: Number,
    default: 0
  },
  entryPage: {
    type: String,
    required: true
  },
  exitPage: {
    type: String
  },
  referrer: {
    type: String,
    default: 'direct'
  },
  utmSource: { type: String },
  utmMedium: { type: String },
  utmCampaign: { type: String },
  utmTerm: { type: String },
  utmContent: { type: String },
  isBounce: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  ipAddress: { type: String },
  userAgent: { type: String },
  device: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet']
  },
  browser: { type: String },
  os: { type: String },
  location: {
    country: { type: String },
    city: { type: String },
    region: { type: String }
  },
  events: [{
    type: {
      type: String,
      enum: ['click', 'scroll', 'form_submit', 'download', 'video_play', 'custom']
    },
    element: { type: String },
    value: { type: String },
    timestamp: { type: Date, default: Date.now }
  }],
  conversionEvents: [{
    event: { type: String },
    value: { type: Number },
    timestamp: { type: Date, default: Date.now }
  }],
  averageTimeOnPage: {
    type: Number, // in seconds
    default: 0
  },
  maxScrollDepth: {
    type: Number, // percentage (0-100)
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true,
  collection: 'sessions'
});

// Virtual for session duration in readable format
sessionSchema.virtual('durationFormatted').get(function() {
  if (!this.duration) return '0:00';
  const minutes = Math.floor(this.duration / 60000);
  const seconds = Math.floor((this.duration % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Pre-save middleware to calculate duration
sessionSchema.pre('save', function(next) {
  if (this.endTime && this.startTime) {
    this.duration = this.endTime - this.startTime;
    
    // Determine if it's a bounce (single page view, less than 30 seconds)
    if (this.totalPageViews <= 1 && this.duration < 30000) {
      this.isBounce = true;
    }
  }
  next();
});

// Indexes for efficient querying
sessionSchema.index({ user: 1, startTime: -1 });
sessionSchema.index({ visitor: 1, startTime: -1 });
sessionSchema.index({ sessionId: 1 }, { unique: true });
sessionSchema.index({ startTime: -1 });
sessionSchema.index({ isActive: 1 });
sessionSchema.index({ isBounce: 1 });

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session