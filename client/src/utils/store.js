import { combineReducers, configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/cart";
import productsReducer from "../features/products";
import categoriesReducer from "../features/categories";

const rootReducer = combineReducers({
    cart: cartReducer,
    products: productsReducer,
    categories: categoriesReducer,
})

export default configureStore ({
    reducer: rootReducer
})