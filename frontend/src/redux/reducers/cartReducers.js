import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

//MAYBE REFACTOR THIS LATER?
export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const newItem = action.payload

      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.product === newItem.product
      )

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === newItem.product ? newItem : cartItem
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        }
      }
    case CART_REMOVE_ITEM: 
      return {
          ...state,
          cartItems: state.cartItems.filter(item => item.product !== action.payload)
      }
    default:
      return state
  }
}
