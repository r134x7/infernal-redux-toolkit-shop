import { createSlice } from "@reduxjs/toolkit"; // creates a slice of a reducer with actions

const initialState = { // creating only the objects that are needed for the actions below.
    cart: [],
    cartOpen: false,
  };

const cartSlice = createSlice({
    name: "cart", // name required
    initialState, // initial state required
    reducers: { // reducers is where the actions are created, the default case is automatically made and defaults to return state
        ADD_TO_CART(state, action) { // console logging before return helps to find what is in the action
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.payload.product],
            };
        },
        UPDATE_CART_QUANTITY(state, action) { // console logging before return helps to find what is in the action
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map((product) => {
                  if (action.payload._id === product._id) {
                    // redux toolkit's Immer is very strict about what you can and can't do with mutating data
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

export const { ADD_TO_CART, UPDATE_CART_QUANTITY, ADD_MULTIPLE_TO_CART, REMOVE_FROM_CART, CLEAR_CART, TOGGLE_CART } = cartSlice.actions; // exporting the actions using destructuring

export default cartSlice.reducer; // exporting the reducer as default