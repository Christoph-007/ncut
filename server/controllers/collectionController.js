const Collection = require('../models/Collection')
const Product = require('../models/Product')

async function getAll(req, res, next) {
  try {
    const collections = await Collection.find()
    res.json(collections)
  } catch (err) {
    next(err)
  }
}

async function getOne(req, res, next) {
  try {
    const { page = 1, sort } = req.query
    const limit = 20
    const skip = (Number(page) - 1) * limit

    // Support lookup by handle or id
    const query = req.params.id === 'all'
      ? {}
      : { $or: [{ handle: req.params.id }, { _id: req.params.id.match(/^[a-f\d]{24}$/i) ? req.params.id : null }] }

    const collection = req.params.id === 'all' ? null : await Collection.findOne(query)

    const productFilter = collection
      ? { _id: { $in: collection.productIds }, isAvailable: true }
      : { isAvailable: true }

    let sortOption = {}
    if (sort === 'price-asc') sortOption = { 'variants.0.price': 1 }
    else if (sort === 'price-desc') sortOption = { 'variants.0.price': -1 }
    else if (sort === 'title-asc') sortOption = { title: 1 }
    else if (sort === 'newest') sortOption = { createdAt: -1 }

    const [products, total] = await Promise.all([
      Product.find(productFilter).sort(sortOption).skip(skip).limit(limit),
      Product.countDocuments(productFilter),
    ])

    res.json({ collection, products, total, page: Number(page) })
  } catch (err) {
    next(err)
  }
}

async function create(req, res, next) {
  try {
    const collection = await Collection.create(req.body)
    res.status(201).json(collection)
  } catch (err) {
    next(err)
  }
}

async function update(req, res, next) {
  try {
    const collection = await Collection.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!collection) return res.status(404).json({ message: 'Collection not found.' })
    res.json(collection)
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, getOne, create, update }
