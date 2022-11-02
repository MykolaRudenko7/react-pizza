import { PizzasInBasket } from '../redux/slices/basket/types';
import { calcTotalPrice } from './calcTotalPrice';
//
//
//
//
//
// отримую збережені піци з ЛС
export const getPizzaFromLS = () => {
  const getPizzasLS = localStorage.getItem('basket');
  const totalPizzas = getPizzasLS ? JSON.parse(getPizzasLS) : [];
  const totalPrice = calcTotalPrice(totalPizzas);

  return {
    totalPizzas : totalPizzas as PizzasInBasket[],
    totalPrice,
  };
};
