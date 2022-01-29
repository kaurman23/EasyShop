import {
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAILURE,
  PRODUCT_DETAIL_REQUEST,
  CLEAR_PRODUCT_DETAILS,
} from '../constants/productConstants'

import axios from 'axios'

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get('/api/products')

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (err) {
    const error =
      err.response && err.response.data.messsage
        ? err.response.data.messsage
        : err.message

    dispatch({ type: PRODUCT_LIST_FAILURE, payload: error })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data })
  } catch (err) {
    const error =
      err.response && err.response.data.messsage
        ? err.response.data.messsage
        : err.message

    dispatch({ type: PRODUCT_DETAIL_FAILURE, payload: error })
  }
}

export const clearProductDetails = () => async (dispatch) => {
  dispatch({ type: CLEAR_PRODUCT_DETAILS })
}
