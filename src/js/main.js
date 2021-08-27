// import refs from './refs.js';
import NewApiService from './apiService';
import temp from '../temp/photo-card.hbs';
import { alert, defaultModules } from '@pnotify/core';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
  input: document.querySelector('.search-input'),
};

const API_SERVICE = new NewApiService();

refs.searchForm.addEventListener('submit', search);
refs.loadMoreBtn.addEventListener('click', loadMore);

function search(e) {
  e.preventDefault();

  let input = e.currentTarget.elements.query.value;

  API_SERVICE.query = input;
  API_SERVICE.resetPage();
  API_SERVICE.fethcArticles().then(data => {
    if (data.length < 1) {
      noticeAlert();
    }
  });
  API_SERVICE.fethcArticles().then(hits => {
    makeTemplate(hits);
  });

  input = '';
  refs.gallery.innerHTML = '';
  clearList();
}

function loadMore() {
  API_SERVICE.fethcArticles().then(hits => {
    makeTemplate(hits);

    gallery.scrollIntoView({
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
  refs.input.value = null;
}
function noticeAlert() {
  alert({
    text: 'Oops, search returned no results. Please try a different value.',
    type: 'notice',
    shadow: true,
    delay: 2000,
    hide: true,
  });
  clearList();
}
