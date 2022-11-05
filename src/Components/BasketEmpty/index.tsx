import React from 'react';
import { Link } from 'react-router-dom';
//
import styles from './BasketEmpty.module.scss';
//
import emptyCard from '../../assets/img/empty-cart.png';
//
//
//
//
//
export const BasketEmpty: React.FC = () => (
  <div className={styles.basket_empty}>
    <h2>Кошик пустий 😕</h2>
    <p>
      Скоріш за все, ви ще не замовляли піццу.
      <br />
      Для того, щоб замовити піцу, перейдіть на головну сторінку.
    </p>
    <div className={styles}>
      <img src={emptyCard} alt="Empty cart" />
    </div>
    <Link to="/" className={styles.go_back_btn}>
      <span> Повернутись на головну </span>
    </Link>
  </div>
);
