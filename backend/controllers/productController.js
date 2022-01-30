import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

const getProductByID = asyncHandler(async (req, res) => {
  const pid = req.params.id
  const product = await Product.findById(pid)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getAllProducts, getProductByID }
