import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import basket from './slices/basketSlice';
import pizzas from './slices/pizzasSlice';


export const store = configureStore({
  reducer: {
    filter,
    basket,
    pizzas,
  },
});
