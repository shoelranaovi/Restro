const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Soups & Salads', 'Entrees', 'Pasta & Risottos', 'Seafood Specialties', 'Desserts', 'Kids',"special"],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },

  originalPrice: {
    type: Number,
    default: null,
    min: [0, 'Original price cannot be negative']
  },
  discount: {
    percentage: {
      type: Number,
      min: [0, 'Discount percentage cannot be negative'],
      max: [100, 'Discount percentage cannot exceed 100%'],
      default: 0
    },
    isActive: {
      type: Boolean,
      default: false
    },
    startDate: {
      type: Date,
      default: null
    },
    endDate: {
      type: Date,
      default: null
    }
  },
  cost: {
    type: Number,
    required: [true, 'Cost is required'],
    min: [0, 'Cost cannot be negative']
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Out of Stock'],
    default: 'Active'
  },
  images: [
    {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
],
user: {
  type: mongoose.Schema.ObjectId,
  ref: "User",
  required: true
},
  rating: {
    type: Number,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  totalSales: {
    type: Number,
    default: 0,
    min: [0, 'Total sales cannot be negative']
  },
  profitMargin: {
    type: Number,
    min: [0, 'Profit margin cannot be negative'],
    max: [100, 'Profit margin cannot exceed 100%']
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for profit margin calculation
productSchema.virtual('calculatedProfitMargin').get(function() {
  if (this.price && this.cost) {
    return ((this.price - this.cost) / this.price * 100).toFixed(2);
  }
  return 0;
});

// Pre-save middleware to calculate profit margin
productSchema.pre('save', function(next) {
  if (this.price && this.cost) {
    this.profitMargin = ((this.price - this.cost) / this.price * 100);
  }
  
  // Auto-update status based on stock
  if (this.stock === 0) {
    this.status = 'Out of Stock';
  } else if (this.status === 'Out of Stock' && this.stock > 0) {
    this.status = 'Active';
  }
  
  next();
});


productSchema.virtual('effectivePrice').get(function() {
  if (this.discount && this.discount.isActive && this.discount.percentage > 0) {
    const now = new Date();
    const discountValid = (!this.discount.startDate || now >= this.discount.startDate) &&
                         (!this.discount.endDate || now <= this.discount.endDate);
    
    if (discountValid) {
      return Number((this.price * (1 - this.discount.percentage / 100)).toFixed(2));
    }
  }
  return this.price;
});

// Virtual for discount amount
productSchema.virtual('discountAmount').get(function() {
  if (this.discount && this.discount.isActive && this.discount.percentage > 0) {
    return Number((this.price * (this.discount.percentage / 100)).toFixed(2));
  }
  return 0;
});



// Index for better query performance
productSchema.index({ name: 1, category: 1 });
productSchema.index({ status: 1 });
productSchema.index({ isDeleted: 1 });

const Product = mongoose.model('Product', productSchema);
module.exports = Product