const router = require('express').Router()
const { getAll, getOne, create, update } = require('../controllers/collectionController')
const { requireAuth, requireAdmin } = require('../middleware/auth')

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', requireAuth, requireAdmin, create)
router.put('/:id', requireAuth, requireAdmin, update)

module.exports = router
