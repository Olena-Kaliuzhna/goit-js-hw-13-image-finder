import imagesTpl from '../templates/images.hbs';


import refs from "./getRefs";

function markupImages(images) {
  const markup = imagesTpl(images);
  refs.imagesContainer.insertAdjacentHTML('beforeend', markup);
}

export default markupImages;