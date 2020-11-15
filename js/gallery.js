'use strict';
(function () {
  const PICTURE_TEMPLATE = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);
  const containerPictures = document.querySelector(`.pictures`);

  let renderPhoto = function (photo) {
    const pictureElement = PICTURE_TEMPLATE.cloneNode(true);
    pictureElement.setAttribute(`id`, photo.id);
    pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
    pictureElement.querySelector(`.picture__img`).src = `${photo.url}`;
    pictureElement.querySelector(`.picture__img`).alt = `${photo.description}`;
    return pictureElement;
  };

  const addServerPictures = function (pictures) {
    const photosFragment = document.createDocumentFragment();
    for (let i = 0; i < pictures.length; i++) {
      photosFragment.appendChild(renderPhoto(pictures[i]));
    }
    window.data.PICTURE_CONTAINER.appendChild(photosFragment);
  };

  const removeUsersPictures = function () {
    const shownPictures = containerPictures.querySelectorAll(`.picture`);
    shownPictures.forEach(function (picture) {
      containerPictures.removeChild(picture);
    });
  };

  window.gallery = {
    renderPhoto,
    addServerPictures,
    removeUsersPictures
  };

})();
