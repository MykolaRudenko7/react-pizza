import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import basket from './slices/basket/slice';
import filter from './slices/filter/slice';
import pizzas from './slices/pizza/slice';
//
//
//
//
//
export const store = configureStore({
  reducer: {
    filter,
    basket,
    pizzas,
  },
});

// глобальний стейт
export type RootState = ReturnType<typeof store.getState>; // дай нам уваесь свій тип (type all state)
// продвинутий діспатч
// витягую всі типи з диспатчу
export type AppDispatch = typeof store.dispatch;
// тепер ф-ція що виза=ива той же самий дизпатч, але з усими моїми типами
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
