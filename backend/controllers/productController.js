import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        $or: [
          {
            name: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
          {
            brand: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
        ],
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
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

const deleteProduct = asyncHandler(async (req, res) => {
  const pid = req.params.id
  const product = await Product.findById(pid)

  if (product) {
    await product.remove()
    res.json({ message: 'Product Deleted' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name ?? product.name
    product.price = price ?? product.price
    product.description = description ?? product.description
    product.image = image ?? product.image
    product.brand = brand ?? product.brand
    product.category = category ?? product.category
    product.countInStock = countInStock ?? product.countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = await product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed!')
    }

    const newReview = {
      rating: Number(rating),
      name: req.user.name,
      comment,
      user: req.user._id,
    }

    product.reviews.push(newReview)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length
    await product.save()
    res.status(201).json({ message: 'Review Created' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const topProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({rating: -1}).limit(3)
  res.json(products)
})

export {
  getAllProducts,
  getProductByID,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  topProducts
}
