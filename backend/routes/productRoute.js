import express from 'express'
import {
  getAllProducts,
  getProductByID,
  deleteProduct
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getAllProducts)

router.get('/:id', getProductByID)

router.route('/:id').delete(protect, admin,deleteProduct )

export default router
