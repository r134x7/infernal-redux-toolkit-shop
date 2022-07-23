import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        UPDATE_PRODUCTS(state, action) {
            return {
                ...state,
                products: [...action.products],
            }
        }
    }
});

export const { UPDATE_PRODUCTS } = productsSlice.actions

export default productsSlice.reducer