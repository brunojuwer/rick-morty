var adoad;

let pageContext = {
  currentPage: 1,
  totalPages: 0,
  previousPage: null,
  nextPage: null,
  pagesToShow: [],
  setCurrentPage () {
    if(!this.previousPage) {
      this.currentPage = 1;
      return;
    }
    if(!this.nextPage) {
      this.currentPage = this.totalPages;
      return;
    } 
    const indexPrev = this.previousPage.indexOf("=");
    const numberOfNextPage = Number(this.previousPage.slice(indexPrev +1));

    this.currentPage = numberOfNextPage + 1
  }
}

function changePageContextData(total, previous, next) {
  pageContext.totalPages = total;
  pageContext.previousPage = previous;
  pageContext.nextPage = next;
  pageContext.setCurrentPage();
}

function changePagesToShow() {
  if(pageContext.totalPages > 5) {
    let page = pageContext.currentPage
    while(pageContext.pagesToShow.length < 5) {
      pageContext.pagesToShow.push(page);
      page++
    }
  }
}