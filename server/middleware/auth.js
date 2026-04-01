const jwt = require('jsonwebtoken')

function requireAuth(req, res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const token = header.split(' ')[1]
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }
  next()
}

module.exports = { requireAuth, requireAdmin }
