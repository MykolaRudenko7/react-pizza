import { createSlice } from '@reduxjs/toolkit';

// state
const initialState = {
  pizzasInBasket: [],
  totalPrice: 0,
};

// slice
export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  //  працівники
  reducers: {
    addPizza(state, action) {
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

    minusPizza(state, action) {
      const repeatPizza = state.pizzasInBasket.find((obj) => obj.id === action.payload.id);
      if (repeatPizza) {
        repeatPizza.count--;
      }
      if (repeatPizza.count === 0) {
        state.pizzasInBasket = state.pizzasInBasket.filter((obj) => obj.count > 0);
      }
      state.totalPrice = state.pizzasInBasket.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    removePizzas(state, action) {
      state.pizzasInBasket = state.pizzasInBasket.filter((obj) => obj.id !== action.payload.id);
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

// експортую властивість константою
export const { addPizza, minusPizza, removePizzas, clearBasket } = basketSlice.actions;

export default basketSlice.reducer;
