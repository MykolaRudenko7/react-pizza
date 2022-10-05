import React from 'react';
// Components
import Header from './Components/Header';
import Categories from './Components/Categories';
import Sort from './Components/Sort';
import PizzaBlock from './Components/PizzaBlock';
// Style
import './scss/app.scss';

function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch('https://633d7e23f2b0e623dc751a6a.mockapi.io/items').then((pizzas) => {
      return pizzas.json().then((pizzas) => {
        setItems(pizzas);
      });
    });
  }, []);

  https: return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj) => (
              <PizzaBlock
                key={obj.id}
                {...obj}
                /* або */
                //  title={obj.title}
                //  price={obj.price}
                //  image={obj.imageUrl}
                //  sizes={obj.sizes}
                //  types={obj.types}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
