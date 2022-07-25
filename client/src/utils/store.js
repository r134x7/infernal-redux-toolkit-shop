import { combineReducers, configureStore } from "@reduxjs/toolkit"; // using redux toolkit
// importing the reducers:
import cartReducer from "../features/cart";  
import productsReducer from "../features/products";
import categoriesReducer from "../features/categories";

const rootReducer = combineReducers({ // combine the reducers so that there is a root reducer
    cart: cartReducer,
    products: productsReducer,
    categories: categoriesReducer,
})

export default configureStore ({ // exporting default the Store which contains the combined root reducer
    reducer: rootReducer
})