import refs from './refs.js';
import NewApiService from './apiService';
import temp from '../temp/photo-card.hbs';

const API_SERVICE = new NewApiService();

refs.searchForm.addEventListener('submit', search);
refs.loadMoreBtn.addEventListener('click', loadMore);

function search(e) {
  e.preventDefault();

  const input = e.currentTarget.elements.query.value;

  clearList();

  API_SERVICE.resetPage();
  API_SERVICE.searchQuery = input.value;

  API_SERVICE.fethcArticles().then(hits => {
    makeTemplate(hits);
  });
  input.value = '';
}

function loadMore() {
  API_SERVICE.fethcArticles().then(hits => {
    makeTemplate(hits);

    window.scrollTo(0, 1000);
    window.scrollTo({
      top: 1000,
      behavior: 'smooth',
    });
  });
}

function makeTemplate(items) {
  refs.gallery.insertAdjacentHTML('beforeend', items);
  return temp(items);
}
function clearList() {
  refs.gallery.innerHTML = '';
}
