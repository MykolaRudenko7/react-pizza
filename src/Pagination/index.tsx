import React from 'react';
import ReactPaginate from 'react-paginate';
//
import styles from './Pagination.module.scss';
//
//
//
type PaginationProps = {
  currentPage: number;
  onChangePage: any;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.paginate}
      breakLabel="..."
      nextLabel="Наступна"
      previousLabel="Попередня"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      //   к-сть елементів на стр
      pageRangeDisplayed={4}
      //   к-сть сторінок
      pageCount={3}
      //
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
