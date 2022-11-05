import React from 'react';
// redux
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { basketSelector } from '../../redux/slices/basket/selectors';
//
import { Search } from '..';
//
import basket from '../../assets/img/cart.svg';
import logoSvg from '../../assets/img/pizza-logo.svg';
import styles from '../Header/Header.module.scss';
//
//
//
//
//
export const Header: React.FC = () => {
  const location = useLocation();

  const { pizzasInBasket, totalPrice } = useSelector(basketSelector);

  //  при додаванні піци в корзину, вона преводиться в строчку і зберігається в ЛС
  const isFirstRender = React.useRef(false);
  React.useEffect(() => {
    if (isFirstRender.current) {
      const pizzaInBasketJson = JSON.stringify(pizzasInBasket);
      localStorage.setItem('basket', pizzaInBasketJson);
    }
    isFirstRender.current = true;
  }, [pizzasInBasket]);

  const totalCount = pizzasInBasket.reduce((sum: number, obj: any) => {
    return obj.count + sum;
  }, 0);

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/">
          <div className={styles.header__logo}>
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>сама смачна піца</p>
            </div>
          </div>
        </Link>
        {location.pathname !== '/Basket' && <Search />}
        {location.pathname !== '/Basket' && (
          <div className={styles.header__basketBtn}>
            <Link to="/Basket">
              <button className={styles.button_basket}>
                <span>{totalPrice} грн</span>
                <div className={styles.button_basket__delimiter}></div>
                <img src={basket} alt="basket" />
                <span>{totalCount}</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
