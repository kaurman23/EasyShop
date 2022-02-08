import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productDetailUpdateReducer
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  userProfileUpdateReducer,
  userListReducer,
  userDeleteReducer,
  userDetailReducer,
  userDetailUpdateReducer,
} from './reducers/userReducers'
import {
  createOrderReducer,
  orderDetailsReducer,
  orderPayReducer,
  userOrderListReducer,
  listOrdersReducer,
  orderDeliverReducer
} from './reducers/orderReducers'

const reducers = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productDetailUpdate: productDetailUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userProfieUpdate: userProfileUpdateReducer,
  userDelete: userDeleteReducer,
  userOrderList: userOrderListReducer,
  userDetail: userDetailReducer,
  userDetailUpdate: userDetailUpdateReducer,
  userList: userListReducer,
  createOrder: createOrderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  listOrders: listOrdersReducer,
  orderDeliver: orderDeliverReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
