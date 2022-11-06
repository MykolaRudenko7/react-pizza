import qs from 'qs';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
import { filterSelector } from '../../redux/slices/filter/selectors';
import { setCategoryIndex, setCurrentPage, setFilters } from '../../redux/slices/filter/slice';
import { fetchPizzas } from '../../redux/slices/pizza/asyncActions';
import { pizzasSelector } from '../../redux/slices/pizza/selectors';
import { PizzaSearchParametr, Status } from '../../redux/slices/pizza/types';
import { useAppDispatch } from '../../redux/store';
// Components
import { Categories, Pagination, PizzaBlock, Skeleton, Sort } from '../../Components';
import { list } from '../../Components/Sort';
//
import styles from './MainPage.module.scss';
//
//
//
//
//
const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearch = React.useRef(false);
  const isFirstRender = React.useRef(false);

  const { categoryIndex, sortType, currentPage, searchValue } = useSelector(filterSelector);
  const { items, status } = useSelector(pizzasSelector); // pizzas and status laoding

  const clickOnCategoty = React.useCallback((index: number) => {
    dispatch(setCategoryIndex(index));
  }, []);

  const onChangePage = (pageNumber: number) => {
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
        currentPage: String(currentPage),
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
      const params = qs.parse(
        window.location.search.substring(1),
      ) as unknown as PizzaSearchParametr;
      const sortType = list.find((obj) => obj.sortProp === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          currentPage: Number(params.currentPage),
          categoryIndex: Number(params.category),
          sortType: sortType || list[0],
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
  const pizzas = items.map((item: any) => <PizzaBlock key={item.id} {...item} />);
  // заглушки
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className={styles.content}>
      <div className={styles.content__top}>
        <Categories value={categoryIndex} clickOnCategoty={clickOnCategoty} />
        <Sort value={sortType} />
      </div>
      <h2 className={styles.content__title}>Всі піци</h2>

      {status === Status.ERROR ? (
        <div className={styles.content__error}>
          <h2>Відбулась помилка</h2>
          <p>На жаль, не вдалося отримати піцци, спробуйте повторити пізніше</p>
        </div>
      ) : (
        <div className={styles.content__items}>{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default MainPage;
