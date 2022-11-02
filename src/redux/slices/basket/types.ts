export type PizzasInBasket = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
};

export interface BasketSliceState {
  totalPrice: number;
  pizzasInBasket: PizzasInBasket[];
}
