'use strict';
(function () {
  const PICTURES_CONTAINER = document.querySelector(`.pictures`);
  const PHOTOS_AMOUNT = 25;
  const MIN_COMMENTS = 2;
  const MAX_COMMENTS = 6;
  const MIN_LIKES = 15;
  const MAX_LIKES = 200;

  window.data = {
    PICTURES_CONTAINER,
    PHOTOS_AMOUNT,
    MIN_COMMENTS,
    MAX_COMMENTS,
    MIN_LIKES,
    MAX_LIKES
  };
})();
