import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  cartOpen: false,
};

const cartAdapter = createEntityAdapter();

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
          // console.log({...state});
          // console.log(action.payload._id);
          // console.log(action.payload);
          // console.log(state.cart);
          // let newState1 = state.cart.map(product => product)
          // console.log(newState1);
          // let newState2 = newState1.map(productTwo => {
          //   if (action.payload._id === productTwo._id) {
          //     return productTwo.purchaseQuantity = action.payload.purchaseQuantity
          //    } else {
          //      return productTwo
          //    }
          //   })
          //   console.log(newState2);

            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map((product) => {
                  // console.log(product.base_);
                  // console.log(product);
                  console.log(product._id);
                  console.log(product.purchaseQuantity);
                  if (action.payload._id === product._id) {
                    return {...product, purchaseQuantity: action.payload.purchaseQuantity}
                    // return {_id: product._id, name: product.name, purchaseQuantity: action.payload.purchaseQuantity}
                  } else {
                    return product;
                  }
                  // console.log(product.cart);
                }),


                // cart: state.cart.filter(product => product._id !== action.payload._id).map(product => product.purchaseQuantity = action.payload.purchaseQuantity)
                // cart: state.cart.map(product => {
                //   if (action.payload._id === product._id) {
                //     product.purchaseQuantity = action.payload.purchaseQuantity
                //     // cartAdapter.updateOne(state.cart, action.payload)
                //     // product.purchaseQuantity[action.payload.purchaseQuantity]
                //     // console.log(product.purchaseQuantity[action.payload.purchaseQuantity]);
                //   }
                //   return product
                // })
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