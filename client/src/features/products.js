import { createSlice } from "@reduxjs/toolkit";
// import { initialState } from "../utils/store";

const initialState = {
  products: [],
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        UPDATE_PRODUCTS(state, action) {
            return {
                ...state,
                products: [...action.payload.products],
            }
        }
    }
});

export const { UPDATE_PRODUCTS } = productsSlice.actions;

export default productsSlice.reducer;