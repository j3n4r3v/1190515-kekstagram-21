'use strict';
(function () {
  const PICTURE_TEMPLATE = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);

  const guide = function uuidv4() {
    return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0; const v = c === `x` ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  let renderPhoto = function (photo) {
    const pictureElement = PICTURE_TEMPLATE.cloneNode(true);
    pictureElement.querySelector(`.picture__img`).setAttribute(`id`, guide());
    pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
    pictureElement.querySelector(`.picture__img`).src = `${photo.url}`;
    pictureElement.querySelector(`.picture__img`).alt = `${photo.description}`;
    return pictureElement;
  };
  /*
  const createMockObjects = function (amount) {
    for (let i = 0; i < amount; i++) {
      massivePhotos.push({
        id: i, // guide(), непонял как использовать гуид, потому вернул просто индекс
        url: `photos/${i + 1}.jpg`,
        description: `Описание фотографии`,
        likes: Math.round(window.utils.getRandom(window.data.MIN_LIKES, window.data.MAX_LIKES)),
        comments: window.data.generateComments(window.utils.getRandom(window.data.MIN_COMMENTS, window.data.MAX_COMMENTS))
      });
    }
    return massivePhotos;
  };
*/
  window.mock = {
    renderPhoto,
    // createMockObjects
  };

})();
