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
  USER_PROFILE_UPDATE_FAILURE,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_RESET,
  USER_LIST_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
} from '../constants/userConstants'

import { USER_ORDER_LIST_RESET } from '../constants/orderConstants'

import axios from 'axios'

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message

    dispatch({ type: USER_LOGIN_FAILURE, payload: error })
  }
}

export const logoutUser = (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')

  dispatch({ type: USER_PROFILE_RESET })
  dispatch({ type: USER_ORDER_LIST_RESET })
  dispatch({ type: USER_LOGOUT })

  document.location.href = '/login'
}

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/register',
      { name, email, password },
      config
    )

    dispatch({ type: USER_REGISTER_SUCCESS })

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message

    dispatch({ type: USER_REGISTER_FAILURE, payload: error })
  }
}

export const getUserProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({ type: USER_PROFILE_SUCCESS })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { ...data, token: userInfo.token },
    })
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message

    dispatch({ type: USER_PROFILE_FAILURE, payload: error })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/profile`, user, config)

    dispatch({ type: USER_PROFILE_UPDATE_SUCCESS })

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message

    dispatch({ type: USER_PROFILE_UPDATE_FAILURE, payload: error })
  }
}

export const getListOfUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/`, config)

    dispatch({ type: USER_LIST_SUCCESS, payload: data })
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message

    dispatch({ type: USER_LIST_FAILURE, payload: error })
  }
}

export  const clearListOfUser = () => async (dispatch, getState) => {
  dispatch()
}
