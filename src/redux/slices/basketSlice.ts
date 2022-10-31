import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
//
//
//
export type PizzasInBasket = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
};

interface BasketSliceState {
  totalPrice: number;
  pizzasInBasket: PizzasInBasket[];
}

// state
const initialState: BasketSliceState = {
  pizzasInBasket: [],
  totalPrice: 0,
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
      state.totalPrice = state.pizzasInBasket.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusPizza(state, action: PayloadAction<string>) {
      const repeatPizza = state.pizzasInBasket.find((obj) => obj.id === action.payload);
      if (repeatPizza) {
        repeatPizza.count--;
      }
      if (repeatPizza?.count === 0) {
        state.pizzasInBasket = state.pizzasInBasket.filter((obj) => obj.count > 0);
      }
      state.totalPrice = state.pizzasInBasket.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    removePizzas(state, action: PayloadAction<string>) {
      state.pizzasInBasket = state.pizzasInBasket.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.pizzasInBasket.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    clearBasket(state) {
      state.pizzasInBasket = [];
      state.totalPrice = 0;
    },
  },
});

export const basketSelector = (state: RootState) => state.basket;

export const getItemsByIdSelector = (id: string) => (state: RootState) =>
  state.basket.pizzasInBasket.find((obj) => obj.id === id);

export const { addPizza, minusPizza, removePizzas, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
