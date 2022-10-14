import React from 'react';
import axios from 'axios';
//Components
import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock/index';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Paginate from '../Pagination/index';
// context
import { SearchContext } from '../App';
// redax
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryIndex, setSortType } from '../redux/slices/filterSlice';
import { setCurrentPage } from '../redux/slices/paginationSlice';
//
//
//
//
//
const MainPage = () => {
  // redax
  const { categoryIndex, sortType } = useSelector((state) => state.filter);
  const { currentPage } = useSelector((state) => state.pagination);

  const dispatch = useDispatch();

  const clickOnCategoty = (index) => {
    dispatch(setCategoryIndex(index));
  };
  const onChangePages = (pageNum) => {
    dispatch(setCurrentPage(pageNum));
  };

  // states
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]); // pizzas
  const [ifLoading, setIfLoading] = React.useState(true);

  //back-end
  React.useEffect(() => {
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
    window.scrollTo(0, 0);
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
