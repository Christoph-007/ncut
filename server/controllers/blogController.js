const Article = require('../models/Article')

async function getAll(req, res, next) {
  try {
    const articles = await Article.find({ isPublished: true }).sort({ publishedAt: -1 })
    res.json(articles)
  } catch (err) {
    next(err)
  }
}

async function getOne(req, res, next) {
  try {
    const article = await Article.findOne({ slug: req.params.slug, isPublished: true })
    if (!article) return res.status(404).json({ message: 'Article not found.' })
    res.json(article)
  } catch (err) {
    next(err)
  }
}

async function create(req, res, next) {
  try {
    const article = await Article.create(req.body)
    res.status(201).json(article)
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, getOne, create }
