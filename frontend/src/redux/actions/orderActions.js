import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_PAY_FAILURE,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  USER_ORDER_LIST_FAILURE,
  USER_ORDER_LIST_REQUEST,
  USER_ORDER_LIST_SUCCESS,
  LIST_ORDERS_REQUEST,
  LIST_ORDERS_SUCCESS,
  LIST_ORDERS_FAILURE,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAILURE,
} from '../constants/orderConstants'
import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/orders`, order, config)

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    })
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message

    dispatch({ type: CREATE_ORDER_FAILURE, payload: error })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${id}`, config)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message

    dispatch({ type: ORDER_DETAILS_FAILURE, payload: error })
  }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_PAY_REQUEST,
  })

  try {
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
      `/api/orders/${id}/pay`,
      paymentResult,
      config
    )

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    })
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message

    dispatch({ type: ORDER_PAY_FAILURE, payload: error })
  }
}

export const listUserOrders = () => async (dispatch, getState) => {
  dispatch({
    type: USER_ORDER_LIST_REQUEST,
  })

  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/myorders`, config)

    dispatch({
      type: USER_ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message

    dispatch({ type: USER_ORDER_LIST_FAILURE, payload: error })
  }
}

export const listOrders = () => async (dispatch, getState) => {
  dispatch({
    type: LIST_ORDERS_REQUEST,
  })

  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders`, config)

    dispatch({
      type: LIST_ORDERS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message

    dispatch({ type: LIST_ORDERS_FAILURE, payload: error })
  }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_DELIVER_REQUEST,
  })

  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/orders/${order._id}/setDelivered`,
      {},
      config
    )

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    })
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message

    dispatch({ type: ORDER_DELIVER_FAILURE, payload: error })
  }
}
