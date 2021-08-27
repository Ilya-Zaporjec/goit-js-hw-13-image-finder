// import refs from './refs.js';
import NewApiService from './apiService';
import temp from '../temp/photo-card.hbs';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
};

const API_SERVICE = new NewApiService();

refs.searchForm.addEventListener('submit', search);
refs.loadMoreBtn.addEventListener('click', loadMore);

function search(e) {
  e.preventDefault();

  let input = e.currentTarget.elements.query.value;

  clearList();

  API_SERVICE.query = input;
  API_SERVICE.resetPage();
  API_SERVICE.fethcArticles().then(hits => {
    makeTemplate(hits);
  });
  input = '';
}

function loadMore() {
  API_SERVICE.fethcArticles().then(hits => {
    makeTemplate(hits);

    const element = document.getElementById('.gallery');
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });

    window.scrollTo(0, 1000);
    window.scrollTo({
      top: 1000,
      behavior: 'smooth',
    });
  });
}
function makeTemplate(e) {
  const markUp = temp(e);
  refs.gallery.insertAdjacentHTML('beforeend', markUp);
}
function clearList() {
  refs.gallery.innerHTML = null;
}
