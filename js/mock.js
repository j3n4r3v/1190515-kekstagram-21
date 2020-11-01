'use strict';
(function () {
  const PICTURE_TEMPLATE = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);
  const massivePhotos = [];

  let renderPhoto = function (photo) {
    const pictureElement = PICTURE_TEMPLATE.cloneNode(true);
    pictureElement.href = `#` + photo.id;
    pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
    pictureElement.querySelector(`.picture__img`).src = `${photo.url}`;
    pictureElement.querySelector(`.picture__img`).alt = `${photo.description}`;
    return pictureElement;
  };

  const createMockObjects = function (amount) {
    for (let i = 0; i < amount; i++) {
      massivePhotos.push({
        id: i,
        url: `photos/${i + 1}.jpg`,
        description: `Описание фотографии`,
        likes: Math.round(window.utils.getRandom(window.data.MIN_LIKES, window.data.MAX_LIKES)),
        comments: window.data.generateComments(window.utils.getRandom(window.data.MIN_COMMENTS, window.data.MAX_COMMENTS))
      });
    }
    return massivePhotos;
  };

  window.mock = {
    massivePhotos,
    renderPhoto,
    createMockObjects
  };

})();
