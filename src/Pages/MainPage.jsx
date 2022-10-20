// Library
import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategoryIndex,
  setSortType,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice.js';

// Components
import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock/index';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Paginate from '../Pagination/index';
import { list } from '../Components/Sort';
import { SearchContext } from '../App';
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

  const { categoryIndex, sortType, currentPage } = useSelector((state) => state.filter);
  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]); // pizzas
  const [ifLoading, setIfLoading] = React.useState(true);

  const clickOnCategoty = React.useCallback((index) => {
    dispatch(setCategoryIndex(index));
  }, []);

  const onChangePage = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const fetchPizzas = () => {
    setIfLoading(true);

    const sortBy = sortType.sortProp.replace('-', '');
    const sortOrd = sortType.sortProp.includes('-') ? 'asc' : 'desc';
    const category = categoryIndex > 0 ? `category=${categoryIndex}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://633d7e23f2b0e623dc751a6a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${sortOrd}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIfLoading((ifLoading) => !ifLoading);
      });
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

  //   якщо запит з URL, зберігаю в Redux
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
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryIndex, sortType.sortProp, searchValue, currentPage]);

  // піци для рендеру
  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
  // заглушки
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryIndex} clickOnCategoty={(index) => clickOnCategoty(index)} />
        <Sort />
      </div>
      <h2 className="content__title">Всі піцци</h2>
      <div className="content__items">{ifLoading ? skeletons : pizzas}</div>
      <Paginate currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default MainPage;
