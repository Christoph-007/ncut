const router = require('express').Router()
const { create, getMyOrders, getOne } = require('../controllers/orderController')
const { requireAuth } = require('../middleware/auth')

router.post('/', requireAuth, create)
router.get('/my', requireAuth, getMyOrders)
router.get('/:id', requireAuth, getOne)

module.exports = router
