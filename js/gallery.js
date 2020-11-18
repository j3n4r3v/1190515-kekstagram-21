'use strict';
(function () {
  const PICTURE_TEMPLATE = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);
  const containerPictures = window.data.PICTURES_CONTAINER;


  let renderPhoto = (photo) => {
    const pictureElement = PICTURE_TEMPLATE.cloneNode(true);
    pictureElement.setAttribute(`id`, photo.id);
    pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
    pictureElement.querySelector(`.picture__img`).src = photo.url;
    pictureElement.querySelector(`.picture__img`).alt = photo.description;
    return pictureElement;
  };

  const addServerPictures = (pictures) => {
    const photosFragment = document.createDocumentFragment();
    pictures.forEach((element) => {
      photosFragment.appendChild(renderPhoto(element));
    });
    window.data.PICTURES_CONTAINER.appendChild(photosFragment);
  };

  const removeUsersPictures = () => {
    const shownPictures = containerPictures.querySelectorAll(`.picture`);
    shownPictures.forEach((picture) => {
      containerPictures.removeChild(picture);
    });
  };

  window.gallery = {
    renderPhoto,
    addServerPictures,
    removeUsersPictures
  };

})();
