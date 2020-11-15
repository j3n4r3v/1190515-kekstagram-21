'use strict';
(function () {
  const PICTURE_TEMPLATE = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);

  let renderPhoto = function (photo) {
    const pictureElement = PICTURE_TEMPLATE.cloneNode(true);
    pictureElement.setAttribute(`id`, photo.id);
    pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
    pictureElement.querySelector(`.picture__img`).src = `${photo.url}`;
    pictureElement.querySelector(`.picture__img`).alt = `${photo.description}`;
    return pictureElement;
  };

  window.mock = {
    renderPhoto
  };

})();
