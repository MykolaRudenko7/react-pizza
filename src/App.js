import React from 'react';
// Components
import Header from './Components/Header';
import Categories from './Components/Categories';
import Sort from './Components/Sort';
import PizzaBlock from './Components/PizzaBlock';
import pizzas from './assets/pizza';
// Style
import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <div className="container">
          <div className="content__top">
            {/* <Categories /> */}
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((obj) => (
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
