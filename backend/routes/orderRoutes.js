import express from 'express'
import { createOrder, getOrderByID } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createOrder)
router.route('/:id').get(protect, getOrderByID)

export default router