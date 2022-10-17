// Library
import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
// Redax
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategoryIndex,
  setSortType,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';

// Components
import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock/index';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Paginate from '../Pagination/index';
import { list } from '../Components/Sort';
// Context
import { SearchContext } from '../App';
//
//
//
//
//
const MainPage = () => {
  //   states
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]); // pizzas
  const [ifLoading, setIfLoading] = React.useState(true);

  const navigate = useNavigate();
  const { categoryIndex, sortType, currentPage } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const clickOnCategoty = (index) => {
    dispatch(setCategoryIndex(index));
  };
  const onChangePages = (pageNum) => {
    dispatch(setCurrentPage(pageNum));
  };

  //   4
  // чи з юрл
  const isSearch = React.useRef(false);
  //   перший рендер
  const isFirstRender = React.useRef(false);

  //   3
  //   отримую піцци
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

  //  2 якщо при прешому рендері, то не треба вшивать в строку параметри, якщо далі, треба
  //   і якщо змін параметри і був перший рендер відбув наступне
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

  //  1 Якщо був 1й рендер то перевіряю юрл параметри і зберігаю в редаксі
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProp === params.sortProp);
      dispatch(setFilters({ ...params, sort }));

      isSearch.current = true;
    }
  }, []);

  // чи потрібно робити запрос на зміну піц
  // якщо з юрл то нічого не робить
  // якщо не з юрл то запрашую піцци
  //   при першому рендері піци запрашуються
  React.useEffect(() => {
    window.scrollTo(0, 0);
    //  якщо
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
      <Paginate currentPage={currentPage} onChange={(pageNum) => onChangePages(pageNum)} />
    </div>
  );
};

export default MainPage;
