import { createSlice } from "@reduxjs/toolkit";

const initialState = { // creating only the objects that are needed for the actions below.
  categories: [],
  currentCategory: '',
}

const categoriesSlice = createSlice({
    name: "categories", // name required
    initialState, // initial state required
    reducers: { // reducers is where the actions are created, the default case is automatically made and defaults to return state
        UPDATE_CATEGORIES(state, action) { // console logging before return helps to find what is in the action
            return {
                ...state,
                categories: [...action.payload.categories],                
            };
        },
        UPDATE_CURRENT_CATEGORY(state, action) { // console logging before return helps to find what is in the action
            return {
                ...state,
                currentCategory: action.payload.currentCategory
            };
        },
    }
});

export const { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } = categoriesSlice.actions; // exporting the actions using destructuring

export default categoriesSlice.reducer; // exporting the reducer as default