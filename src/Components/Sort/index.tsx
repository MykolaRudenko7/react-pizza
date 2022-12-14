import React from 'react';
// redax
import { useDispatch } from 'react-redux';
import { setSortType } from '../../redux/slices/filter/slice';
import { SortPropEnum } from '../../redux/slices/filter/types';
//
import styles from './Sort.module.scss';
//
//
//
//
//
type SortList = {
  name: string;
  sortProp: SortPropEnum;
};

export const list: SortList[] = [
  { name: 'популярності (спадання)', sortProp: SortPropEnum.RATING_DESC },
  { name: 'популярності (зростання)', sortProp: SortPropEnum.RATING_ASC },
  { name: 'ціною (спаданням)', sortProp: SortPropEnum.PRICE_DESC },
  { name: 'ціною (зростання)', sortProp: SortPropEnum.PRICE_ASC },
  { name: 'алфавітом (спадання)', sortProp: SortPropEnum.TITLE_DESC },
  { name: 'алфавітом (зростання)', sortProp: SortPropEnum.TITLE_ASC },
];

type SortProp = {
  value: SortList;
};

export const Sort: React.FC<SortProp> = React.memo(({ value }) => {
  const dispatch = useDispatch();

  const sortRef = React.useRef<HTMLDivElement>(null);
  const [openPopup, setOpenPopup] = React.useState(false);

  const onClickListItem = (obj: SortList) => {
    dispatch(setSortType(obj));
    setOpenPopup(false);
  };

  //  клік на сорт і поза ним
  React.useEffect(() => {
    const onClickSort = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setOpenPopup(false);
      }
    };
    document.body.addEventListener('click', onClickSort);

    return () => {
      document.body.removeEventListener('click', onClickSort);
    };
  }, []);

  return (
    <div ref={sortRef} className={styles.sort}>
      <div className={styles.sort__label}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортувати за:</b>
        <span onClick={() => setOpenPopup(!openPopup)}>{value.name}</span>
      </div>
      {openPopup && (
        <div className={styles.sort__popup}>
          <ul>
            {list.map((obj, index) => (
              <li
                key={index}
                className={value.sortProp === obj.sortProp ? styles.active : ''}
                onClick={() => onClickListItem(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
