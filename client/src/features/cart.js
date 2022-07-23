import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        ADD_TO_CART(state, action) {
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.product],
            };
        },
        UPDATE_CART_QUANTITY(state, action) {
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(product => {
                  if (action._id === product._id) {
                    product.purchaseQuantity = action.purchaseQuantity
                  }
                  return product
                })
              };
        },
        REMOVE_FROM_CART(state, action) {
            let newState = state.cart.filter(product => {
                return product._id !== action._id;
              });
        
              return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
              };
        },
        ADD_MULTIPLE_TO_CART(state, action) {
            return {
                ...state,
                cart: [...state.cart, ...action.products],
              };
        },
        CLEAR_CART(state, action) {
            return {
                ...state,
                cartOpen: false,
                cart: []
            };
        },
        TOGGLE_CART(state, action) {
            return {
                ...state,
                cartOpen: !state.cartOpen
              };
        }
    }
});

export const { ADD_TO_CART, UPDATE_CART_QUANTITY, ADD_MULTIPLE_TO_CART, REMOVE_FROM_CART, CLEAR_CART, TOGGLE_CART } = cartSlice.actions;

export default cartSlice.reducer;