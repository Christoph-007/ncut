21`const mongoose = require('mongoose')

const variantSchema = new mongoose.Schema({
  title: { type: String, default: 'Default' },
  price: { type: Number, required: true },
  compare_at_price: { type: Number, default: null },
  sku: String,
  inventory: { type: Number, default: 0 },
  options: { type: Map, of: String },
})

const productSchema = new mongoose.Schema(
  {
    handle: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    description: String,
    descriptionHtml: String,
    options: [
      {
        name: String,
        values: [String]
      }
    ],
    price: { type: Number },
    compareAtPrice: { type: Number },
    images: [String],
    variants: [variantSchema],
    tags: [String],
    collectionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],
    isAvailable: { type: Boolean, default: true },
    vendor: String,
    productType: String,
  },
  { timestamps: true }
)

productSchema.index({ title: 'text', description: 'text', tags: 'text' })

module.exports = mongoose.model('Product', productSchema)
