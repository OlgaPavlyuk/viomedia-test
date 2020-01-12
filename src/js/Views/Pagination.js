
const Pagination = (count, currentPage, perPage) => {
  const totalPages = Math.ceil(+count / +perPage);
  let prevDisabled, nextDisabled = '';
  let prevPage, nextPage;
  const current = +currentPage;

  // first page
  if (current === 1) {
    prevDisabled = 'disabled';
    prevPage = 1;
    nextPage = 2;
  } else if (current === totalPages) { // last page
    nextDisabled = 'disabled';
    nextPage = totalPages;
    prevPage = current - 1;
  } else {
    nextPage = current + 1;
    prevPage = current - 1;
  }

  return `<div class='pagination'>
      <span class='pagination__info'>page ${current} of ${totalPages}</span>
      <button class='btn pagination__btn' ${prevDisabled} data-page='${prevPage}'>Previous ${perPage}</button>      
      <button class='btn pagination__btn' ${nextDisabled} data-page='${nextPage}'>Next ${perPage}</button>
    </div>
  `;
};

export default Pagination;
