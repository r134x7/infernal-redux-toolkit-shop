import { createSlice } from "@reduxjs/toolkit";
// import { initialState } from "../utils/store"; 

const initialState = {
    cart: [],
    cartOpen: false,
  };
  
//   const initialState = {
//     products: [],
//     cart: [],
//     cartOpen: false,
//     categories: [],
//     currentCategory: '',
// }

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        ADD_TO_CART(state, action) {
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.payload.products],
            };
        },
        UPDATE_CART_QUANTITY(state, action) {
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map((product) => {
                  if (action.payload._id === product._id) {
                    return {...product, purchaseQuantity: action.payload.purchaseQuantity} // has to be a return statement else it won't work
                    // return {_id: product._id, name: product.name, purchaseQuantity: action.payload.purchaseQuantity} // alternative working method
                  } else {
                    return product;
                  }
                }),
              };
        },
        REMOVE_FROM_CART(state, action) {
            let newState = state.cart.filter(product => {
                return product._id !== action.payload._id;
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
                cart: [...state.cart, ...action.payload.products],
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