import React from "react";

const Pagination = ({currentPage, pages, paginationHandler}) => (
  <div className='buttonsBlock'>
    <button
      className='paginatedButton'
      disabled={0 === currentPage}
      onClick={(e) => paginationHandler(e, 'decrement')}
    >
      {'<'}
    </button>
    <span className='currentPageText'>{currentPage + 1}</span>
    <button
      className='paginatedButton'
      disabled={currentPage >= pages - 1}
      onClick={(e) => paginationHandler(e, 'increment')}
    >
      {'>'}
    </button>
  </div>
);

export default Pagination;
