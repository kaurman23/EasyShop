import express from 'express'
import {
  getAllProducts,
  getProductByID,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  topProducts
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getAllProducts).post(protect, admin, createProduct)

router.get('/top', topProducts)

router.route('/:id/reviews').post(protect, createProductReview)

router.get('/:id', getProductByID)


router
  .route('/:id')
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)



export default router
