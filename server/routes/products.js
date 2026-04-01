const router = require('express').Router()
const { getAll, getOne, create, update, remove } = require('../controllers/productController')
const { requireAuth, requireAdmin } = require('../middleware/auth')

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', requireAuth, requireAdmin, create)
router.put('/:id', requireAuth, requireAdmin, update)
router.delete('/:id', requireAuth, requireAdmin, remove)

module.exports = router
