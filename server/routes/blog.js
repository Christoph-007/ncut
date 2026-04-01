const router = require('express').Router()
const { getAll, getOne, create } = require('../controllers/blogController')
const { requireAuth, requireAdmin } = require('../middleware/auth')

router.get('/', getAll)
router.get('/:slug', getOne)
router.post('/', requireAuth, requireAdmin, create)

module.exports = router
