const mongoose = require('mongoose')

const lineItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  variantId: mongoose.Schema.Types.ObjectId,
  title: String,
  variantTitle: String,
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
})

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    lineItems: [lineItemSchema],
    shippingAddress: {
      firstName: String,
      lastName: String,
      address1: String,
      address2: String,
      city: String,
      province: String,
      zip: String,
      country: String,
      phone: String,
    },
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded'],
      default: 'unpaid',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
