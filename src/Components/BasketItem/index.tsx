import React from 'react';
import { useDispatch } from 'react-redux';
// redux
import { addPizza, minusPizza, removePizzas } from '../../redux/slices/basket/slice';
import { PizzasInBasket } from '../../redux/slices/basket/types';
//
import styles from './BasketItem.module.scss';
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
    <div className={styles.basket__item}>
      <div className={styles.basket__item_img}>
        <img src={imageUrl} alt="Pizza" />
      </div>
      <div className={styles.basket__item_info}>
        <h3>{title}</h3>
        <p>
          {type}, {size} см
        </p>
      </div>
      <div className={styles.basket__item_count}>
        <button
          disabled={count === 1}
          onClick={onClickMinus}
          className={styles.basket__item_count_minus}
        >
          -
        </button>
        <b>{count}</b>
        <button
          onClick={onClickPlus}
          className={styles.basket__item_count_plus}>
          +
        </button>
      </div>
      <div className={styles.basket__price}>
        <b>{count * price} грн</b>
      </div>
      <div className={styles.basket__item_remove}>
        <button
          onClick={onClickRemove}
          className={styles.basket__item_count_remove}
        >
          ×
        </button>
      </div>
    </div>
  );
};

