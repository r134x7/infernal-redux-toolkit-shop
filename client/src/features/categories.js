import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        UPDATE_CATEGORIES(state, action) {
            return {
                ...state,
                categories: [...action.categories],                
            };
        },
        UPDATE_CURRENT_CATEGORY(state, action) {
            return {
                ...state,
                currentCategory: action.currentCategory
            };
        },
    }
});

export const { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } = categoriesSlice.actions;

export default categoriesSlice.reducer;