import {
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAILURE,
  PRODUCT_DETAIL_REQUEST,
  CLEAR_PRODUCT_DETAILS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAILURE,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DETAIL_UPDATE_REQUEST,
  PRODUCT_DETAIL_UPDATE_SUCCESS,
  PRODUCT_DETAIL_UPDATE_RESET,
  PRODUCT_DETAIL_UPDATE_FAILURE,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_RESET,
  PRODUCT_REVIEW_CREATE_FAILURE,
} from '../constants/productConstants'

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_LIST_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAIL_FAILURE:
      return { loading: false, error: action.payload }
    case CLEAR_PRODUCT_DETAILS:
      return { loading: true, product: { reviews: [] } }
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_DELETE_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_CREATE_FAILURE:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productDetailUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_UPDATE_REQUEST:
      return { loading: true }
    case PRODUCT_DETAIL_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_DETAIL_UPDATE_FAILURE:
      return { loading: false, error: action.payload }
    case PRODUCT_DETAIL_UPDATE_RESET:
      return { product: {} }
    default:
      return state
  }
}

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_CREATE_REQUEST:
      return { loading: true }
    case PRODUCT_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_REVIEW_CREATE_FAILURE:
      return { loading: false, error: action.payload }
    case PRODUCT_REVIEW_CREATE_RESET:
      return {}
    default:
      return state
  }
}
