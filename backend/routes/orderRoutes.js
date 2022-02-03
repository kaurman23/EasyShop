import express from 'express'
import { createOrder, getOrderByID, updateOrderToPaid } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createOrder)
router.route('/:id').get(protect, getOrderByID)
router.route('/:id/pay').get(protect, updateOrderToPaid)

export default router