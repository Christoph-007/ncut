const Product = require('../models/Product')

async function search(req, res, next) {
  try {
    const { q } = req.query
    if (!q?.trim()) return res.json([])

    const results = await Product.find(
      { $text: { $search: q }, isAvailable: true },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(40)

    res.json(results)
  } catch (err) {
    next(err)
  }
}

module.exports = { search }
