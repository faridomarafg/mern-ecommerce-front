import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import cartReducer from '../features/cartSlice';
import authReducer from '../features/auth/authSlie';
import orderReducer from '../features/order/orderSlice';
import categoryReducer from '../features/category/categorySlice'
import searchReducer from '../features/search/searchSlice';
import filterReducer from '../features/filter/filterSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth:authReducer,
    order:orderReducer,
    category:categoryReducer,
    search :searchReducer,
    filter: filterReducer
  },
});