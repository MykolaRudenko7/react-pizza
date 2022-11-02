import { RootState } from '../../store';
//
//
//
//
//
export const basketSelector = (state: RootState) => state.basket;

export const getItemsByIdSelector = (id: string) => (state: RootState) =>
  state.basket.pizzasInBasket.find((obj) => obj.id === id);
