import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ADD_SUCCESS_ITEM_REMOVE
} from '../constants/cartConstants'

//MAYBE REFACTOR THIS LATER?
export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const newItem = action.payload

      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.product === newItem.product
      )

      if (existingItem) {
        return {
          ...state,
          success: true,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === newItem.product ? newItem : cartItem
          ),
        }
      } else {
        return {
          ...state,
          success: true,
          cartItems: [...state.cartItems, newItem],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      }
    case CART_ADD_SUCCESS_ITEM_REMOVE:
      return {
        ...state,
        success: false
      }
    default:
      return state
  }
}
