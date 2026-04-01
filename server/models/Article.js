const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    content: String,
    contentHtml: String,
    excerpt: String,
    image: String,
    tags: [String],
    publishedAt: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Article', articleSchema)
