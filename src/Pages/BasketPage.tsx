import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {BasketItem} from '../Components/BasketItem';
import { basketSelector } from '../redux/slices/basket/selectors';
import { clearBasket } from '../redux/slices/basket/slice';
//
import { BasketEmpty } from '../Components/BasketEmpty';
//
import basket from '../assets/img/cart.svg';
import trash from '../assets/img/trash.svg';
//
//
//
//
//
const BasketPage: React.FC = () => {
  const { pizzasInBasket, totalPrice } = useSelector(basketSelector);

  const totalCount = pizzasInBasket.reduce((sum: number, obj: any) => {
    return obj.count + sum;
  }, 0);

  const elements = useSelector((state: any) => state.basket.pizzasInBasket);
  const dispatch = useDispatch();
  const onClickClear = () => {
    dispatch(clearBasket());
  };

  if (!totalPrice) {
    return <BasketEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <img src={basket} alt="basket" />
            Корзина
          </h2>
          <div onClick={onClickClear} className="cart__clear">
            <img src={trash} alt="trash" />
            <span>Очистить корзину</span>
          </div>
        </div>
        <div className="content__items">
          {elements.map((obj: any) => (
            <BasketItem key={obj.id} {...obj} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Всього піцц: <b>{totalCount}</b>
            </span>
            <span>
              Сумма замовлення: <b>{totalPrice}</b>
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 13L1 6.93015L6.86175 1"
                  stroke="#D3D3D3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span>Повернутись назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Сплатити зараз</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
