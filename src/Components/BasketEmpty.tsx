import React from "react";
import { Link } from 'react-router-dom';
import emptyCard from '../assets/img/empty-cart.png';
//
//
//
const BasketEmpty: React.FC = () =>
  <div className="cart cart--empty">
    <h2>Кошик пустий 😕</h2>
    <p>
      Скоріш за все, ви ще не замовляли піццу.
      <br />
      Для того, щоб замовити піцу, перейдіть на головну сторінку.
    </p>
    <img src={emptyCard} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span> Повернутись на головну </span>
    </Link>
  </div>

export default BasketEmpty;