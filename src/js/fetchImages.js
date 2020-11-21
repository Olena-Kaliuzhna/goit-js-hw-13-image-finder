const API_KEY = '19148486-756287a79d9450e591a6e8776';
const BASE_URL = 'https://pixabay.com/api/';
// const options = {
//   headers: {
//     Authorization: API_KEY,
//   },
// };

export default class Images {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&per_page=12&page=${this.page}`;

    const response = await fetch(url);
    const newImages = await response.json();
    this.incrementPage();
    
    return newImages.hits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}