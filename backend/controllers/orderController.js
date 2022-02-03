import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'
import e from 'express'

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

const getOrderByID = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user','name email')

  if(!order){
    res.status(404)
    throw new Error("Order not found")
  } else {
    res.json(order)
  }
})

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if(!order){
    res.status(404)
    throw new Error("Order not found")
  } else {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time, 
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)


  }
})

export { createOrder, getOrderByID, updateOrderToPaid }
