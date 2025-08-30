const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Notification title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Notification description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  type: {
    type: String,
    enum: ['order', 'product', 'system', 'user', 'payment', 'inventory', 'security'],
    default: 'system'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional for admin notifications
  },
  relatedEntity: {
    entityType: {
      type: String,
      enum: ['order', 'product', 'user', 'payment'],
      required: false
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false
    }
  },
  actionUrl: {
    type: String,
    required: false,
    trim: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  expiresAt: {
    type: Date,
    required: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for time ago calculation
notificationSchema.virtual('timeAgo').get(function() {
  const now = new Date();
  const diffMs = now - this.createdAt;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  return this.createdAt.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
});

// Virtual for checking if notification is new (less than 1 hour old)
notificationSchema.virtual('isNew').get(function() {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  return this.createdAt > oneHourAgo && !this.isRead;
});

// Index for efficient queries
notificationSchema.index({ isAdmin: 1, createdAt: -1 });
notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ type: 1, createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Auto-delete expired notifications

// Static method to create admin notification
notificationSchema.statics.createAdminNotification = async function(data) {
  return await this.create({
    ...data,
    isAdmin: true
  });
};

// Static method to create user notification
notificationSchema.statics.createUserNotification = async function(userId, data) {
  return await this.create({
    ...data,
    user: userId,
    isAdmin: false
  });
};

// Instance method to mark as read
notificationSchema.methods.markAsRead = async function() {
  this.isRead = true;
  return await this.save();
};

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;