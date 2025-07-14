const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  specialInstructions: {
    type: String,
    trim: true
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
    unique: true,

  },
  items: [orderItemSchema],
  
  // Order Status
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  
  // Delivery Information
  deliveryAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: function() {
      return this.orderType === 'delivery';
    }
  },
  orderType: {
    type: String,
    enum: ['delivery', 'pickup'],
    required: true,
    default: 'delivery'
  },
  
  // Payment Information
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'online', 'wallet'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  
  // Pricing
  subtotal: {
    type: Number,
    required: true
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true
  },
  
  // Order Details
  specialInstructions: {
    type: String,
    trim: true
  },
  estimatedDeliveryTime: {
    type: Date
  },
  actualDeliveryTime: {
    type: Date
  },
  
  // Restaurant Assignment
  assignedTo: {
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    deliveryPerson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  
  // Tracking
  orderHistory: [{
    status: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    note: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  
  // Customer Feedback
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    trim: true
  },
  
  // Cancellation
  cancellationReason: {
    type: String,
    trim: true
  },
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate unique order number
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${(count + 1).toString().padStart(4, '0')}`;
    
    // Add initial status to order history
    this.orderHistory.push({
      status: this.status,
      timestamp: new Date(),
      note: 'Order created'
    });
  }
  next();
});

// Update order history when status changes
orderSchema.pre('save', function(next) {
  if (this.isModified('status') && !this.isNew) {
    this.orderHistory.push({
      status: this.status,
      timestamp: new Date(),
      note: `Order status changed to ${this.status}`
    });
  }
  next();
});

// Virtual for order age
orderSchema.virtual('orderAge').get(function() {
  return Date.now() - this.createdAt;
});

// Virtual for delivery status
orderSchema.virtual('isDelivered').get(function() {
  return this.status === 'Delivered';
});

// Indexes for better performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ 'assignedTo.chef': 1 });
orderSchema.index({ 'assignedTo.deliveryPerson': 1 });



const Order  = mongoose.model('Order', orderSchema);
module.exports = Order