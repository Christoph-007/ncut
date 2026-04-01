const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

function signToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' })
    }
    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(409).json({ message: 'Email already in use.' })
    }
    const passwordHash = await bcrypt.hash(password, 12)
    const user = await User.create({ name, email, passwordHash })
    const token = signToken(user)
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (err) {
    next(err)
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' })
    }
    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }
    const token = signToken(user)
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { register, login }
