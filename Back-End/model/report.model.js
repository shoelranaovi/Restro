// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['sales', 'inventory', 'staff', 'customer', 'financial'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  dateRange: {
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date,
      required: true
    }
  },
  filters: {
    category: String,
    staff: mongoose.Schema.Types.ObjectId,
    location: String,
    status: String
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  summary: {
    totalRevenue: Number,
    totalOrders: Number,
    averageOrderValue: Number,
    topSellingItems: [{
      item: String,
      quantity: Number,
      revenue: Number
    }],
    metrics: mongoose.Schema.Types.Mixed
  },
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['generating', 'completed', 'failed'],
    default: 'generating'
  },
  exportFormat: {
    type: String,
    enum: ['json', 'csv', 'pdf'],
    default: 'json'
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
reportSchema.index({ type: 1, createdAt: -1 });
reportSchema.index({ generatedBy: 1, createdAt: -1 });
reportSchema.index({ 'dateRange.from': 1, 'dateRange.to': 1 });

module.exports = mongoose.model('Report', reportSchema);