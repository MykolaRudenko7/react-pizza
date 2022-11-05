import React from 'react';
import { Link } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getItemsByIdSelector } from '../../redux/slices/basket/selectors';
import { addPizza } from '../../redux/slices/basket/slice';
import { PizzasInBasket } from '../../redux/slices/basket/types';
//
import styles from "./PizzaBlock.module.scss";
//
//
//
//
//
type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, price, imageUrl, sizes, types }) => {
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const nameTypes = ['тонке', 'традиційне'];

  const dispatch = useDispatch();

  const items = useSelector(getItemsByIdSelector(id));
  const showCount = items ? items.count : 0;

  const onClickAddPizza = () => {
    const pizzasObj: PizzasInBasket = {
      id,
      title,
      price,
      imageUrl,
      size: sizes[activeSize],
      type: nameTypes[activeType],
      count: 0,
    };
    dispatch(addPizza(pizzasObj));
  };

  return (
    <div className={styles.pizza_block_wrapper}>
      <div className={styles.pizza_block}>
        <Link to={`/pizza/${id}`} key={id}>
          <img className={styles.pizza_block__image} src={imageUrl} alt="Pizza" />
          <h4 className={styles.pizza_block__title}>{title}</h4>
        </Link>
        <div className={styles.pizza_block__selector}>
          <ul>
            {types.map((type, index) => (
              <li
                key={index}
                onClick={() => setActiveType(index)}
                className={activeType === type ? styles.active : ''}
              >
                {nameTypes[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                onClick={() => setActiveSize(index)}
                className={(activeSize === index )? styles.active : ''}
              >
                {size} см
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.pizza_block__bottom}>
          <div className={styles.pizza_block__price}>{price} грн</div>
          <button onClick={onClickAddPizza} className={styles.button_add}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span> Додати </span>
            {
            showCount > 0 && <i>{items?.count}</i>
            }
          </button>
        </div>
      </div>
    </div>
  );
};