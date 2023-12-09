let pageContext = {
  currentPage: 1,
  totalPages: 0,
  previousPage: null,
  nextPage: null,
}

function changePageContextData(total, previous, next) {
  pageContext.currentPage = 0;
  pageContext.totalPages = total;
  pageContext.previousPage = previous;
  pageContext.nextPage = next;
}