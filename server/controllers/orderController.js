const Order = require('../models/Order')
const User = require('../models/User')

async function create(req, res, next) {
  try {
    const { lineItems, shippingAddress } = req.body
    if (!lineItems?.length) {
      return res.status(400).json({ message: 'Order must have at least one item.' })
    }
    const subtotal = lineItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const order = await Order.create({
      user: req.user?.id,
      lineItems,
      shippingAddress,
      subtotal,
      totalPrice: subtotal,
    })
    if (req.user?.id) {
      await User.findByIdAndUpdate(req.user.id, { $push: { orderHistory: order._id } })
    }
    res.status(201).json(order)
  } catch (err) {
    next(err)
  }
}

async function getMyOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    next(err)
  }
}

async function getOne(req, res, next) {
  try {
    const order = await Order.findById(req.params.id).populate('lineItems.product', 'title images')
    if (!order) return res.status(404).json({ message: 'Order not found.' })
    if (order.user?.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden.' })
    }
    res.json(order)
  } catch (err) {
    next(err)
  }
}

module.exports = { create, getMyOrders, getOne }
