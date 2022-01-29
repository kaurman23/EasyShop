import {CART_ADD_ITEM} from '../constants/cartConstants'

import axios from 'axios';

export const addItemToCart = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            qty: qty,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}