'use strict';
(function () {
  const photosFragment = document.createDocumentFragment();
  const massivePhotos = window.mock.createMockObjects(window.data.PHOTOS_AMOUNT);
  for (let i = 0; i < massivePhotos.length; i++) {
    photosFragment.append(window.mock.renderPhoto(massivePhotos[i]));
  }
  window.data.PICTURE_CONTAINER.append(photosFragment);

  const bigPicture = document.querySelector(`.big-picture`);
  const closeBigPicture = bigPicture.querySelector(`.big-picture__cancel`);
  const socialCommentText = bigPicture.querySelector(`.social__footer-text`);
  const socialCommentCount = document.querySelector(`.social__comment-count`);
  const commentLoader = bigPicture.querySelector(`.comments-loader`);

  socialCommentCount.classList.add(`hidden`);
  commentLoader.classList.add(`hidden`);

  const onBigPictureEscPush = function (evt) {
    if (evt.key === window.utils.KEYDOWN.esc) {
      evt.preventDefault();
      closeModalOpen();
    }
  };

  const modalOpenHandler = (evt) => {
    for (let i = 0; i < massivePhotos.length; i++) {
      if ((evt.target.closest(`.picture`).id) === massivePhotos[i].id) {
        window.bigPicture.renderBigPicture(massivePhotos[i]);
        bigPicture.classList.remove(`hidden`);
        document.addEventListener(`keydown`, onBigPictureEscPush);
      }
    }
  };

  const closeModalOpen = () => {
    bigPicture.classList.add(`hidden`);
    socialCommentText.value = ``;
    document.removeEventListener(`keydown`, onBigPictureEscPush);
  };

  window.overlay.uploadCancel.addEventListener(`keydown`, (evt) => {
    if (evt.key === window.utils.KEYDOWN.ent) {
      window.overlay.closeOverlay();
    }
  });

  document.querySelectorAll(`.picture`).forEach((elm) => {
    elm.addEventListener(`click`, modalOpenHandler);
  });

  closeBigPicture.addEventListener(`click`, closeModalOpen);

})();
