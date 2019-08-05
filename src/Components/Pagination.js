import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div class="center">
        <div class="pagination">
        <a href="#">&laquo;</a>
        {pageNumbers.map(number => (
          <a onClick={() => paginate(number)}  className='page-link' >{number}</a>
          ))}
        <a href="#">&raquo;</a>
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
