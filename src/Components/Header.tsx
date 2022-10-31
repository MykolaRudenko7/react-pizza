import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
//
import { basketSelector } from '../redux/slices/basketSlice';
import Search from './Search/index';
//
import basket from '../assets/img/cart.svg';
import logoSvg from '../assets/img/pizza-logo.svg';
//
//
//
const Header: React.FC = () => {
  const location = useLocation();

  const { pizzasInBasket, totalPrice } = useSelector(basketSelector);

  const totalCount = pizzasInBasket.reduce((sum: number, obj: any) => {
    return obj.count + sum;
  }, 0);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>сама смачна піца</p>
            </div>
          </div>
        </Link>
        {location.pathname !== '/Basket' && <Search />}
        {location.pathname !== '/Basket' && (
          <div className="header__cart">
            <Link to="/Basket">
              <button className="button button--cart">
                <span>{totalPrice} грн</span>
                <div className="button__delimiter"></div>
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

export default Header;
