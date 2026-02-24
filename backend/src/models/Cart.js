const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1'],
          default: 1
        },
        price: {
          type: Number,
          required: true
        },
        addedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    totalItems: {
      type: Number,
      default: 0
    },
    totalPrice: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Calculate totals before saving
cartSchema.pre('save', function (next) {
  this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.totalPrice = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  next();
});

// Remove duplicate products (keep the latest)
cartSchema.pre('save', function (next) {
  const uniqueItems = [];
  const productIds = new Set();

  // Iterate in reverse to keep the latest entry
  for (let i = this.items.length - 1; i >= 0; i--) {
    const productId = this.items[i].product.toString();
    if (!productIds.has(productId)) {
      uniqueItems.unshift(this.items[i]);
      productIds.add(productId);
    }
  }

  this.items = uniqueItems;
  next();
});

module.exports = mongoose.model('Cart', cartSchema);
