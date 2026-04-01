const mongoose = require('mongoose')

const collectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    handle: { type: String, required: true, unique: true },
    description: String,
    image: String,
    productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Collection', collectionSchema)
