import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_PAY_FAILURE,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  USER_ORDER_LIST_FAILURE,
  USER_ORDER_LIST_REQUEST,
  USER_ORDER_LIST_SUCCESS,
  USER_ORDER_LIST_RESET,
  LIST_ORDERS_REQUEST,
  LIST_ORDERS_SUCCESS,
  LIST_ORDERS_FAILURE,
  LIST_ORDERS_RESET,
} from '../constants/orderConstants'

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true }
    case CREATE_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case CREATE_ORDER_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload }
    case ORDER_DETAILS_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true }
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true }
    case ORDER_PAY_FAILURE:
      return { loading: false, error: action.payload }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const userOrderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case USER_ORDER_LIST_REQUEST:
      return { ...state, loading: true }
    case USER_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload }
    case USER_ORDER_LIST_FAILURE:
      return { loading: false, error: action.payload }
    case USER_ORDER_LIST_RESET:
      return { orders: []}
    default:
      return state
  }
}

export const listOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case LIST_ORDERS_REQUEST:
      return { ...state, loading: true }
    case LIST_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload }
    case LIST_ORDERS_FAILURE:
      return { loading: false, error: action.payload }
    case LIST_ORDERS_RESET:
      return { orders: []}
    default:
      return state
  }
}
