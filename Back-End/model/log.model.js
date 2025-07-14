const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: ['create', 'update', 'delete', 'view', 'login', 'error']
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  status: {
    type: String,
    enum: ['info', 'warning', 'error'],
    default: 'info'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log