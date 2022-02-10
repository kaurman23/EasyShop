import {
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAILURE,
  PRODUCT_DETAIL_REQUEST,
  CLEAR_PRODUCT_DETAILS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAILURE,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DETAIL_UPDATE_REQUEST,
  PRODUCT_DETAIL_UPDATE_SUCCESS,
  PRODUCT_DETAIL_UPDATE_FAILURE,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAILURE,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAILURE,
} from '../constants/productConstants'

import axios from 'axios'

export const listProducts =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })

      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      )

      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (err) {
      const error =
        err.response && err.response.data.message
          ? err.response.data.message
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
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message

    dispatch({ type: PRODUCT_DETAIL_FAILURE, payload: error })
  }
}

export const clearProductDetails = () => async (dispatch) => {
  dispatch({ type: CLEAR_PRODUCT_DETAILS })
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/products/${id}`, config)

    dispatch({ type: PRODUCT_DELETE_SUCCESS })
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message

    dispatch({ type: PRODUCT_DELETE_FAILURE, payload: error })
  }
}

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/products/`, {}, config)

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message

    dispatch({ type: PRODUCT_CREATE_FAILURE, payload: error })
  }
}

export const updateProductDetails = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    )

    dispatch({ type: PRODUCT_DETAIL_UPDATE_SUCCESS, payload: data })
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message

    dispatch({ type: PRODUCT_DETAIL_UPDATE_FAILURE, payload: error })
  }
}

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.post(`/api/products/${productId}/reviews`, review, config)

      dispatch({ type: PRODUCT_REVIEW_CREATE_SUCCESS })
    } catch (err) {
      const error =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message

      dispatch({ type: PRODUCT_REVIEW_CREATE_FAILURE, payload: error })
    }
  }

  export const getTopProducts = () => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_TOP_REQUEST })

      const {data} = await axios.get(`/api/products/top`)

      dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data })
    } catch (err) {
      const error =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message

      dispatch({ type: PRODUCT_TOP_FAILURE, payload: error })
    }
  }
