import React from 'react';
import ReactPaginate from 'react-paginate';

//
import styles from './Pagination.module.scss';
const Pagination = ({ currentPage, onChange }) => {
  return (
    <ReactPaginate
      className={styles.paginate}
      breakLabel="..."
      nextLabel="Наступна"
      onPageChange={(e) => onChange(e.selected + 1)}
      //   к-сть елементів на стр
      pageRangeDisplayed={4}
      //   к-сть сторінок
      pageCount={3}
      previousLabel="Попередня"
      renderOnZeroPageCount={null}
      //
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
