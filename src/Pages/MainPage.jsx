// Library
import React from 'react';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
// redux
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategoryIndex,
  setCurrentPage,
  setFilters,
  filterSelector,
} from '../redux/slices/filterSlice.js';
import { fetchPizzas, pizzasSelector } from '../redux/slices/pizzasSlice';
// Components
import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock/index';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Paginate from '../Pagination/index';
import { list } from '../Components/Sort';
//
//
//
//
//
const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = React.useRef(false);
  const isFirstRender = React.useRef(false);

  const { categoryIndex, sortType, currentPage, searchValue } = useSelector(filterSelector);
  const { items, status } = useSelector(pizzasSelector); // pizzas and status laoding

  const clickOnCategoty = React.useCallback((index) => {
    dispatch(setCategoryIndex(index));
  }, []);

  const onChangePage = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const getPizzas = async () => {
    const sortBy = sortType.sortProp.replace('-', '');
    const sortOrd = sortType.sortProp.includes('-') ? 'asc' : 'desc';
    const category = categoryIndex > 0 ? `category=${categoryIndex}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        sortOrd,
        category,
        search,
        currentPage,
      }),
    );
    window.scrollTo(0, 0);
  };

  //   Якщо відбувся перший рендер і змінили параметри (роблю строку і в URL)
  React.useEffect(() => {
    if (isFirstRender.current) {
      const queryString = qs.stringify({
        sortProp: sortType.sortProp,
        categoryIndex,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isFirstRender.current = true;
  }, [currentPage, categoryIndex, sortType.sortProp]);

  //  якщо запит з URL, зберігаю в Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortProp = list.find((obj) => obj.sortProp === params.sortProp);
      dispatch(
        setFilters({
          ...params,
          sortProp,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // якщо 1й рендер, даю запит на піци
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryIndex, sortType.sortProp, searchValue, currentPage]);
  // піци для рендеру
  const pizzas = items.map((item) => (
    <Link to={`/pizza/${item.id}`} key={item.id}>
      <PizzaBlock {...item} />
    </Link>
  ));
  // заглушки
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryIndex} clickOnCategoty={(index) => clickOnCategoty(index)} />
        <Sort />
      </div>
      <h2 className="content__title">Всі піцци</h2>
      {status === 'error' ? (
        <div className="content__error">
          <h2>Відбулась помилка</h2>
          <p>На жаль, не вдалося отримати піцци, спробуйте повторити пізніше</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Paginate currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default MainPage;
