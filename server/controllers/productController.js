const Product = require('../models/Product')

async function getAll(req, res, next) {
  try {
    const { limit = 20, page = 1, sort } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    let sortOption = {}
    if (sort === 'price-asc') sortOption = { 'variants.0.price': 1 }
    else if (sort === 'price-desc') sortOption = { 'variants.0.price': -1 }
    else if (sort === 'title-asc') sortOption = { title: 1 }
    else if (sort === 'newest') sortOption = { createdAt: -1 }

    const [products, total] = await Promise.all([
      Product.find({ isAvailable: true }).sort(sortOption).skip(skip).limit(Number(limit)),
      Product.countDocuments({ isAvailable: true }),
    ])
    res.json({ products, total, page: Number(page) })
  } catch (err) {
    next(err)
  }
}

async function getOne(req, res, next) {
  try {
    const isObjectId = req.params.id.match(/^[a-f\d]{24}$/i)
    const product = isObjectId 
      ? await Product.findById(req.params.id)
      : await Product.findOne({ handle: req.params.id })

    if (!product) return res.status(404).json({ message: 'Product not found.' })
    res.json(product)
  } catch (err) {
    next(err)
  }
}

async function create(req, res, next) {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    next(err)
  }
}

async function update(req, res, next) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!product) return res.status(404).json({ message: 'Product not found.' })
    res.json(product)
  } catch (err) {
    next(err)
  }
}

async function remove(req, res, next) {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, getOne, create, update, remove }
