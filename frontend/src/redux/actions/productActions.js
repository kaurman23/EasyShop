import {
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants'

import axios from 'axios'

export const listProducts = () => async (dispatch) => {
    console.log("h,,,,")
  try {
      console.log("baby")
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
