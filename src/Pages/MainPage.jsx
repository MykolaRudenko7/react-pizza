import React from 'react';
//Components
import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock/index';
import Skeleton from '../Components/PizzaBlock/Skeleton';

const MainPage = () => {
  // states
  const [items, setItems] = React.useState([]);
  const [ifLoading, setIfLoading] = React.useState(true);

  // back-end
  React.useEffect(() => {
    fetch('https://633d7e23f2b0e623dc751a6a.mockapi.io/items')
      .then((pizzas) => pizzas.json())
      .then((pizzasJson) => {
        setItems(pizzasJson);
        setIfLoading(!ifLoading);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Всі піцци</h2>
      <div className="content__items">
        {ifLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </>
  );
};

export default MainPage;
