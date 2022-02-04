import { USER_ORDER_LIST_RESET } from '../constants/orderConstants'
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_RESET,
  USER_PROFILE_UPDATE_FAILURE,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_LIST_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_RESET
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload }
    case USER_PROFILE_RESET:
      return { userInfo: {} }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false }
    case USER_REGISTER_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { ...state, loading: true }
    case USER_PROFILE_SUCCESS:
      return { loading: false }
    case USER_PROFILE_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userProfileUpdateReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATE_REQUEST:
      return { ...state, loading: true }
    case USER_PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case USER_PROFILE_UPDATE_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_FAILURE:
      return { loading: false, error: action.payload }
    case USER_LIST_RESET: 
      return { users: []}
    default:
      return state
  }
}
