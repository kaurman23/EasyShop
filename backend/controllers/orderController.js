import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  console.log(orderItems)
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('Orders cannot be empty.')
  }

  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  })

  console.log("Order here" + order)

  const createdOrder = await order.save()

  res.status(201).json(createdOrder)
})

export { createOrder }
