import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants'

import axios from 'axios'

export const addItemToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      qty: Number(qty),
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (shippingAddress) => async (dispatch, getState) => {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: shippingAddress,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress))
}

  export const savePaymentMethod = (paymentMethod) => async (dispatch, getState) => {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: paymentMethod,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(paymentMethod))
}