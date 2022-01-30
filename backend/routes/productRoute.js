import express from 'express'
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'
import {
  getAllProducts,
  getProductByID,
} from '../controllers/productController.js'

const router = express.Router()

router.get('/', getAllProducts)

router.get('/:id', getProductByID)

export default router
