import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/cart";
import productsReducer from "../features/products";
import categoriesReducer from "../features/categories";

export default configureStore ({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        categories: categoriesReducer,
    }
})