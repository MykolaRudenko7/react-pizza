import { PizzasInBasket } from '../redux/slices/basket/types';
//
//
//
//
//
export const calcTotalPrice = (pizzas: PizzasInBasket[]) => {
  return pizzas.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
