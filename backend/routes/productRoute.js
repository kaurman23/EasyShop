import express from 'express'
import {
  getAllProducts,
  getProductByID,
} from '../controllers/productController.js'

const router = express.Router()

router.get('/', getAllProducts)

router.get('/:id', getProductByID)

export default router
