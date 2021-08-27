export default class NewApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }
  fethcArticles = async () => {
    const baseUrl = 'https://pixabay.com/api/';
    const key = '23071617-4384eb8116da3def56182313f';
    const fetchUrl = `${baseUrl}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${key}`;
    this.incrementPage();
    const response = await fetch(fetchUrl);
    const { hits } = await response.json();
    return hits;
  };
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
