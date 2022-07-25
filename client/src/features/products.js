import { createSlice } from "@reduxjs/toolkit";

const initialState = { // creating only the objects that are needed for the actions below.
  products: [],
}

const productsSlice = createSlice({
    name: "products", // name required
    initialState, // initial state required
    reducers: { // reducers is where the actions are created, the default case is automatically made and defaults to return state
        UPDATE_PRODUCTS(state, action) { // console logging before return helps to find what is in the action
            return {
                ...state,
                products: [...action.payload.products],
            }
        }
    }
});

export const { UPDATE_PRODUCTS } = productsSlice.actions; // exporting the actions using destructuring

export default productsSlice.reducer; // exporting the reducer as default