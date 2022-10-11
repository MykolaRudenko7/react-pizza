import React from 'react';

//Components
import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock/index';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Paginate from '../Pagination/index';

const MainPage = ({ searchValue }) => {
  // states
  // Піци
  const [items, setItems] = React.useState([]);

  const [ifLoading, setIfLoading] = React.useState(true);
  const [categoryIndex, setCategoryIndex] = React.useState(0);
  const [sortType, setSortType] = React.useState({ name: 'популярності', sortProp: 'rating' });
  const [page, setPage] = React.useState(1);
  // back-end
  React.useEffect(() => {
    setIfLoading(true);

    const sortBy = sortType.sortProp.replace('-', '');
    const sortOrd = sortType.sortProp.includes('-') ? 'asc' : 'desc';
    const category = categoryIndex > 0 ? `category=${categoryIndex}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://633d7e23f2b0e623dc751a6a.mockapi.io/items?page=${page}&limit=4&${category}&sortBy=${sortBy}&order=${sortOrd}${search}`,
    )
      .then((pizzasServer) => pizzasServer.json())
      .then((pizzasJson) => {
        setItems(pizzasJson);
        setIfLoading((ifLoading) => !ifLoading);
      });
    window.scrollTo(0, 0);
  }, [categoryIndex, sortType, searchValue, page]);

  // Піци для рендеру
  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

  // offline sort
  //  .filter((obj) => {
  //    if (obj.title.toLowerCase().includes(searchValue)) {
  //      return true;
  //    }
  //    return false;
  //  })
  //
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryIndex} clickOnCategoty={(index) => setCategoryIndex(index)} />
        <Sort value={sortType} clickOnSort={(index) => setSortType(index)} />
      </div>
      <h2 className="content__title">Всі піцци</h2>
      <div className="content__items">{ifLoading ? skeletons : pizzas}</div>
      <Paginate onChange={(numberPage) => setPage(numberPage)} />
    </div>
  );
};

export default MainPage;
