import { CART_ADD_ITEM } from '../constants/cartConstants'

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
    default:
      return state
  }
}
