
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import refs from "./getRefs";
import Images from './fetchImages';
import LoadMoreBtn from './loadMoreBtn';
import markupImages from "./markup";



const imagesEl = new Images();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
refs.imagesContainer.addEventListener('click', onOpenModal);

function onSearch(e) {
  e.preventDefault();

  imagesEl.query = e.currentTarget.elements.query.value;

  if (imagesEl.query === '') {
      return error({
      text: 'введите в поле поиска значение!',
      delay: 2500,
      closerHover: true,
    });
  }

  loadMoreBtn.show();
  imagesEl.resetPage();
  clearmarkupImages();
  fetchImages();
}

function fetchImages() {
    loadMoreBtn.disable();
    
  return imagesEl.fetchImages().then(images => {
    markupImages(images);
      loadMoreBtn.enable();
      if (images.length === 0) {
      loadMoreBtn.hide();
      error({
        text: 'не найдено',
        delay: 2500,
        closerHover: true,
      });
    }
  });
}


function clearmarkupImages() {
  refs.imagesContainer.innerHTML = '';
}

function onOpenModal(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const largeImageURL = `<img src= ${e.target.dataset.source}>`;
  basicLightbox.create(largeImageURL).show();
}

function onLoadMore() {
  fetchImages()
    .then(
        setTimeout(() => {
          
        window.scrollTo({
            // top: document.documentElement.offsetHeight - 300,
            top: document.documentElement.clientHeight,
            
            
            
            behavior: 'smooth',
        });
            
        
      }, 1000),
       
        
    )
    .catch(err => console.log(err));
}
