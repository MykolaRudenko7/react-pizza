import React from 'react';
import { useDispatch } from 'react-redux';
// redux
import { addPizza, minusPizza, removePizzas } from '../redux/slices/basket/slice';
import { PizzasInBasket } from '../redux/slices/basket/types';
//
//
//
//
//
type BasketItemProps = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
};

export const BasketItem: React.FC<BasketItemProps> = ({
  id,
  title,
  type,
  size,
  price,
  count,
  imageUrl,
}) => {
  const dispatch = useDispatch();
  // кнопки
  const onClickPlus = () => {
    dispatch(addPizza({ id } as PizzasInBasket));
  };
  const onClickMinus = () => {
    dispatch(minusPizza(id));
  };
  const onClickRemove = () => {
    dispatch(removePizzas(id));
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}, {size} см
        </p>
      </div>
      <div className="cart__item-count">
        <button
          disabled={count === 1}
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          -
        </button>
        <b>{count}</b>
        <button
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
        >
          +
        </button>
      </div>
      <div className="cart__item-price">
        <b>{count * price} грн</b>
      </div>
      <div className="cart__item-remove">
        <button
          onClick={onClickRemove}
          className="button button--outline button--circle cart__item-count-remove"
        >
          ×
        </button>
      </div>
    </div>
  );
};