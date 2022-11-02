import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../../utils/calcTotalPrice';
import { getPizzaFromLS } from '../../../utils/getPizzaFromLS';
import { BasketSliceState, PizzasInBasket } from './types';
//
//
//
//
//
const { totalPizzas, totalPrice } = getPizzaFromLS();

// state
const initialState: BasketSliceState = {
  // витягаю додані піци одразу з ЛС
  pizzasInBasket: totalPizzas,
  totalPrice: totalPrice,
};

// slice
export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  //  працівники
  reducers: {
    addPizza(state, action: PayloadAction<PizzasInBasket>) {
      const repeatPizza = state.pizzasInBasket.find((obj) => obj.id === action.payload.id);

      if (repeatPizza) {
        repeatPizza.count++;
      } else {
        state.pizzasInBasket.push({
          ...action.payload,
          count: 1,
        });
      }
      //загальна сума
      state.totalPrice = calcTotalPrice(state.pizzasInBasket);
    },

    minusPizza(state, action: PayloadAction<string>) {
      const repeatPizza = state.pizzasInBasket.find((obj) => obj.id === action.payload);
      if (repeatPizza) {
        repeatPizza.count--;
      }
      state.totalPrice = calcTotalPrice(state.pizzasInBasket);
    },

    removePizzas(state, action: PayloadAction<string>) {
      state.pizzasInBasket = state.pizzasInBasket.filter((obj) => obj.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.pizzasInBasket);
    },

    clearBasket(state) {
      state.pizzasInBasket = [];
      state.totalPrice = 0;
    },
  },
});


export const { addPizza, minusPizza, removePizzas, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
