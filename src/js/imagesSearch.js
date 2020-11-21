
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import refs from "./getRefs";
import Images from './fetchImages';
import markupImages from "./markup";

const imagesEl = new Images();

refs.searchForm.addEventListener('submit', onSearch);
refs.imagesContainer.addEventListener('click', onOpenModal);
refs.upButton.addEventListener('click', ScrollUp);

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
 
  imagesEl.resetPage();
  clearmarkupImages();
  fetchImages();
}

function fetchImages() {
      
  imagesEl.fetchImages().then(images => {
    markupImages(images);
    imagesEl.incrementPage();
      
      if (images.length === 0) {
      
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


const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && imagesEl.query !== '') {
      fetchImages();
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '250px',
});
observer.observe(refs.forObserveEl);


function ScrollUp () {
        if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
            window.scrollBy(0,-50);
            setTimeout(ScrollUp, 10);
        }
    }
    
window.onscroll = function() {
  const scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if (scrolled > 0) {
    refs.upButton.classList.remove('is-hidden')
  } else {
    refs.upButton.classList.add('is-hidden')
  }
}
